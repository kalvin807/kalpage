import "@fontsource/inter/variable.css"
import "tailwindcss/tailwind.css"
import "prismjs/themes/prism-tomorrow.css"
import "@9gustin/react-notion-render/dist/index.css"
import "~/lib/notion/notion.scss"

import { ThemeProvider } from "next-themes"

export const databaseId = process.env.NOTION_DATABASE_ID

const App = ({ Component, pageProps }) => (
  <ThemeProvider attribute="data-theme" disableTransitionOnChange>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
