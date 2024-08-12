/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { 'node:fs': false };

    return config;
  },
};

export default nextConfig;
