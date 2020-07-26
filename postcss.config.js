const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './pages/*.jsx',
    './pages/**/*.jsx',
    './components/*.jsx',
    './components/**/*.jsx'
  ],

  // make sure css reset isnt removed on html and body
  whitelist: ['html', 'body'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
};
