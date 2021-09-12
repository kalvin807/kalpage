import { ChevronRight } from "react-feather"

const Divider = () => {
  return <div className="divider" />
}

const Year = ({ children }) => {
  return <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight">{children}</h3>
}

const Step = ({ title, children }) => {
  return (
    <li className="mb-4 ml-2">
      <div className="flex items-center mb-2 text-info">
        <span className="sr-only">Check</span>
        <ChevronRight size="18" />
        <p className="font-medium ">{title}</p>
      </div>
      <p className="ml-6">{children}</p>
    </li>
  )
}

interface TimelineProps {
  year: string
  events: [
    {
      title: string
      description: string
    },
  ]
}

const Timeline = ({ data }: { data: TimelineProps }) => {
  return (
    <>
      <Year>{data.year}</Year>
      <ul>
        {data.events.map((event, index) => {
          return (
            <Step key={index} title={event.title}>
              {event.description}
            </Step>
          )
        })}
      </ul>
    </>
  )
}

export default function Timelines({ data }: { data: TimelineProps[] }) {
  return (
    <>
      {data.map((timeline, index) => {
        return (
          <div key={index} className="rounded-box">
            <Timeline data={timeline} />
            {index !== data.length - 1 && <Divider />}
          </div>
        )
      })}
    </>
  )
}
