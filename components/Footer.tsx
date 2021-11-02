import { GitHub, Mail } from "react-feather"

import { ExternalLink } from "~/components/Links"

const FooterBar = () => (
  <div>
    <div className="divider"></div>
    <footer className="items-center pt-2 pb-4 footer footer-center gap-y-2">
      <div className="flex items-center">
        <p className="pl-2">Kal.L 2021</p>
      </div>
      <div className="grid grid-flow-col gap-4">
        <ExternalLink
          href="https://github.com/kalvin807"
          className="btn btn-square btn-ghost hover:bg-purple-500"
        >
          <GitHub />
        </ExternalLink>
        <ExternalLink
          href="mailto:6q4zz1i46@relay.firefox.com"
          className="btn btn-square btn-ghost hover:bg-red-500"
        >
          <Mail />
        </ExternalLink>
      </div>
    </footer>
  </div>
)

export default FooterBar
