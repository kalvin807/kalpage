import { Code, Compass } from "react-feather"

interface FeatureCardProps {
  title: string
  description: string
  github: string
  web?: string
  gradient: number
}

const gradients = [
  "bg-gradient-to-br from-blue-600 to-purple-600",
  "bg-gradient-to-l from-yellow-600 to-red-600",
]

export function FeatureCard(props: FeatureCardProps) {
  const gradient = gradients[props.gradient]
  return (
    <div
      className={`card text-neutral-content mb-4 ${gradient} hover:-translate-y-1 hover:drop-shadow-lg transition ease-in-out`}
    >
      <div className="card-content p-4 ">
        <div className="prose prose-sm">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className="justify-end card-actions">
          <a href={props.github} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-sm btn-square btn-ghost">
              <Code />
            </button>
          </a>
          {props.web && (
            <a href={props.web} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-sm btn-square btn-ghost">
                <Compass />
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function GBFCard() {
  const data = {
    title: "GBFinder Omega - グラブル救援検索・マグナ",
    description: "Granblue Fantasy raid finder written in Go and React",
    github: "https://github.com/kalvin807/gbf-raid-finder",
    web: "https://gbf.kalvin.io/",
    gradient: 0,
  }
  return <FeatureCard {...data} />
}

export function MinecraftServerCard() {
  const data = {
    title: "Simple on-demand Minecraft server",
    description: "Script to control AWS EC2 Minecraft Server in serverless style",
    github: "https://github.com/kalvin807/Simple-on-demand-minecraft-server-login-app",
    gradient: 1,
  }
  return <FeatureCard {...data} />
}
