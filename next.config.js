const withReactSvg = require('next-react-svg');
const path = require('path');
import dotenv from 'dotenv'

module.exports = withReactSvg({
  assetPrefix: process.env.GITHUB_PAGES ? '/kalpage' : '',
  include: path.resolve(__dirname, 'assets/svg'),
  webpack: function (config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    });
    return config;
  },
});
