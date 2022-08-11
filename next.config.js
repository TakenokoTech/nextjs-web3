/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    loader: "imgix",
    path: "https://example.com/myaccount/",
  },
  exportPathMap: async (defaultPathMap, context) => ({
    "/": { page: "/" },
  }),
};

module.exports = nextConfig;
