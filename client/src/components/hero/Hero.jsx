
import heroImage from "../../assets/images/home/hero.png";
import heroPhoneImage from "../../assets/images/home/hero-phone.png";
import "./Hero.css";
import DonationProgress from "./DonationProgress";
import JourneyProgress from "./JourneyProgress";

const highlights = [
  {
    icon: "fa-person-walking",
    title: "3,450 km",
    description: "South → North Vietnam",
  },
  {
    icon: "fa-heart",
    title: "Mental Health",
    description: "Raise awareness",
  },
  {
    icon: "fa-phone",
    title: "HOPE Hotline",
    description: "Support • Listen • Connect",
  },
];

const donation = {
  raised: 378650000,
  goal: 1000000000,
  currency: "VND",
};

const journey = {
  walked: 842,
  goal: 3450,
  city: "Da Lat",
};

export default function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      style={{
        "--hero-image": `url("${heroImage}")`,
        "--hero-phone-image": `url("${heroPhoneImage}")`,
      }}
    >
      <div className="hero__container">
        <div className="hero__content">
          <span className="hero__label">GoDonkey.org</span>

          <h1 className="hero__title" id="hero-title">
            Walk for Hope
          </h1>

          <p className="hero__description">
            A 3,450 km journey across Vietnam to raise
            awareness for mental health and support the
            HOPE Suicide Prevention Hotline.
          </p>

          <div className="hero__highlights">
            {highlights.map((item) => (
              <div className="hero__highlight" key={item.title}>
                <span className="hero__icon" aria-hidden="true">
                  <i className={`fa-solid ${item.icon}`} />
                </span>

                <div className="hero__highlight-text">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero__sidebar" aria-label="Journey and donations">
          <DonationProgress {...donation} />
          <JourneyProgress {...journey} />
        </aside>
      </div>
    </section>
  );
}
