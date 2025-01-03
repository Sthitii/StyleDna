/** @type {import('next').NextConfig} */
const nextConfig = {
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
    images: {
      domains: ['api.placeholder.com'],
    },
  };
  
  module.exports = nextConfig;