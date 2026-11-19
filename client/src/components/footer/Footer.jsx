import { Link, useLocation } from "react-router-dom";
import { getLanguageFromPath, getLocalizedPath } from "../../routing/paths";
import "./Footer.css";

const footerLinks = [
  { page: "home", label: "Home" },
  { page: "journey", label: "The Journey" },
  { page: "donkey", label: "The Donkey" },
  { page: "blog", label: "Blog" },
  { page: "video", label: "Video" },
  { page: "hope", label: "Support Hope" },
  { page: "about", label: "About" },
  { page: "donate", label: "Donate Now" },
];

function Footer() {
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <Link className="footer__logo" to={getLocalizedPath("home", language)}>
            GoDonkey.org
          </Link>
          <p className="footer__description">
            Walking across Vietnam to raise awareness for mental health and
            support HOPE.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <Link
              key={item.page}
              to={getLocalizedPath(item.page, language)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} GoDonkey.org</span>
          <span>Walk for Hope</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
