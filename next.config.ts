import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  env: {
    WAITLIST_AWS_KEY: process.env.WAITLIST_AWS_KEY,
    WAITLIST_AWS_SECRET: process.env.WAITLIST_AWS_SECRET,
    NEXT_PUBLIC_REGION: process.env.NEXT_PUBLIC_REGION,
    NEXT_PUBLIC_TABLE_NAME: process.env.NEXT_PUBLIC_TABLE_NAME,
  },
};

export default nextConfig;
