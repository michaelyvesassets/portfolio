import type { NextConfig } from "next";

// GitHub Codespaces serves the dev server from <codespace>-<port>.app.github.dev.
// Next.js blocks dev resources from unknown origins, which stops the page from
// hydrating in the Codespaces preview, so allow that forwarding domain.
const codespacesDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

const nextConfig: NextConfig = {
  allowedDevOrigins: codespacesDomain ? [`*.${codespacesDomain}`] : [],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
