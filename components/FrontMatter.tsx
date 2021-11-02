import { Calendar, Tag } from "react-feather"

import { dateToString } from "~/lib/helpers"

const FrontMatter = ({ page }) => {
  const { last_edited_time } = page
  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-start justify-between md:gap-2">
        <div className="flex-grow ">By Kal.L</div>

        {page.properties.Tags.multi_select.length ? (
          <div className="flex items-center">
            <Tag className="w-4" />
            <span className="ml-2">
              {page.properties.Tags.multi_select.map((elem) => elem.name).join(", ")}
            </span>
          </div>
        ) : null}
        <div className="flex items-center">
          <Calendar className="w-4" />
          <span className="ml-2">{dateToString(last_edited_time)}</span>
        </div>
      </div>
    </div>
  )
}

export default FrontMatter
