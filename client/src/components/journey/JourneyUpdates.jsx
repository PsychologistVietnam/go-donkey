
import { useState } from "react";
import { Link } from "react-router-dom";
import JourneyMap from "../map/JourneyMap";
import "./JourneyUpdates.css";

// ====================================
// DEMO LOCATION
// ====================================

const initialLocation = {
  city: "Da Lat",
  country: "Vietnam",
  position: [11.9404, 108.4583],
  status: "walking",
  updatedAt: null,
};

// Only two supported activities
const activities = {
  walking: {
    label: "Walking",
    icon: "fa-person-walking",
    description: "Currently walking across Vietnam",
  },
  resting: {
    label: "Resting",
    icon: "fa-mug-hot",
    description: "Taking a break from the journey",
  },
};

// ====================================
// DEMO BLOGS & VIDEOS
// ====================================

const blogs = [
  {
    id: 1,
    title: "Week 6: Mountains, Rain and Kindness",
    date: "Nov 11, 2026",
    excerpt:
      "A tough week in the highlands, but also full of kindness from local people.",
    image: "/images/blog-1.jpg",
  },
  {
    id: 2,
    title: "School Visit: Talking About Mental Health",
    date: "Nov 7, 2026",
    excerpt:
      "We visited a secondary school to talk openly about stress and emotions.",
    image: "/images/blog-2.jpg",
  },
];

const videos = [
  {
    id: 1,
    title: "GoDonkey Journey – Week 5",
    duration: "7:28",
    image: "/images/video-1.jpg",
  },
  {
    id: 2,
    title: "Camp Life with the Donkey",
    duration: "4:12",
    image: "/images/video-2.jpg",
  },
  {
    id: 3,
    title: "Mental Health at Schools",
    duration: "5:02",
    image: "/images/video-3.jpg",
  },
  {
    id: 4,
    title: "The Road to Da Lat",
    duration: "3:47",
    image: "/images/video-4.jpg",
  },
];

// ====================================
// IMAGE WITH FALLBACK
// ====================================

function Thumbnail({ src, alt, icon }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="updates__thumbnail">
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <i
          className={`fa-solid ${icon}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ====================================
// MAIN SECTION
// ====================================

export default function JourneyUpdates() {
  const [location, setLocation] = useState(initialLocation);

  const activity = activities[location.status];

  function toggleActivity() {
    setLocation((previous) => ({
      ...previous,
      status:
        previous.status === "walking"
          ? "resting"
          : "walking",
      updatedAt: new Date().toISOString(),
    }));
  }

  return (
    <section
      className="updates"
      aria-label="Latest Go Donkey updates"
    >
      <div className="updates__container">
        <div className="updates__grid">

          {/* =====================
              OUR ROUTE
          ===================== */}

          <article
            className="updates__card"
            id="journey-preview"
          >
            <div className="updates__heading">
              <div className="updates__heading-info">
                <i
                  className="fa-solid fa-route"
                  aria-hidden="true"
                />
                <h2 className="updates__title">
                  Our Route
                </h2>
              </div>

              <p className="updates__subtitle">
                Follow the journey across Vietnam
              </p>
            </div>

            <div className="updates__map">
              <JourneyMap
                location={location}
                activity={activity}
                height="100%"
              />

              <span className="updates__demo">
                DEMO
              </span>
            </div>

            <div className="updates__location">
              <div className="updates__location-top">
                <span className="updates__location-label">
                  <i
                    className="fa-solid fa-location-dot"
                    aria-hidden="true"
                  />
                  Current location
                </span>

                <strong className="updates__location-city">
                  {location.city}
                </strong>
              </div>

              <div className="updates__location-bottom">
                <span
                  className={`updates__activity updates__activity--${location.status}`}
                >
                  <i
                    className={`fa-solid ${activity.icon}`}
                    aria-hidden="true"
                  />
                  {activity.label}
                </span>

                <button
                  type="button"
                  className="updates__test-button"
                  onClick={toggleActivity}
                  title="Demo only: change activity"
                >
                  Switch status
                </button>
              </div>
            </div>

            <div className="updates__footer">
              <Link to="/journey" className="updates__view">
                View Journey
                <i
                  className="fa-solid fa-arrow-right"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>

          {/* =====================
              LATEST BLOG
          ===================== */}

          <article className="updates__card">
            <div className="updates__heading">
              <div className="updates__heading-info">
                <i
                  className="fa-solid fa-pen"
                  aria-hidden="true"
                />
                <h2 className="updates__title">
                  Latest Blog
                </h2>
              </div>

              <p className="updates__subtitle">
                Stories from our journey
              </p>
            </div>

            <div className="updates__list">
              {blogs.map((blog) => (
                <div className="updates__item" key={blog.id}>
                  <Thumbnail
                    src={blog.image}
                    alt={blog.title}
                    icon="fa-image"
                  />

                  <div className="updates__item-content">
                    <h3 className="updates__item-title">
                      {blog.title}
                    </h3>

                    <span className="updates__meta">
                      {blog.date}
                    </span>

                    <p className="updates__item-description">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="updates__footer">
              <Link to="/blog" className="updates__view">
                View All
                <i
                  className="fa-solid fa-arrow-right"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>

          {/* =====================
              LATEST VIDEOS
          ===================== */}

          <article className="updates__card">
            <div className="updates__heading">
              <div className="updates__heading-info">
                <i
                  className="fa-solid fa-circle-play"
                  aria-hidden="true"
                />
                <h2 className="updates__title">
                  Latest Videos
                </h2>
              </div>

              <p className="updates__subtitle">
                Moments from the journey
              </p>
            </div>

            <div className="updates__video-list">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`updates__video ${
                    index === 0 ? "updates__video--featured" : ""
                  }`}
                >
                  <div className="updates__video-image">
                    <Thumbnail
                      src={video.image}
                      alt={video.title}
                      icon="fa-video"
                    />

                    <span className="updates__duration">
                      {video.duration}
                    </span>
                  </div>

                  <h3 className="updates__video-title">
                    {video.title}
                  </h3>
                </div>
              ))}
            </div>

            <div className="updates__footer">
              <Link to="/videos" className="updates__view">
                View All
                <i
                  className="fa-solid fa-arrow-right"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
