import { GitHub, Linkedin, Mail } from "react-feather"
import Avatar from "boring-avatars"

const FooterBar = () => (
  <>
    <div className="divider"></div>
    <footer className="items-center pt-2 pb-4 footer footer-center gap-y-2">
      <div className="flex items-center">
        <Avatar
          size={32}
          name={new Date().toString()}
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
        <p className="pl-2">Kal.L 2021</p>
        <button className="btn btn-sm btn-ghost font-normal normal-case">
          Code @
          <GitHub size="18" className="inline-block w-4 h-4 ml-1 stroke-current" />
        </button>
      </div>
      <div className="grid grid-flow-col gap-4">
        <a className="btn btn-square btn-ghost">
          <GitHub />
        </a>
        <a className="btn btn-square btn-ghost">
          <Linkedin />
        </a>
        <a className="btn btn-square btn-ghost">
          <Mail />
        </a>
      </div>
    </footer>
  </>
)

export default FooterBar
