import data from './data.yaml';

const Timeline = (props) => {
  const timelineData = data.timeline.reverse();
  const timelineTheme =
    props.theme.theme === 'light' ? 'timeline-light' : 'timeline-dark';

  return (
    <ul className={`timeline ${timelineTheme}`}>
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
  );
};
export default Timeline;
