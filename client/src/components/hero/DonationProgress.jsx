
import { Link, useLocation } from "react-router-dom";
import { getLanguageFromPath, getLocalizedPath } from "../../routing/paths";

const formatMoney = (value) => new Intl.NumberFormat("en-US").format(value);

export default function DonationProgress({
  raised = 0,
  goal = 0,
  currency = "VND",
}) {
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);
  const percentage = goal > 0 ? (raised / goal) * 100 : 0;
  const progress = Math.min(100, Math.max(0, percentage));

  return (
    <article className="donation-progress">
      <div className="donation-progress__heading">
        <span className="donation-progress__icon" aria-hidden="true">
          <i className="fa-solid fa-heart" />
        </span>
        <h2 className="donation-progress__title">
          Donation for HOPE
        </h2>
      </div>

      <div className="donation-progress__amount">
        {formatMoney(raised)} {currency}
      </div>

      <p className="donation-progress__goal">
        Goal: {formatMoney(goal)} {currency}
      </p>

      <div className="donation-progress__progress">
        <div
          className="donation-progress__bar"
          role="progressbar"
          aria-label="Donation progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="donation-progress__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="donation-progress__percent">
          {percentage.toFixed(1)}%
        </span>
      </div>

      <Link
        className="donation-progress__button"
        to={getLocalizedPath("donate", language)}
      >
        <i className="fa-solid fa-heart" aria-hidden="true" />
        Donate Now
      </Link>

      <p className="donation-progress__note">
        Support the HOPE Suicide Prevention Hotline
        <span>(hopevietnam.org.vn)</span>
      </p>
    </article>
  );
}
