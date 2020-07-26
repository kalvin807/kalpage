module.exports = {
  ...(process.env.NODE_ENV === 'production'
    ? {
        purge: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
        ],
        theme: {
          extend: {},
        },
        variants: {},
        plugins: [],
      }
    : {}),
};
