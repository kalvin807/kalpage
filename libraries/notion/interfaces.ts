export type ISO8601String = string

export interface NotionText {
  type: "text"
  text: {
    content: string
    link: {
      url: string
    } | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

export interface NotionTag {
  color: string
  id: string
  name: string
}

export interface NotionPage {
  archived: boolean
  cover: null
  created_time: ISO8601String
  icon: null
  id: string
  last_edited_time: ISO8601String
  object: "page"
  properties: {
    "Updated at": {
      id: string
      type: "last_edited_time"
      last_edited_time: ISO8601String
    }
    "Created at": {
      id: string
      type: "created_time"
      last_edited_time: ISO8601String
    }
    Tags: { id: string; type: "multi_select"; multi_select: NotionTag[] }
    Name: { id: string; type: "title"; title: NotionText[] }
    Publish: { id: "WtJ%5E"; type: "checkbox"; checkbox: true }
  }
  url: string
}
