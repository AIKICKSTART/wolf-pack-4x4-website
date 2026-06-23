import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Hide the dev-tools floating badge — it occluded the fixed mobile dock in
  // local visual audits. Build/runtime errors still surface.
  devIndicators: false,
  experimental: {
    cpus: 3,
    // Inline above-the-fold critical CSS and defer the rest (via beasties),
    // cutting the render-blocking CSS that pushed mobile LCP past 6s.
    optimizeCss: true,
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
    ],
  },
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": ["node_modules/sharp/**/*"],
  },
};

export default withPayload(nextConfig);
