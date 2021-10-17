import { Fragment } from "react"
import { NotionCode } from "./Code"
import { Text } from "./Text"
import Image from "next/image"

const renderBlock = (block) => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case "paragraph":
      return (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <p>
            <Text text={value.text} />
          </p>
        </div>
      )
    case "heading_1":
      return (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <h1>
            <Text text={value.text} />
          </h1>
        </div>
      )
    case "heading_2":
      return (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <h2>
            <Text text={value.text} />
          </h2>
        </div>
      )
    case "heading_3":
      return (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <h3>
            <Text text={value.text} />
          </h3>
        </div>
      )
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <li>
            <Text text={value.text} />
          </li>
        </div>
      )
    case "to_do":
      return (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.text} />
          </label>
        </div>
      )
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      )
    case "child_page":
      return (
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <p>{value.title}</p>
        </div>
      )
    case "image":
      const src = value.type === "external" ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ""
      return (
        <figure>
          <div className="notionImageContainer">
            <Image src={src} alt={caption} layout="fill" className="notionImage" />
          </div>
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    case "code":
      console.log(value)
      return <NotionCode text={value.text} language={value.language} />
    default:
      return `❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type})`
  }
}

export default function Post({ blocks }) {
  if (!blocks) {
    return <div />
  }
  return (
    <div className="w-full mt-4 max-w-none">
      {blocks.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  )
}
