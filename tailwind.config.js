module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
