/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // disables Image Optimization to make static hosting easier
  },
};

module.exports = nextConfig;
