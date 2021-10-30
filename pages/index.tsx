import { GBFCard, MinecraftServerCard } from "components/Card"
import Container from "components/Container"
import Timeline from "components/Timeline"
import TimelineData from "contents/timeline.json"
import Image from "next/image"

export default function Home({ timelineData }) {
  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-start max-w-2xl mx-auto pb-16">
        <h1 className="font-bold text-4xl md:text-5xl tracking-tight mb-4">
          <div className="avatar">
            <div className="mb-8 rounded-full w-9 h-9 mr-4 ring-2 ring-base-content">
              <Image
                alt="doggo greeting"
                src="/doggo.png"
                width="32"
                height="32"
                layout="responsive"
                className="hover:animate-spin"
              />
            </div>
          </div>
          Hello There.
        </h1>
        <h2 className="prose mb-16">
          I am Kal.L 👋 . A developer, gamer and student. I do program in both end to create apps
          that is fun and useful. Current working at Softbank @ 🇯🇵 . I sometime also records random
          things I found interesting here. Love board game, video games, anime, crypto, and new
          things.
        </h2>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 ">Works</h3>
        <div className="w-full flex flex-col justify-items-stretch items-stretch mb-16">
          <GBFCard />
          <MinecraftServerCard />
        </div>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4">Me</h3>
        <Timeline data={timelineData} />
      </div>
    </Container>
  )
}

export async function getStaticProps() {
  return {
    props: {
      timelineData: TimelineData,
    },
  }
}
