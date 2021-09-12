// @ts-check
const withPreact = require("next-plugin-preact")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
/**
 * @type {import('next').NextConfig}
 **/
module.exports = withBundleAnalyzer(
  withPreact({
    experimental: { esmExternals: true },
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  }),
)
