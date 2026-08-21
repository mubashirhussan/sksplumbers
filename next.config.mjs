/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/pages/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/services/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/services/:slug/',
        destination: '/:slug/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
