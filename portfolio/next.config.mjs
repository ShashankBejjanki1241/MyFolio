/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'your-cdn-endpoint.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }
    ]
  },
  // Handle 3D components properly - remove problematic options
  transpilePackages: ['three'],
  // Ensure proper static generation
  trailingSlash: false,
  // Optimize bundle size
  swcMinify: true,
  // Fix webpack issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  }
};

export default nextConfig;
