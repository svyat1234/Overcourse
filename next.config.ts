import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/logo.svg" }];
  },
};

export default nextConfig;
