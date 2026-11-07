import { useEffect, useState } from 'react';

const TOKYO_TIME = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Tokyo',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export function TokyoClock() {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const tick = () => setTime(TOKYO_TIME.format(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return <time className="tabular-nums">{time ? `${time} JST` : 'JST'}</time>;
}
