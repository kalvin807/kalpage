import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "react-feather"

const HeaderBar = ({ showTitle = false }: { showTitle?: boolean }) => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <nav className="navbar w-full">
      {showTitle && (
        <div className="navbar-start">
          <Link href="/">
            <a className="flex hover:-rotate-12 hover:scale-150 duration-100">
              <div className="avatar">
                <div className="rounded-full w-7 h-7 ring-2 ring-base-content">
                  <Image alt="doggo greeting" src="/doggo.png" width="32" height="32" />
                </div>
              </div>
            </a>
          </Link>
        </div>
      )}
      <div className="navbar-end flex-1 gap-2 px-2 ">
        {/* <Link href="/blog">
          <a className="btn btn-ghost">Blog</a>
        </Link> */}
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
