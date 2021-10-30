import Container from "components/Container"

export default function BlogLayout({ children }) {
  return (
    <Container showTitle>
      <article className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl"></h1>
        <div className="w-full mt-4 max-w-none">{children}</div>
      </article>
    </Container>
  )
}
