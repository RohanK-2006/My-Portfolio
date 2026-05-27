/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
}

module.exports = nextConfig
