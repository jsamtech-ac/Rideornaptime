/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  images: {
    // AVIF first, WebP fallback. Every image on the site is photographic, where
    // AVIF typically lands 20-30% under WebP at equivalent quality. Next serves
    // whichever the requesting browser accepts.
    //
    // deviceSizes is left at the default: no source in /public exceeds 2048px,
    // so the 3840 rung never produces a larger file anyway.
    formats: ['image/avif', 'image/webp'],
  },
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
