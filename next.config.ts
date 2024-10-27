import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_DOMAIN: process.env.NEXT_PUBLIC_SUPABASE_DOMAIN,
    NEXT_PUBLIC_MOCK_ITEMS: process.env.NEXT_PUBLIC_MOCK_ITEMS,
  },

  assetPrefix: process.env.NODE_ENV === 'production' ? 'appcheckwizard.com' : '',
  basePath: process.env.NODE_ENV === 'production' ? 'appcheckwizard.com' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
