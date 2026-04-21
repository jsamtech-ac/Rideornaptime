/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.rideornaptime.com' }],
        destination: 'https://rideornaptime.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
