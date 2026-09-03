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
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'handymanmaintenance.ae',
          },
        ],
        destination: 'https://www.handymanmaintenance.ae/:path*',
        permanent: true,
      },
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
