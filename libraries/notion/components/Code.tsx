import React from "react"
import { highlight, languages } from "prismjs"

import "prismjs/components/prism-jsx"
import { NotionText } from "../interfaces"

export const NotionCode = ({ text, language = "javascript" }) => {
  const languageL = language.toLowerCase()
  const prismLanguage = languages[languageL] || languages.javascript
  const code = text
    .map((value: NotionText) => {
      return value.text.content
    })
    .join(" ")

  return (
    <pre className={`notion-code language-${languageL}`}>
      <code
        className={`language-${languageL}`}
        dangerouslySetInnerHTML={{
          __html: highlight(code, prismLanguage, language),
        }}
      />
    </pre>
  )
}
