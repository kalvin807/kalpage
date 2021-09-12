import * as React from "react"
import useDarkMode from "use-dark-mode"
import debounce from "lodash.debounce"
import NextLink from "next/link"
import { Sun, Moon, GitHub, Linkedin, Mail } from "react-feather"
import { useTheme } from "next-themes"
const styleSheet = {
  sticky: {
    position: "fixed",
    WebkitBackdropFilter: "saturate(200%) blur(20px)",
    backdropFilter: "saturate(200%) blur(20px)",
    animation: "moveDown 200ms ease-in-out",
  },
  base: {
    position: "absolute",
    zIndex: 10,
  },
  inner: {
    maxWidth: "960px",
  },
}

const IconToggle = (props) => (
  <a className={props.className} onClick={() => props.onClick()}>
    {props.children}
  </a>
)

export const IconLink = (props) => (
  <a className={props.className} href={props.url} rel="noreferrer noopener" target="_blank">
    {props.children}
  </a>
)

const HeaderBar = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="flex-none px-2 mx-2 navbar-start">
        <span className="text-lg">Kalpage</span>
      </div>
      <div className="navbar-end flex-1">
        <NextLink href="/dashboard">
          <a className="p-1">About</a>
        </NextLink>
        <NextLink href="/blog">
          <a className="p-1">Works</a>
        </NextLink>
        <NextLink href="/about">
          <a className="p-1">Blog</a>
        </NextLink>

        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="btn btn-square btn-ghost btn-md"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  )
}

export default HeaderBar
