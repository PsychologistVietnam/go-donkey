import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import flagEn from "flag-icons/flags/4x3/gb.svg";
import flagVi from "flag-icons/flags/4x3/vn.svg";
import flagNl from "flag-icons/flags/4x3/nl.svg";
import {
  getLanguageFromPath,
  getLocalizedPath,
  MENU_ITEMS,
  SUPPORTED_LANGUAGES,
} from "../../routing/paths";
import "./Header.css";

const translations = {
  en: {
    home: "Home",
    journey: "The Journey",
    donkey: "The Donkey",
    blog: "Blog",
    video: "Video",
    hope: "Support Hope",
    about: "About",
    donate: "Donate Now",
    menu: "Menu",
  },
  vi: {
    home: "Trang chủ",
    journey: "Hành trình",
    donkey: "Chú lừa",
    blog: "Blog",
    video: "Video",
    hope: "Hỗ trợ Hope",
    about: "Giới thiệu",
    donate: "Quyên góp",
    menu: "Menu",
  },
  nl: {
    home: "Home",
    journey: "De reis",
    donkey: "De ezel",
    blog: "Blog",
    video: "Video",
    hope: "Steun Hope",
    about: "Over ons",
    donate: "Doneer nu",
    menu: "Menu",
  },
};

const languageOptions = [
  { code: "en", name: "English", flag: flagEn },
  { code: "vi", name: "Tiếng Việt", flag: flagVi },
  { code: "nl", name: "Nederlands", flag: flagNl },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languagePickerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const language = getLanguageFromPath(location.pathname);
  const selectedLanguage =
    languageOptions.find((option) => option.code === language) ??
    languageOptions[0];
  const t = translations[language];

  function handleLanguage(lang) {
    setLanguageMenuOpen(false);
    setMenuOpen(false);
    if (lang === language) return;

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const routeSegments = SUPPORTED_LANGUAGES.includes(pathSegments[0])
      ? pathSegments.slice(1)
      : pathSegments;

    navigate({
      pathname: getLocalizedPath(routeSegments.join("/"), lang),
      search: location.search,
      hash: location.hash,
    });
  }

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (
        languagePickerRef.current &&
        !languagePickerRef.current.contains(event.target)
      ) {
        setLanguageMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setLanguageMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__container">
        <Link
          to={getLocalizedPath("home", language)}
          className="header__logo"
          onClick={() => setMenuOpen(false)}
          aria-label="GoDonkey Home"
        >
          <i
            className="fa-solid fa-mountain-sun header__logo-icon"
            aria-hidden="true"
          />
          <span>
            GoDonkey<span className="header__domain">.org</span>
          </span>
        </Link>

        <nav
          id="main-navigation"
          className={`header__nav ${
            menuOpen ? "header__nav--open" : ""
          }`}
          aria-label="Main navigation"
        >
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={getLocalizedPath(item.id, language)}
              end={item.id === "home"}
              className={({ isActive }) =>
                `header__link ${
                  isActive ? "header__link--active" : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {t[item.label]}
            </NavLink>
          ))}

          <Link
            to={getLocalizedPath("donate", language)}
            className="header__donate header__donate--mobile"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-heart" aria-hidden="true" />
            {t.donate}
          </Link>
        </nav>

        <div className="header__actions">
          <Link
            to={getLocalizedPath("donate", language)}
            className="header__donate"
          >
            <i className="fa-solid fa-heart" aria-hidden="true" />
            {t.donate}
          </Link>

          <div
            ref={languagePickerRef}
            className={`header__languages ${
              languageMenuOpen ? "header__languages--open" : ""
            }`}
          >
            <button
              type="button"
              className="header__language-trigger"
              aria-label={`Language: ${selectedLanguage.name}`}
              aria-expanded={languageMenuOpen}
              aria-controls="language-options"
              onClick={() => setLanguageMenuOpen((open) => !open)}
            >
              <span>{language.toUpperCase()}</span>
              <i
                className="fa-solid fa-chevron-down header__language-chevron"
                aria-hidden="true"
              />
            </button>
            {languageMenuOpen && (
              <div
                className="header__language-menu"
                id="language-options"
                role="group"
                aria-label="Select language"
              >
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={`header__language-option ${
                      language === option.code
                        ? "header__language-option--active"
                        : ""
                    }`}
                    aria-pressed={language === option.code}
                    onClick={() => handleLanguage(option.code)}
                  >
                    <img
                      className="header__language-flag"
                      src={option.flag}
                      alt=""
                    />
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className={`header__toggle ${
              menuOpen ? "header__toggle--active" : ""
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i
              className={`fa-solid ${
                menuOpen ? "fa-xmark" : "fa-bars"
              } header__toggle-icon`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
