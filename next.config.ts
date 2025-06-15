import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_DOMAIN: process.env.NEXT_PUBLIC_SUPABASE_DOMAIN,
    NEXT_PUBLIC_MOCK_ITEMS: process.env.NEXT_PUBLIC_MOCK_ITEMS,
  },

  output: 'export',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: 'https://plausible.io/js/plausible.js',
      },
      {
        source: '/api/event',
        destination: 'https://plausible.io/api/event',
      },
    ]
  }
};

export default nextConfig;
