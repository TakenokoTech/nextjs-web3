/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/'
  },
  exportPathMap: async (defaultPathMap, context) => ({
    '/': {page: '/'}
  })
}

module.exports = nextConfig
