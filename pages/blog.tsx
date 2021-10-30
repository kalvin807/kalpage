import Container from "components/Container"
import PostList from "components/PostList"
import { idToGradient } from "libraries/helpers"
import { getDatabase } from "libraries/notion/api"

import { databaseId } from "./_app"

export default function Home({ posts }) {
  return (
    <Container showTitle>
      <div className="w-full flex flex-col justify-center items-start max-w-2xl mx-auto pb-16">
        <h1 className="font-bold text-4xl md:text-5xl tracking-tight mb-4">Blogs</h1>
        <h2 className="prose mb-16">Here is my random thought.</h2>
        <PostList posts={posts} />
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId)

  return {
    props: {
      posts: database.map((post) => ({
        gradient: idToGradient(post.id),
        ...post,
      })),
    },
    revalidate: 1, // In seconds
  }
}
