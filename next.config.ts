import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yisol-idm-vton.hf.space',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '7860',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '7860',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
