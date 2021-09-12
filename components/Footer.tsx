import { GitHub, Linkedin, Mail } from "react-feather"
import { ExternalLink } from "./Links"

const FooterBar = () => (
  <div>
    <div className="divider"></div>
    <footer className="items-center pt-2 pb-4 footer footer-center gap-y-2">
      <div className="flex items-center">
        <p className="pl-2">Kal.L 2021</p>
        <ExternalLink
          href="https://github.com/kalvin807"
          className="btn btn-sm btn-ghost font-normal normal-case"
        >
          Code @
          <GitHub size="18" className="inline-block w-4 h-4 ml-1 stroke-current" />
        </ExternalLink>
      </div>
      <div className="grid grid-flow-col gap-4">
        <ExternalLink
          href="https://github.com/kalvin807"
          className="btn btn-square btn-ghost hover:bg-purple-500"
        >
          <GitHub />
        </ExternalLink>
        <ExternalLink
          href="https://www.linkedin.com/in/calvin-leung-chun-yin/"
          className="btn btn-square btn-ghost hover:bg-blue-500"
        >
          <Linkedin />
        </ExternalLink>
        <ExternalLink
          href="mailto:kalvin80pad@gmail.com"
          className="btn btn-square btn-ghost hover:bg-red-500"
        >
          <Mail />
        </ExternalLink>
      </div>
    </footer>
  </div>
)

export default FooterBar
