import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getLanguageFromPath, getLocalizedPath } from "../../routing/paths";

const formatMoney = (value) => new Intl.NumberFormat("en-US").format(value);

const donationFilters = [
  { id: "all", label: "All Donations", count: 125, icon: "fa-layer-group" },
  {
    id: "individual",
    label: "Individual ",
    count: 98,
    icon: "fa-user",
  },
  { id: "company", label: "Companies", count: 27, icon: "fa-building" },
];

const recentDonations = [
  {
    id: "anonymous",
    type: "individual",
    name: "Anonymous",
    time: "2 hours ago",
    message: "Keep walking! You are making a difference! 💚",
    amount: 1_000_000,
  },
  {
    id: "sis-da-nang",
    type: "company",
    name: "SIS Đà Nẵng",
    time: "1 day ago",
    message: "Proud to support HOPE and mental health in Vietnam.",
    amount: 10_000_000,
  },
  {
    id: "mai-anh",
    type: "individual",
    name: "Mai Anh",
    time: "2 days ago",
    message: "Small contribution, big hope. Keep going! 🌱",
    amount: 500_000,
  },
  {
    id: "bridge-academy",
    type: "company",
    name: "Bridge Academy",
    time: "3 days ago",
    message: "Supporting the HOPE journey for a kinder Vietnam.",
    amount: 5_000_000,
  },
];

function DonationCard({
  raised,
  goal,
  currency,
  language,
  progress,
  activeFilter,
  onFilterChange,
  donationsOpen,
  onToggleDonations,
  visibleDonations,
  isPlaceholder = false,
}) {
  const panelId = isPlaceholder
    ? "recent-donations-placeholder"
    : "recent-donations-panel";
  const className = [
    "donation-progress",
    donationsOpen && "donation-progress--expanded",
    isPlaceholder && "donation-progress--placeholder",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={className}
      aria-hidden={isPlaceholder || undefined}
      inert={isPlaceholder || undefined}
    >
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
          {progress.toFixed(1)}%
        </span>
      </div>

      <div
        className="donation-progress__filters"
        role="group"
        aria-label="Filter donations"
      >
        {donationFilters.map((filter) => (
          <button
            key={filter.id}
            className={`donation-progress__filter ${
              activeFilter === filter.id
                ? "donation-progress__filter--active"
                : ""
            }`}
            type="button"
            aria-pressed={activeFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
          >
            <i className={`fa-solid ${filter.icon}`} aria-hidden="true" />
            <span>
              {filter.label} ({filter.count})
            </span>
          </button>
        ))}
      </div>

      <section className="donation-progress__recent">
        <button
          className="donation-progress__recent-toggle"
          type="button"
          aria-expanded={donationsOpen}
          aria-controls={panelId}
          onClick={isPlaceholder ? undefined : onToggleDonations}
        >
          <i className="fa-regular fa-clock" aria-hidden="true" />
          <span>Recent Donations</span>
          <i
            className={`fa-solid ${
              donationsOpen ? "fa-chevron-up" : "fa-chevron-down"
            } donation-progress__chevron`}
            aria-hidden="true"
          />
        </button>

        <div className="donation-progress__open-panel" id={panelId}>
          {donationsOpen && (
            <ul className="donation-progress__list">
              {visibleDonations.map((donation) => (
                <li className="donation-progress__item" key={donation.id}>
                  <span
                    className={`donation-progress__avatar donation-progress__avatar--${donation.type}`}
                    aria-hidden="true"
                  >
                    <i
                      className={`fa-solid ${
                        donation.type === "company" ? "fa-building" : "fa-user"
                      }`}
                    />
                  </span>
                  <div className="donation-progress__details">
                    <div className="donation-progress__summary">
                      <strong>{donation.name}</strong>
                      <span className="donation-progress__time">
                        {donation.time}
                      </span>
                      <strong className="donation-progress__donor-amount">
                        {formatMoney(donation.amount)} {currency}
                      </strong>
                    </div>
                    <p className="donation-progress__message">
                      “{donation.message}”
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <Link
            className="donation-progress__all-link"
            to={getLocalizedPath("donate", language)}
          >
            <span>View all donations (125)</span>
            <i className="fa-solid fa-chevron-down" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <p className="donation-progress__note">
        Support the HOPE Suicide Prevention Hotline
        <span>(hopevietnam.org.vn)</span>
      </p>
    </article>
  );
}

export default function DonationProgress({
  raised = 0,
  goal = 0,
  currency = "VND",
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [donationsOpen, setDonationsOpen] = useState(true);
  const donationSlotRef = useRef(null);
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);
  const percentage = goal > 0 ? (raised / goal) * 100 : 0;
  const progress = Math.min(100, Math.max(0, percentage));
  const visibleDonations =
    activeFilter === "all"
      ? recentDonations
      : recentDonations.filter((donation) => donation.type === activeFilter);
  const cardProps = {
    raised,
    goal,
    currency,
    language,
    progress,
    activeFilter,
    onFilterChange: setActiveFilter,
    visibleDonations,
  };

  useEffect(() => {
    if (!donationsOpen) return undefined;

    function handlePointerDown(event) {
      if (
        donationSlotRef.current &&
        !donationSlotRef.current.contains(event.target)
      ) {
        setDonationsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setDonationsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [donationsOpen]);

  return (
    <div className="donation-progress-slot" ref={donationSlotRef}>
      {donationsOpen && (
        <DonationCard
          {...cardProps}
          donationsOpen={false}
          isPlaceholder
        />
      )}
      <DonationCard
        {...cardProps}
        donationsOpen={donationsOpen}
        onToggleDonations={() => setDonationsOpen((open) => !open)}
      />
    </div>
  );
}
