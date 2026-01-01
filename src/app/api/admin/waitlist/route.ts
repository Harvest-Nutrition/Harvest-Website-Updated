import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // AWS Configuration retrieval from environment variables
    const accessKey = process.env.WAITLIST_AWS_KEY;
    const secretKey = process.env.WAITLIST_AWS_SECRET;

    // Credential validation
    if (!accessKey || !secretKey) {
      console.error('AWS credentials not configured for admin page');
      return NextResponse.json({
        waitlist: [],
        error: 'AWS credentials not configured',
      });
    }

    // Initialize AWS SDK v3 clients
    const { DynamoDBClient } = await import('@aws-sdk/client-dynamodb');
    const { DynamoDBDocumentClient, ScanCommand } = await import('@aws-sdk/lib-dynamodb');

    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    const docClient = DynamoDBDocumentClient.from(client);

    const command = new ScanCommand({
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME || 'harvest-waitlist',
    });

    const response = await docClient.send(command);

    const waitlist = (response.Items || [])
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    console.log(`Admin waitlist - Successfully fetched ${waitlist.length} entries`);

    return NextResponse.json({
      waitlist,
    });
  } catch (error: any) {
    console.error('Error fetching waitlist from DynamoDB:', error);
    return NextResponse.json(
      {
        waitlist: [],
        error: error.message,
      },
      { status: 500 }
    );
  }
}
