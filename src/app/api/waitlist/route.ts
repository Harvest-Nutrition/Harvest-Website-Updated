import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Email Validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // AWS Configuration retrieval from environment variables
    const accessKey = process.env.WAITLIST_AWS_KEY;
    const secretKey = process.env.WAITLIST_AWS_SECRET;

    // Debug logging (will show in Amplify logs)
    console.log('Environment check:', {
      hasAccessKey: !!accessKey,
      hasSecretKey: !!secretKey,
      accessKeyPrefix: accessKey?.substring(0, 4),
    });

    // Credential validation
    if (!accessKey || !secretKey) {
      return NextResponse.json(
        {
          error: 'Configuration error',
          details: 'AWS credentials not configured',
          hasAccessKey: !!accessKey,
          hasSecretKey: !!secretKey,
        },
        { status: 500 }
      );
    }

    // Initialize AWS SDK v3 clients
    const { DynamoDBClient } = await import('@aws-sdk/client-dynamodb');
    const { DynamoDBDocumentClient, PutCommand, GetCommand } = await import('@aws-sdk/lib-dynamodb');

    const client = new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    const docClient = DynamoDBDocumentClient.from(client);
    const normalizedEmail = email.toLowerCase();

    // Check if email already exists
    const getResult = await docClient.send(
      new GetCommand({
        TableName: 'harvest-waitlist',
        Key: { email: normalizedEmail },
      })
    );

    if (getResult.Item) {
      return NextResponse.json({
        message: 'You are already on the waitlist!',
        alreadyExists: true,
      });
    }

    // Add new email to waitlist
    await docClient.send(
      new PutCommand({
        TableName: 'harvest-waitlist',
        Item: {
          email: normalizedEmail,
          timestamp: new Date().toISOString(),
          id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        },
      })
    );

    return NextResponse.json({
      message: 'Successfully added to waitlist!',
      success: true,
    });
  } catch (error: any) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      {
        error: 'Failed to add to waitlist',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
