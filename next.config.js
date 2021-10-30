// @ts-check
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
/**
 * @type {import('next').NextConfig}
 **/
module.exports = withBundleAnalyzer({
  experimental: { esmExternals: true },
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    domains: ["images.unsplash.com"],
  },
})
