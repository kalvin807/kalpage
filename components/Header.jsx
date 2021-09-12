import * as React from "react"
import useDarkMode from "use-dark-mode"
import debounce from "lodash.debounce"

import { Sun, Moon, GitHub, Linkedin, Mail } from "react-feather"

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

const HeaderBar = (props) => {
  const { base: baseStyle, sticky: stickyStyle, inner: innerStyle } = styleSheet
  const darkMode = useDarkMode()

  const navRef = React.useRef()
  const [sticky, setSticky] = React.useState(false)
  const [style, setStyle] = React.useState(baseStyle)

  const handleScroll = React.useCallback(() => {
    if (navRef.current && window.scrollY > navRef.current.getBoundingClientRect().bottom) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }, [navRef])

  React.useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 10))
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  React.useEffect(() => {
    if (sticky) {
      setStyle({
        ...baseStyle,
        ...stickyStyle,
      })
    } else {
      setStyle(baseStyle)
    }
  }, [sticky])

  return (
    <div className={"w-full header"} style={{ ...style }} ref={navRef}>
      <nav
        className={"py-3 px-2 mx-auto flex flex-row justify-between items-center"}
        style={innerStyle}
      >
        <IconToggle onClick={darkMode.toggle} className={"p-2 bulb icon"}>
          {darkMode.value ? (
            <Sun className="bulb" width={24} height={24} />
          ) : (
            <Moon className="bulb" width={24} height={24} />
          )}
        </IconToggle>
        <div className={"flex flex-row"}>
          <IconLink className={"p-2 icon github "} url="https://github.com/kalvin807">
            <GitHub width={24} height={24} />
          </IconLink>
          <IconLink
            className={"p-2 icon linkedin "}
            url="https://www.linkedin.com/in/calvin-leung-chun-yin/"
          >
            <Linkedin width={24} height={24} />
          </IconLink>
          <IconLink className={"p-2 icon mail "} url="mailto:kalvin80pad@gmail.com">
            <Mail width={24} height={24} />
          </IconLink>
        </div>
      </nav>
    </div>
  )
}

export default HeaderBar
