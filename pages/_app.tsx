import "@fontsource/inter/variable.css"
import "tailwindcss/tailwind.css"
import "libraries/notion/notion.scss"
import "prismjs/themes/prism-tomorrow.css";
import { ThemeProvider } from "next-themes"

const App = ({ Component, pageProps }) => (
  <ThemeProvider attribute="data-theme" disableTransitionOnChange>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
