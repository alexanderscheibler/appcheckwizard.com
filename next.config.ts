import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
    ]
  }
};

export default nextConfig;