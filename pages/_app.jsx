import "tailwindcss/tailwind.css"

import useDarkMode from "use-dark-mode"

const App = ({ Component, pageProps }) => {
  useDarkMode()
  return <Component {...pageProps} />
}

export default App
