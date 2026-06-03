/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  ...(process.env.NODE_ENV === 'production'
    ? {
        compiler: {
          removeConsole: { exclude: ['error', 'warn'] },
        },
      }
    : {}),
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
