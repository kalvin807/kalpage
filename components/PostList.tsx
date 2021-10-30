import type { NotionBlock } from "@9gustin/react-notion-render"
import { Render } from "@9gustin/react-notion-render"
import Link from "next/link"

interface Props {
  posts: {
    id: string
    last_edited_time: string
    properties: { Name: NotionBlock }
  }[]
}

function PostList({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/${post.id}`}>
            <a>
              <h3>
                <Link passHref href={`/${post.id}`}>
                  <Render blocks={[post.properties.Name]} />
                </Link>
              </h3>
              <p>{post.last_edited_time}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostList
