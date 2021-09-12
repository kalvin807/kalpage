// @ts-check
const withPreact = require("next-plugin-preact")
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})
/**
 * @type {import('next').NextConfig}
 **/
module.exports = withPreact(
  withMDX({
    experimental: { esmExternals: true },
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    webpack: function (config) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: "js-yaml-loader",
      })
      return config
    },
  }),
)
