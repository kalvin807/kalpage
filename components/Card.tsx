import { NotionBlock, Render } from "@9gustin/react-notion-render"
import classnames from "classnames"
import Link from "next/link"
import { Calendar, Code, Compass, Tag } from "react-feather"

import { dateToString } from "~/lib/helpers"

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
      className={classnames(
        "card text-primary-content mb-4 transform hover:scale-[1.01] transition-all",
        gradient,
      )}
    >
      <div className="card-content p-4">
        <div className="prose prose-sm text-primary-content">
          <h3 className="text-primary-content">{props.title}</h3>
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

export default function BlogPostCard({
  post,
}: {
  post: {
    id: string
    last_edited_time: string
    properties: { Name: NotionBlock; Tags: any }
    gradient: string
  }
}) {
  const { id, last_edited_time, gradient } = post

  return (
    <Link href={`/blog/${id}`}>
      <a
        className={classnames(
          "transform hover:scale-[1.01] transition-all",
          "rounded-xl w-full p-1",
        )}
        style={gradient ? { backgroundImage: gradient } : {}}
      >
        <div className="flex flex-col justify-between h-full bg-base-200 rounded-lg p-4 gap-3">
          <div className="flex flex-col justify-between">
            <h4 className="text-xl md:text-2xl font-medium mb-8 w-full tracking-tight">
              <Render blocks={[post.properties.Name]} />
            </h4>
          </div>

          {post.properties.Tags.multi_select.length ? (
            <div className="flex items-center">
              <Tag size={18} />
              <span className="ml-2 align-baseline capsize">
                {post.properties.Tags.multi_select.map((elem) => elem.name).join(", ")}
              </span>
            </div>
          ) : null}

          <div className="flex items-center capsize">
            <Calendar size={18} />
            <span className="ml-2 align-baseline capsize">{dateToString(last_edited_time)}</span>
          </div>
        </div>
      </a>
    </Link>
  )
}
