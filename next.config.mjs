import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_OUTPUT_MODE === "export";
const configRoot = dirname(fileURLToPath(import.meta.url));
const defaultPageExtensions = ["tsx", "ts", "jsx", "js"];
const studioPageExtensions = ["studio.tsx", "studio.ts", "studio.jsx", "studio.js"];

const nextConfig = {
  pageExtensions: isStaticExport
    ? defaultPageExtensions
    : [...studioPageExtensions, ...defaultPageExtensions],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: configRoot,
  },
  outputFileTracingRoot: configRoot,
  ...(isStaticExport ? { output: "export" } : {}),
};

export default nextConfig;

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) =>
    initOpenNextCloudflareForDev()
  );
}
