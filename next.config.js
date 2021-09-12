/**
 * @type {import('next').NextConfig}
 */
const withPreact = require("next-plugin-preact")
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = withPreact(
  withMDX({
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
