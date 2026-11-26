import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import JourneyMap from "../../components/map/JourneyMap";
import { getLanguageFromPath, getLocalizedPath } from "../../routing/paths";
import "./Journey.css";

const roadImage =
  "https://images.pexels.com/photos/36799992/pexels-photo-36799992.jpeg?auto=compress&cs=tinysrgb&w=1800";
const communityImage =
  "https://images.pexels.com/photos/35315268/pexels-photo-35315268.jpeg?auto=compress&cs=tinysrgb&w=1600";
const vietnamClassroomImage =
  "https://images.pexels.com/photos/18395403/pexels-photo-18395403.jpeg?auto=compress&cs=tinysrgb&w=1400";
const schoolInviteImage =
  "https://images.pexels.com/photos/30105084/pexels-photo-30105084.jpeg?auto=compress&cs=tinysrgb&w=1200";
const previewRouteStart = { city: "Cà Mau", position: [9.176944, 105.15] };
// Approximate QL1 / QL20 corridor for the UI, not a recorded walking route.
const previewRoutePath = [
  [9.176944, 105.15],
  [9.25, 105.42],
  [9.285, 105.724],
  [9.47, 105.88],
  [9.6, 105.97],
  [9.78, 105.72],
  [10.03, 105.78],
  [10.25, 105.97],
  [10.36, 106.36],
  [10.53, 106.4],
  [10.82, 106.62],
  [10.87, 106.75],
  [10.95, 106.84],
  [10.94, 107.16],
  [11.2, 107.35],
  [11.45, 107.57],
  [11.55, 107.81],
  [11.59, 108.06],
  [11.74, 108.37],
  [11.9404, 108.4583],
];
const previewLocation = {
  city: "Da Lat",
  country: "Vietnam",
  position: [11.9404, 108.4583],
  status: "planned",
  updatedAt: null,
};
const previewActivity = {
  label: "Planned route",
  icon: "fa-route",
  description: "Route preview",
};
const journeyProgress = { steps: null, distanceKm: null, daysWalked: null };

function Journey() {
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);
  const pageRef = useRef(null);
  const dialogRef = useRef(null);
  const [formType, setFormType] = useState("host");

  useEffect(() => {
    const page = pageRef.current;
    if (!page || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = [...page.querySelectorAll(".journey-page__reveal")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top < window.innerHeight * 0.9) {
        section.classList.add("is-visible");
      } else {
        observer.observe(section);
      }
    });
    page.classList.add("journey-page--motion-ready");

    return () => observer.disconnect();
  }, []);

  function openInquiry(type) {
    setFormType(type);
    dialogRef.current?.showModal();
  }

  function handleInquirySubmit(event) {
    event.preventDefault();

    const fields = new FormData(event.currentTarget);
    const labels = formType === "host"
      ? [
          ["Name", "name"],
          ["Email", "email"],
          ["Town / province", "area"],
          ["Availability", "availability"],
          ["Space for the donkey", "donkeySpace"],
          ["Additional details", "message"],
        ]
      : [
          ["Contact name", "name"],
          ["Email", "email"],
          ["School", "school"],
          ["Town / province", "area"],
          ["Student year groups", "yearGroups"],
          ["Preferred dates", "availability"],
          ["Additional details", "message"],
        ];
    const body = labels
      .map(([label, name]) => [label, String(fields.get(name) ?? "").trim()])
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n\n");
    const subject = formType === "host"
      ? "Go Donkey hosting offer"
      : "Go Donkey school visit invitation";

    window.location.href = `mailto:godonkey@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <article ref={pageRef} className="journey-page" aria-labelledby="journey-title">
      <header className="journey-page__hero">
        <div className="journey-page__hero-copy">
          <h1 id="journey-title">Our Journey</h1>
          <p className="journey-page__lead">
            3,450 kilometres. One donkey. Countless encounters. One meaningful mission.
          </p>
          <p className="journey-page__introduction">
            From southernmost to northernmost Vietnam, we plan to walk for mental
            health awareness, suicide prevention and human connection.
          </p>
          <a className="journey-page__link" href="#journey-route">
            Explore the route <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="journey-page__hero-image">
          <img
            src={roadImage}
            alt="A winding road through green mountains in Vietnam"
            fetchPriority="high"
          />
        </div>
      </header>

      <section
        className="journey-page__route"
        id="journey-route"
        aria-labelledby="journey-route-title"
      >
        <div className="journey-page__wrap journey-page__route-inner">
          <div className="journey-page__route-copy">
            <h2 id="journey-route-title">A direction, not a fixed route.</h2>
            <p>
              We plan to zigzag through countryside, mountains and remote
              villages, avoiding major cities where possible. Weather, school
              visits, road safety and our donkey’s well-being will shape each day.
            </p>
          </div>
          <dl className="journey-page__facts journey-page__reveal">
            <div><dt>Starting point</dt><dd>Southernmost Vietnam</dd></div>
            <div><dt>Destination</dt><dd>Northernmost Vietnam</dd></div>
            <div><dt>Estimated distance</dt><dd>3,450 km</dd></div>
            <div><dt>Travelling by</dt><dd>Our feet and one donkey</dd></div>
          </dl>
        </div>
      </section>

      <section className="journey-page__map-section" aria-labelledby="journey-map-title">
        <div className="journey-page__wrap">
          <div className="journey-page__map-heading">
            <h2 id="journey-map-title">From south to north.</h2>
            <p>Route preview: Cà Mau to Đà Lạt. The full journey continues north.</p>
          </div>
          <div className="journey-page__map-layout">
            <div className="journey-page__map-frame" role="group" aria-label="Illustrative map from Cà Mau to Đà Lạt">
              <JourneyMap
                location={previewLocation}
                activity={previewActivity}
                routeStart={previewRouteStart}
                routePath={previewRoutePath}
                scrollWheelZoom={false}
                showLocationPopup={false}
                height="100%"
              />
              <span className="journey-page__map-label">Route preview · Cà Mau → Đà Lạt</span>
            </div>
            <aside className="journey-page__progress" aria-labelledby="journey-progress-title">
              <h3 id="journey-progress-title">Journey progress</h3>
              <dl>
                <div>
                  <dt>Steps walked</dt>
                  <dd>{journeyProgress.steps?.toLocaleString("en-GB") ?? "—"}</dd>
                </div>
                <div>
                  <dt>Distance walked</dt>
                  <dd>{journeyProgress.distanceKm != null ? `${journeyProgress.distanceKm.toLocaleString("en-GB")} km` : "—"}</dd>
                </div>
                <div>
                  <dt>Days walked</dt>
                  <dd>{journeyProgress.daysWalked?.toLocaleString("en-GB") ?? "—"}</dd>
                </div>
              </dl>
              <p className="journey-page__progress-note">Progress figures will appear when journey updates begin.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="journey-page__road-life" aria-labelledby="journey-road-life-title">
        <div className="journey-page__wrap">
          <div className="journey-page__community-intro">
            <div>
              <h2 id="journey-road-life-title">Connecting With Vietnam&apos;s Communities</h2>
            </div>
            <p>
              Across Vietnam, we hope to visit small rural villages and ethnic
              minority communities, meeting people and learning about daily life.
            </p>
          </div>
          <figure className="journey-page__road-life-image journey-page__reveal">
            <img
              src={communityImage}
              alt="A family walking together on a rural road in Vietnam"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="journey-page__community-bottom">
            <div className="journey-page__community-story">
              <h3>Listen, learn, connect.</h3>
              <p>
                We want to understand people&apos;s experiences and challenges. We
                travel to exchange stories and build connections, not to tell
                communities how they should live.
              </p>
              <p>
                Where appropriate, we hope to open conversations about mental health.
                Everyone deserves to be heard, wherever they live.
              </p>
            </div>
            <div className="journey-page__road-life-note">
              <h3>Where will we sleep?</h3>
              <p>
                We may stay in a guesthouse, camp or be welcomed by a family.
                Safe rest and shelter for our donkey come first. Local
                recommendations are welcome.
              </p>
              <button className="journey-page__button" type="button" onClick={() => openInquiry("host")}>
                Offer a place to stay <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="journey-page__schools journey-page__wrap" aria-labelledby="journey-schools-title">
        <header className="journey-page__schools-heading">
          <div className="journey-page__schools-intro">
            <h2 id="journey-schools-title">Visiting Schools</h2>
            <p>
              One of the most important parts of our journey is visiting schools
              throughout Vietnam. Mental health education should not be limited
              to international schools, private institutions or major cities.
              Students in rural and remote areas deserve access to meaningful
              conversations about mental well-being too.
            </p>
            <p>
              Throughout our expedition, we aim to visit as many schools as reasonably
              possible, with a particular interest in schools located in rural and
              underserved communities.
            </p>
          </div>
          <figure className="journey-page__school-photo journey-page__reveal">
            <img src={vietnamClassroomImage} alt="A teacher leading an interactive lesson with students in Vietnam" loading="lazy" decoding="async" />
          </figure>
        </header>
        <div className="journey-page__school-content">
          <div className="journey-page__school-block">
            <h3>What We Offer</h3>
            <dl className="journey-page__presentation-facts">
              <div><dt>Cost</dt><dd>Free</dd></div>
              <div><dt>Length</dt><dd>About 1 hour</dd></div>
              <div><dt>For</dt><dd>Year 10+</dd></div>
            </dl>
            <p>
              Each presentation is adapted to the age, language and needs of the students.
            </p>
            <p>
              Our presentations aim to be approachable, interactive and relevant
              to the everyday lives of young people.
            </p>
          </div>
          <div className="journey-page__school-block journey-page__support-block">
            <h3>Individual Student Support</h3>
            <p>
              Where circumstances, time and professional requirements allow,
              Dr. Merijn (Educational Psychologist) may offer individual supportive
              conversations, coordinated with the school.
            </p>
            <div className="journey-page__support-guidance">
              <h4>Consent and safeguarding</h4>
              <p>
                These conversations will be conducted with appropriate consent,
                safeguarding and confidentiality procedures. They are not intended
                to replace ongoing psychological treatment, formal assessments or
                local professional mental health services. Where necessary, we will
                encourage appropriate follow-up support.
              </p>
            </div>
          </div>
        </div>
        <div className="journey-page__topics">
          <h3>Possible presentation topics</h3>
          <ul>
            <li>Understanding mental health and emotional well-being.</li>
            <li>Recognising signs of emotional distress.</li>
            <li>Managing stress and academic pressure.</li>
            <li>Building resilience and self-confidence.</li>
            <li>Dealing with loneliness and social isolation.</li>
            <li>Understanding the importance of healthy relationships.</li>
            <li>Supporting friends who are experiencing emotional difficulties.</li>
            <li>Suicide prevention and recognising when professional support is needed.</li>
            <li>Overcoming the stigma surrounding mental health.</li>
            <li>Knowing where and how to ask for help.</li>
          </ul>
        </div>
      </section>

      <section className="journey-page__school-visits" aria-labelledby="journey-visits-title">
        <div className="journey-page__wrap">
          <header className="journey-page__visits-heading">
            <h2 id="journey-visits-title">School visits</h2>
          </header>
          <div className="journey-page__school-statuses journey-page__reveal">
            <section aria-labelledby="upcoming-schools-title">
              <h3 id="upcoming-schools-title">Planning to Visit</h3>
              <p className="journey-page__empty-state">
                No visits confirmed yet. Upcoming schools will appear here as plans take shape.
              </p>
            </section>
            <section aria-labelledby="visited-schools-title">
              <h3 id="visited-schools-title">Have Visited</h3>
              <p className="journey-page__empty-state">
                No visits published yet. Stories and communities will appear here after each visit.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="journey-page__school-invite-section" aria-labelledby="journey-invite-title">
        <div className="journey-page__wrap">
          <div className="journey-page__school-invite journey-page__reveal">
            <figure className="journey-page__school-invite-photo">
              <img
                src={schoolInviteImage}
                alt="Sunlit classroom with wooden desks and chairs in Hồ Chí Minh City, Vietnam"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="journey-page__school-invite-copy">
              <h2 id="journey-invite-title">Invite Us to Your School</h2>
              <p>
                Are you a school principal, teacher, school counsellor or educational
                representative? Would you like us to visit your school and organise
                a mental health awareness presentation for your students? We would
                be delighted to hear from you.
              </p>
              <p className="journey-page__availability">
                Presentations are free. As we travel on foot with a donkey, visits
                and dates depend on our route, weather and our donkey&apos;s well-being.
                We cannot guarantee every invitation.
              </p>
              <button className="journey-page__button" type="button" onClick={() => openInquiry("school")}>
                Invite us to your school <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="journey-page__follow" aria-labelledby="journey-follow-title">
        <div className="journey-page__wrap journey-page__follow-inner">
          <div>
            <h2 id="journey-follow-title">Follow Our Footsteps</h2>
            <p>
              Throughout our journey, we will share our progress, stories,
              photographs, videos and experiences from the road on Facebook,
              Instagram and our other social media channels.
            </p>
            <div className="journey-page__follow-topics">
              <h3>What you can follow</h3>
              <ul className="journey-page__follow-list">
                <li>Our current location and journey progress.</li>
                <li>The distance we have travelled.</li>
                <li>Our upcoming destinations.</li>
                <li>The schools and communities we have visited.</li>
                <li>Daily adventures and unexpected challenges.</li>
                <li>Updates about our donkey.</li>
                <li>Our fundraising progress.</li>
                <li>Personal stories and meaningful encounters, shared with permission.</li>
              </ul>
            </div>
          </div>
          <div className="journey-page__follow-links">
            <Link to={getLocalizedPath("stories", language)}>Explore stories <span aria-hidden="true">↗</span></Link>
            <Link to={getLocalizedPath("walk-with-us", language)}>Walk with us <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="journey-page__wrap">
          <p className="journey-page__closing-quote journey-page__reveal">
            <span>Every kilometre has a story.</span>
            <span>Every encounter has the potential to make a difference.</span>
          </p>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="journey-page__dialog"
        aria-labelledby="journey-dialog-title"
      >
        <div className="journey-page__dialog-header">
          <div>
            <h2 id="journey-dialog-title">
              {formType === "host" ? "Offer to host us" : "Invite us to your school"}
            </h2>
          </div>
          <button
            className="journey-page__dialog-close"
            type="button"
            aria-label="Close form"
            onClick={() => dialogRef.current?.close()}
          >
            ×
          </button>
        </div>

        <p className="journey-page__dialog-intro">
          {formType === "host"
            ? "Tell us where you are and what space you could offer. A general area is enough for now."
            : "Tell us about your school and the students you would like us to meet."}
        </p>

        <form key={formType} className="journey-page__form" onSubmit={handleInquirySubmit}>
          <div className="journey-page__form-grid">
            <label>
              <span className="journey-page__field-label">Name*</span>
              <input name="name" type="text" autoComplete="name" maxLength="100" required />
            </label>
            <label>
              <span className="journey-page__field-label">Email address*</span>
              <input name="email" type="email" autoComplete="email" maxLength="254" required />
            </label>
            {formType === "school" && (
              <label>
                <span className="journey-page__field-label">School name*</span>
                <input name="school" type="text" maxLength="160" required />
              </label>
            )}
            <label>
              <span className="journey-page__field-label">Town / province*</span>
              <input name="area" type="text" maxLength="120" required />
            </label>
            {formType === "school" && (
              <label>
                <span className="journey-page__field-label">Student year groups*</span>
                <input name="yearGroups" type="text" placeholder="For example, Year 10–12" maxLength="100" required />
              </label>
            )}
            <label>
              <span className="journey-page__field-label">
                {formType === "host" ? "When could you host us?" : "Preferred dates"}
              </span>
              <input name="availability" type="text" placeholder="Dates can be flexible" maxLength="120" />
            </label>
          </div>

          {formType === "host" && (
            <label>
              <span className="journey-page__field-label">Space, water and shelter for our donkey*</span>
              <textarea name="donkeySpace" rows="3" maxLength="600" required />
            </label>
          )}
          <label>
            <span className="journey-page__field-label">Anything else we should know?</span>
            <textarea name="message" rows="3" maxLength="800" />
          </label>

          <button className="journey-page__button journey-page__button--submit" type="submit">
            Submit <span aria-hidden="true">→</span>
          </button>
        </form>
      </dialog>
    </article>
  );
}

export default Journey;
