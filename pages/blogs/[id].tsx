import { getDatabase, getPage, getBlocks } from "libraries/notion/api"
import Blocks from "libraries/notion/components/Post"
import { databaseId } from "../blogs"
import { Text } from "libraries/notion/components/Text"
import DefaultLayout from "~/components/layouts/default"
export default function Post({ page, blocks }) {
  console.log(page)
  return (
    <DefaultLayout>
      <div className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto mb-16 mt-3">
        <h1 className="font-bold text-4xl md:text-5xl tracking-tight mb-4">
          <Text text={page.properties.Name.title} />
        </h1>
        <Blocks blocks={blocks} />
      </div>
    </DefaultLayout>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId)
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { id } = context.params
  const page = await getPage(id)
  const blocks = await getBlocks(id)

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      }),
  )
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find((x) => x.id === block.id)?.children
    }
    return block
  })

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  }
}
