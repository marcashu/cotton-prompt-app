/** @type {import('next').NextConfig} */

const bodySizeLimit = `${(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE_IN_MB ?? 10) + 1}mb`

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '**',
      },
    ],
    minimumCacheTTL: 60 * 60 * 6, // 6 hours
  },
  experimental: {
    serverActions: {
      bodySizeLimit: bodySizeLimit,
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
