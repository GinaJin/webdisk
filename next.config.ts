import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 构建时跳过 ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // 构建时跳过 TypeScript 错误
  },
}

export default nextConfig
