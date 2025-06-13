import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 构建时跳过 ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // 构建时跳过 TypeScript 错误
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20MB",
    },
  },
}

export default nextConfig
