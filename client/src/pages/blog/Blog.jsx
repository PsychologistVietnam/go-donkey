function Blog() {
  return (
    <section className="page stories-page" aria-labelledby="page-title">
      <div className="page__container">
        <span className="page__label">OUR STORIES</span>
        <h1 className="page__title" id="page-title">
          Blog &amp; Video
        </h1>
        <p className="page__description">
          Read the stories behind the journey and watch the moments that bring
          our route across Vietnam to life.
        </p>

        <div className="stories-page__sections">
          <section className="stories-page__section" aria-labelledby="blog-heading">
            <span className="stories-page__type">Journal</span>
            <h2 id="blog-heading">Blog</h2>
            <p>
              Journey updates, local encounters and reflections from the road.
            </p>
          </section>

          <section className="stories-page__section" aria-labelledby="video-heading">
            <span className="stories-page__type">Film</span>
            <h2 id="video-heading">Video</h2>
            <p>
              Watch memorable moments, meetings and miles from Go Donkey.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Blog;
