/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'bchospmmqzfkbuowwxrf.supabase.co'
      }
    ],
    domains: ['k.kakaocdn.net']
  }
};

export default nextConfig;
