import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Silence Next 16 dev warning when webpack() is customized — dev uses Turbopack by default */
  turbopack: {},

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  /* Image domains */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  /* Remove X-Powered-By header */
  poweredByHeader: false,

  /* Compress responses */
  compress: true,

  /* Tree-shake three.js — only import what's used */
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "three/examples/jsm": "three/examples/jsm",
    };
    return config;
  },
};

export default nextConfig;
