import "@fontsource/inter/variable.css"
import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"

const App = ({ Component, pageProps }) => (
  <ThemeProvider attribute="data-theme" disableTransitionOnChange>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
