import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  experimental: {
    reactCompiler: true,
    webpackMemoryOptimizations: true,
    optimizeCss: true,
    optimizeServerReact: true,
    optimizePackageImports: ["rand-seed"]
  },
  images: { unoptimized: true },
  reactStrictMode: false,
  basePath: "/dr-tomorrow",
  cleanDistDir: true
};

export default config;
