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
  async redirects() {
    return [
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/:slug*', destination: '/blogs/:slug*', permanent: true },
      { source: '/case-study/:slug*', destination: '/work/:slug*', permanent: true },
      { source: '/case-studies/:slug*', destination: '/work/:slug*', permanent: true },
      { source: '/case-studies', destination: '/work', permanent: true },
      { source: '/service/:slug*', destination: '/#services', permanent: false },
      { source: '/services/:slug*', destination: '/#services', permanent: false },
      { source: '/services', destination: '/#services', permanent: false },
      { source: '/about', destination: '/#about', permanent: false },
      { source: '/sectors', destination: '/#sectors', permanent: false },
      { source: '/team', destination: '/#team', permanent: false },
    ];
  },
};

export default nextConfig;
