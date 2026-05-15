import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yucwskomvvsyqhccuhmt.supabase.co',
      }
    ]
  }
};

export default nextConfig;
