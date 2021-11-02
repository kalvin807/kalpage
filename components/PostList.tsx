import type { NotionBlock } from "@9gustin/react-notion-render"

import BlogPostCard from "~/components/Card"

interface PostHeaders {
  posts: {
    id: string
    last_edited_time: string
    properties: { Name: NotionBlock; Tags: NotionBlock }
    gradient: string
  }[]
}

function PostList({ posts }: PostHeaders) {
  return (
    <div className="w-full flex gap-6 flex-col justify-items-stretch">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
