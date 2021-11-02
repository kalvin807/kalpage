import { Render } from "@9gustin/react-notion-render"

import Container from "~/components/Container"

import FrontMatter from "./FrontMatter"

export default function BlogLayout({ page, children }) {
  return (
    <Container showTitle>
      <article className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto mb-16">
        <div className="w-full my-6">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            <Render blocks={[page.properties.Name]} />
          </h1>
          <FrontMatter page={page} />
        </div>

        <div className="w-full mt-4 max-w-none prose prose-sm md:prose">{children}</div>
      </article>
    </Container>
  )
}
