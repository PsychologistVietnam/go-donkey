
const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value);

export default function JourneyProgress({
  walked = 0,
  goal = 3450,
  city = "Unknown",
}) {
  const percentage = goal > 0 ? (walked / goal) * 100 : 0;
  const progress = Math.min(100, Math.max(0, percentage));

  return (
    <article className="journey-progress">
      <div className="journey-progress__heading">
        <span className="journey-progress__icon" aria-hidden="true">
          <i className="fa-solid fa-route" />
        </span>
        <h2 className="journey-progress__title">
          Journey Progress
        </h2>
      </div>

      <div className="journey-progress__distance">
        <strong>{formatNumber(walked)} km</strong>
        <span>/ {formatNumber(goal)} km</span>
      </div>

      <p className="journey-progress__city">
        <i
          className="fa-solid fa-location-dot journey-progress__city-icon"
          aria-hidden="true"
        />
        Currently in {city}
      </p>

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
