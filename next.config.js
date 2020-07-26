const withReactSvg = require('next-react-svg');
const path = require('path');
const withCss = require('@zeit/next-css');

module.exports = withCss(
  withReactSvg({
    include: path.resolve(__dirname, 'assets/svg'),
    webpack: function (config) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      });
      return config;
    },
  })
);
