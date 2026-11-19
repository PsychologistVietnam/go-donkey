import { Link, useLocation } from "react-router-dom";
import { getLanguageFromPath, getLocalizedPath } from "../../routing/paths";
import footerBackground from "../../assets/images/home/footer-bg.png";
import footerLogo from "../../assets/images/home/logo-footer.png";
import journeyArt from "../../assets/images/home/journey.png";
import hopeLogo from "../../assets/images/home/hope-logo.png";
import flagVi from "flag-icons/flags/4x3/vn.svg";
import "./Footer.css";

const footerGroups = [
  {
    title: "Quick Links",
    links: [
      { page: "home", label: "Home", icon: "fa-house" },
      { page: "journey", label: "The Journey", icon: "fa-person-walking" },
      { page: "donkey", label: "The Donkey", icon: "fa-horse" },
      { page: "video", label: "Video", icon: "fa-circle-play" },
    ],
  },
  {
    title: "Explore",
    links: [
      { page: "blog", label: "Blog", icon: "fa-book-open" },
      { page: "hope", label: "Support Hope", icon: "fa-heart" },
      { page: "about", label: "About", icon: "fa-circle-info" },
      { page: "donate", label: "Donate Now", icon: "fa-hand-holding-heart" },
    ],
  },
];

const socialIcons = [
  "fa-youtube",
  "fa-facebook-f",
  "fa-instagram",
  "fa-tiktok",
  "fa-linkedin-in",
];

function Footer() {
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);

  return (
    <footer className="footer">
      <div
        className="footer__main"
        style={{ "--footer-background": `url("${footerBackground}")` }}
      >
        <div className="footer__container">
          <div className="footer__brand">
            <Link
              className="footer__logo"
              to={getLocalizedPath("home", language)}
              aria-label="GoDonkey home"
            >
              <img src={footerLogo} alt="GoDonkey.org" />
            </Link>
            <p className="footer__description">
              Walking across Vietnam to raise awareness for mental health and
              support HOPE.
            </p>
            <div className="footer__socials" aria-hidden="true">
              {socialIcons.map((icon) => (
                <span className="footer__social" key={icon}>
                  <i className={`fa-brands ${icon}`} />
                </span>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <nav
              className="footer__link-group"
              aria-label={group.title}
              key={group.title}
            >
              <h2 className="footer__heading">{group.title}</h2>
              <ul>
                {group.links.map((item) => (
                  <li key={item.page}>
                    <Link to={getLocalizedPath(item.page, language)}>
                      <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <img
            className="footer__journey-art"
            src={journeyArt}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="footer__facts">
        <div className="footer__facts-container">
          <div className="footer__fact footer__fact--hope">
            <span className="footer__support-label">In support of</span>
            <img className="footer__hope-logo" src={hopeLogo} alt="HOPE" />
            <p>
              <strong>Suicide Prevention Hotline</strong>
              <span>hopevietnam.org.vn</span>
            </p>
          </div>

          <div className="footer__fact footer__fact--start">
            <i className="fa-regular fa-calendar-days" aria-hidden="true" />
            <p>
              <span>Journey Starts</span>
              <strong>August 25, 2027</strong>
            </p>
          </div>

          <div className="footer__fact footer__fact--distance">
            <span className="footer__fact-icon" aria-hidden="true">
              <i className="fa-solid fa-person-walking" />
            </span>
            <p>
              <span>Total Distance</span>
              <strong>3,450 km</strong>
            </p>
          </div>

          <div className="footer__fact footer__fact--goal">
            <span className="footer__fact-icon" aria-hidden="true">
              <i className="fa-solid fa-mountain-sun" />
            </span>
            <p>
              <span>Goal</span>
              <strong>Raise awareness for mental health and suicide prevention</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <p className="footer__copyright">
            <span>© {new Date().getFullYear()} GoDonkey.org</span>
            <span aria-hidden="true">|</span>
            <strong>Walk for Hope</strong>
          </p>
          <p className="footer__route">
            <img src={flagVi} alt="Vietnam flag" />
            <span>From South to North Vietnam</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
