
const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value);

export default function JourneyProgress({
  walked = 0,
  goal = 3450,
  city = "Unknown",
  stepsTaken = 0,
  journeyDay = 0,
  journeyDays = 300,
}) {
  const percentage = goal > 0 ? (walked / goal) * 100 : 0;
  const progress = Math.min(100, Math.max(0, percentage));

  return (
    <article className="journey-progress">
      <div className="journey-progress__heading">
        <span className="journey-progress__icon" aria-hidden="true">
          <i className="fa-solid fa-route" />
        </span>
        <h2 className="journey-progress__title">Journey Progress</h2>
      </div>

      <div className="journey-progress__distance">
        <strong>{formatNumber(walked)} km</strong>
        <span>/ {formatNumber(goal)} km</span>
      </div>

      <div className="journey-progress__city">
        <i
          className="fa-solid fa-location-dot journey-progress__city-icon"
          aria-hidden="true"
        />
        <span className="journey-progress__city-copy">
          Currently in <strong>{city}</strong>
        </span>
      </div>

      <div className="journey-progress__stats">
        <div className="journey-progress__stat">
          <span className="journey-progress__stat-icon" aria-hidden="true">
            <i className="fa-solid fa-shoe-prints" />
          </span>
          <div className="journey-progress__stat-content">
            <span className="journey-progress__stat-label">Steps Taken</span>
            <div className="journey-progress__stat-value">
              <strong>{formatNumber(stepsTaken)}</strong>
              <span>steps</span>
            </div>
          </div>
        </div>

        <div className="journey-progress__stat">
          <span className="journey-progress__stat-icon" aria-hidden="true">
            <i className="fa-solid fa-calendar-days" />
          </span>
          <div className="journey-progress__stat-content">
            <span className="journey-progress__stat-label">Journey Day</span>
            <div className="journey-progress__stat-value">
              <strong>{journeyDay}</strong>
              <span>/ {formatNumber(journeyDays)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="journey-progress__progress">
        <div
          className="journey-progress__bar"
          role="progressbar"
          aria-label="Journey progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="journey-progress__fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="journey-progress__percent">
          {percentage.toFixed(1)}%
        </span>
      </div>
    </article>
  );
}
