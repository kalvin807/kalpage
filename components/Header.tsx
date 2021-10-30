import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "react-feather"

const HeaderBar = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <nav
      className={`navbar top-0 sticky w-full z-30 bg-base-100 bg-opacity-70 backdrop-blur-md
      }`}
    >
      <div className="navbar-end flex-1 gap-2 px-2 ">
        <Link href="/blogs">
          <a className="btn btn-ghost">Blogs</a>
        </Link>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="btn btn-square btn-ghost"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  )
}

export default HeaderBar
