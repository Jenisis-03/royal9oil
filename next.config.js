/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.aceternity.com',
          port: '',
          pathname: '/**', // This allows all paths under the hostname
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  