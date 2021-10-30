import PostList from "components/PostList"
import { getDatabase } from "libraries/notion/api"

import { databaseId } from "./_app"

export default function Home({ posts }) {
  return <PostList posts={posts} />
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId)
  return {
    props: {
      posts: database,
    },
    revalidate: 1, // In seconds
  }
}
