


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/resume/index.html',
        permanent: true,
      },
    ]
  },
}

export default nextConfig;
