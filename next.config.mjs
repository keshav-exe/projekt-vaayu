/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["files.edgestore.dev", "utfs.io", "ap-south-1.graphassets.com"],
  },
};

export default nextConfig;
