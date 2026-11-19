import { useEffect, useState } from "react";
import "./Countdown.css";

const units = [
  { label: "Days", seconds: 24 * 60 * 60, pad: false },
  { label: "Hours", seconds: 60 * 60, pad: true },
  { label: "Minutes", seconds: 60, pad: true },
  { label: "Seconds", seconds: 1, pad: true },
];

function parseLocalDate(dateString) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  if (!match) {
    throw new RangeError("Countdown targetDate must use the YYYY-MM-DD format.");
  }

  const [, yearString, monthString, dayString] = match;
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new RangeError("Countdown targetDate must be a valid calendar date.");
  }

  return date;
}

function getRemainingSeconds(targetDate) {
  return Math.max(
    0,
    Math.ceil((targetDate.getTime() - Date.now()) / 1000),
  );
}

function formatValue(value, pad) {
  return pad ? String(value).padStart(2, "0") : String(value);
}

export default function Countdown({
  targetDate,
  title = "Journey Starts In",
}) {
  const date = parseLocalDate(targetDate);
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    getRemainingSeconds(date),
  );

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = getRemainingSeconds(parseLocalDate(targetDate));
      setRemainingSeconds(remaining);
      return remaining;
    };

    if (updateCountdown() === 0) return undefined;

    const intervalId = window.setInterval(() => {
      if (updateCountdown() === 0) window.clearInterval(intervalId);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetDate]);

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return (
    <section className="countdown" aria-label={title}>
      <div className="countdown__event">
        <i
          className="fa-solid fa-calendar-days countdown__calendar"
          aria-hidden="true"
        />
        <div className="countdown__event-copy">
          <div className="countdown__title">
            <span>{title}</span>
            <i className="fa-solid fa-sparkles" aria-hidden="true" />
          </div>
          <time className="countdown__date" dateTime={targetDate}>
            {dateLabel}
          </time>
        </div>
      </div>

      <div className="countdown__timer" role="timer" aria-label="Time remaining">
        {units.map(({ label, seconds, pad }) => {
          const value =
            label === "Days"
              ? Math.floor(remainingSeconds / seconds)
              : Math.floor(remainingSeconds / seconds) % (seconds === 3600 ? 24 : 60);

          return (
            <div className="countdown__unit" key={label}>
              <strong>{formatValue(value, pad)}</strong>
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
