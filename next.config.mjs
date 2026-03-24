/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
  async rewrites() {
    return [
      {
        source: '/media-proxy/:path*',
        destination: 'https://media.hisweetievietnam.com/:path*'
      }
    ];
  }
};

export default nextConfig;
