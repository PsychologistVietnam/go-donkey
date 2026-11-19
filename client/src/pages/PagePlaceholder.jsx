function PagePlaceholder({ label, title, description }) {
  return (
    <section className="page" aria-labelledby="page-title">
      <div className="page__container">
        <span className="page__label">{label}</span>
        <h1 className="page__title" id="page-title">
          {title}
        </h1>
        <p className="page__description">{description}</p>
      </div>
    </section>
  );
}

export default PagePlaceholder;
