import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

// Pin the Turbopack root to this project. A sibling lockfile higher up the
// D:\Projects tree was being inferred as the workspace root otherwise.
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    // Sanity image assets are served from the Sanity CDN. next/image rejects
    // remote hosts that are not allowlisted, so permit the Sanity CDN here.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
