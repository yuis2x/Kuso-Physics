/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Either use a leading slash or remove assetPrefix for static exports
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // Disable image optimization since it requires a server
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
