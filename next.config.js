/**
 * @type {import('next').NextConfig}
 */
const withPreact = require('next-plugin-preact');

const nextConfig = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    });
    return config;
  },
};

module.exports = withPreact(nextConfig);
