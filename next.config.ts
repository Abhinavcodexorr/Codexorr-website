import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Silence Next 16 dev warning when webpack() is customized — dev uses Turbopack by default */
  turbopack: {},

  async redirects() {
    return [
      { source: "/services/web", destination: "/services/web-development", permanent: true },
      { source: "/services/mobile", destination: "/services/mobile-apps", permanent: true },
      { source: "/services/cloud", destination: "/services/cloud-devops", permanent: true },
      { source: "/services/ai", destination: "/services/ai-solutions", permanent: true },
      { source: "/services/ux", destination: "/services/ui-ux-design", permanent: true },
    ];
  },

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
