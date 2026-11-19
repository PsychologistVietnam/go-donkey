import { Link, useLocation } from "react-router-dom";
import { getLanguageFromPath, getLocalizedPath } from "../../routing/paths";

function NotFound() {
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);

  return (
    <section className="page" aria-labelledby="page-title">
      <div className="page__container">
        <span className="page__label">404</span>
        <h1 className="page__title" id="page-title">
          Page Not Found
        </h1>
        <p className="page__description">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          to={getLocalizedPath("home", language)}
          className="page__button"
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
