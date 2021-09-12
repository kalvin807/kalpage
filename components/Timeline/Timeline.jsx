import rawData from "./data.yaml"

const timelineData = rawData.timeline.reverse()

const Timeline = () => {
  return (
    <div className="py-2">
      <ul className={"timeline"}>
        {timelineData.map((event, idx) => (
          <li key={`timeline-${idx}`}>
            <div className="flag-wrapper">
              <span className="flag-emoji">{event.emoji}</span>
              <span className="flag">{event.name}</span>
              <span className="time-wrapper">
                <span className="time">{event.time}</span>
              </span>
            </div>
            <div className="desc">{event.desc}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Timeline
