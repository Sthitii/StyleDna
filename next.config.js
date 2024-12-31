/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn-img.prettylittlething.com",
      "cdn.shopify.com",
      "www.datocms-assets.com",
      "assets.ajio.com",
      "i.ibb.co",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      encoding: false,
      bufferutil: false,
      "utf-8-validate": false,
    };
    return config;
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
