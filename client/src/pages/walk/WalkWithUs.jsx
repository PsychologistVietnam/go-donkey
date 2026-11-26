import expeditionImage from "../../assets/images/home/hero.png";
import "./WalkWithUs.css";

const roadImage =
  "https://cdn.pixabay.com/photo/2022/04/27/04/20/road-7159634_1280.jpg";
const donkeyImage =
  "https://images.pexels.com/photos/13422399/pexels-photo-13422399.jpeg?auto=compress&cs=tinysrgb&w=1100";
const communityImage =
  "https://images.pexels.com/photos/29635424/pexels-photo-29635424.jpeg?auto=compress&cs=tinysrgb&w=1600";

const walkLengths = [
  { days: "3 days", description: "A taste of the adventure." },
  { days: "5 days", description: "Become part of our daily journey." },
  { days: "10 days", description: "A deeper experience of life on the road." },
];

const companionQualities = [
  "Enjoy walking, nature and outdoor adventures.",
  "Feel connected to the topic of mental health, whether through personal experiences, professional involvement or simply caring about others.",
  "Are comfortable sleeping outdoors when necessary.",
  "Enjoy meeting new people and discovering different cultures.",
  "Are physically prepared for long walks (12 km a day) and challenging weather conditions.",
  "Can adapt to unexpected situations and changing plans.",
  "Respect animals, local communities and Vietnamese traditions.",
  "Enjoy meaningful conversations but also appreciate moments of silence.",
  "Are independent and comfortable taking care of yourself.",
  "Have a good sense of humour, even when things don't go according to plan.",
];

const values = [
  {
    title: "Politically neutral:",
    description:
      "We consider ourselves neither left-wing nor right-wing. Our journey is not a platform for political campaigns or ideological activism.",
  },
  {
    title: "Respect for different lifestyles:",
    description:
      "We respect vegetarians and vegans, but we are not vegan ourselves. We expect mutual respect without imposing personal lifestyle choices on others.",
  },
  {
    title: "Respect for different beliefs:",
    description:
      "Everyone is welcome, regardless of religious beliefs or personal background as long if you keep it for yourself. Discrimination and intolerance have no place on our journey. We both do not have any religion.",
  },
  {
    title: "Authenticity over publicity:",
    description:
      "You are welcome to take pictures and share your experience, but we are not looking for influencers whose primary motivation is fame, followers or commercial exposure.",
  },
  {
    title: "Privacy and dignity:",
    description:
      "Please respect the privacy of local people, fellow walkers and anyone who shares personal mental health experiences.",
  },
  {
    title: "Kindness and teamwork:",
    description:
      "We value people who are considerate, helpful and willing to contribute to the daily challenges of life on the road.",
  },
];

const responsibilities = [
  "Food, drinks and accommodation.",
  "Travel expenses and transportation.",
  "Personal equipment and belongings.",
  "Travel and medical insurance.",
  "Physical health, personal safety and fitness.",
  "Transportation to and from our meeting and departure locations.",
];

const journeyIsNot = [
  "Psychological therapy or counselling.",
  "Mental health treatment.",
  "Physical or psychological rehabilitation.",
  "A therapeutic retreat.",
  "A supervised recovery programme.",
];

function WalkWithUs() {
  return (
    <article className="walk-page" aria-labelledby="walk-page-title">
      <header className="walk-page__hero">
        <div className="walk-page__hero-copy">
          <h1 id="walk-page-title">Walk With Us</h1>
          <p className="walk-page__opening">
            One donkey. One mission. Thousands of kilometres.
            <br />
            And perhaps a few days with you.
          </p>
          <p>
            Our journey through Vietnam is about more than walking. It is about
            human connections, raising awareness of mental health, supporting
            suicide prevention and discovering the beauty of Vietnam and its
            people.
          </p>
        </div>
        <figure className="walk-page__hero-figure">
          <img
            src={expeditionImage}
            alt="Two walkers with a donkey in a green mountain landscape"
            fetchPriority="high"
          />
        </figure>
      </header>

      <section className="walk-page__invitation walk-page__wrap" aria-labelledby="walk-invitation-title">
        <div className="walk-page__intro-copy">
          <h2 id="walk-invitation-title">Walk part of the journey</h2>
          <p>
            During our expedition, we would love to share part of this adventure
            with others. We welcome a maximum of two guests at any one time,
            joining us for:
          </p>
        </div>
        <ul className="walk-page__durations" aria-label="Walking durations">
          {walkLengths.map(({ days, description }) => (
            <li key={days}>
              <strong>{days}</strong>
              <span>– {description}</span>
            </li>
          ))}
        </ul>
        <p className="walk-page__intro-note">
          You don't need to be a professional adventurer. You do, however, need
          an open mind, a positive attitude and a willingness to step outside
          your comfort zone.
        </p>
      </section>

      <section className="walk-page__section walk-page__section--single walk-page__wrap" aria-labelledby="walk-companion-title">
        <div className="walk-page__section-heading">
          <h2 id="walk-companion-title">Who Are We Looking For?</h2>
          <p>You might be the perfect walking companion if you:</p>
        </div>
        <ul className="walk-page__quality-list">
          {companionQualities.map((quality) => (
            <li key={quality}>{quality}</li>
          ))}
        </ul>
      </section>

      <section className="walk-page__section walk-page__section--soft" aria-labelledby="walk-values-title">
        <div className="walk-page__wrap walk-page__values-layout">
          <div className="walk-page__section-heading">
            <h2 id="walk-values-title">Our Values</h2>
            <p>
              We are friendly, enthusiastic, approachable and open-minded. We
              welcome people from different backgrounds, cultures and walks of
              life.
            </p>
          </div>
          <div className="walk-page__values-content">
            <ul className="walk-page__values-list">
              {values.map(({ title, description }) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
            <p className="walk-page__values-close">
              You do not have to agree with us on everything. Mutual respect is
              what matters.
            </p>
          </div>
        </div>
      </section>

      <section className="walk-page__section walk-page__wrap walk-page__field-notes" aria-labelledby="walk-unexpected-title">
        <figure className="walk-page__editorial-photo walk-page__editorial-photo--road">
          <img
            src={roadImage}
            alt="A winding mountain road in fog at Hải Vân Pass, Vietnam"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="walk-page__reading-column">
          <h2 id="walk-unexpected-title">Expect the Unexpected</h2>
          <p>
            This is an expedition, not an organised holiday. Quite often, when
            we wake up in the morning, we have no idea where we will sleep that
            evening. We may stay in a small guesthouse, sleep outdoors or find
            ourselves somewhere completely unexpected.
          </p>
          <p>
            There may be heavy rain, uncomfortable temperatures, muddy roads,
            limited facilities, insects, tired legs and changes to our route.
            There will also be beautiful landscapes, unexpected encounters,
            laughter, meaningful conversations and unforgettable memories.
          </p>
          <p>
            Flexibility is essential. The adventure is not always comfortable,
            and that is part of what makes it special.
          </p>
        </div>
      </section>

      <section className="walk-page__donkey" aria-labelledby="walk-donkey-title">
        <div className="walk-page__wrap walk-page__donkey-layout">
          <figure className="walk-page__editorial-photo walk-page__editorial-photo--donkey">
            <img
              src={donkeyImage}
              alt="Stock photograph of a donkey standing in a grassy field"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="walk-page__reading-column">
            <h2 id="walk-donkey-title">Our Donkey Always Comes First</h2>
            <p>
              The health, safety and well-being of our donkey are our absolute
              priority.
            </p>
            <ul className="walk-page__donkey-decisions">
              <li><strong>If our donkey needs to rest,</strong> we rest.</li>
              <li><strong>If our donkey cannot continue,</strong> we stop.</li>
              <li>
                <strong>If weather conditions or road conditions are unsuitable,</strong>{" "}
                we change our plans.
              </li>
            </ul>
            <p>
              This may mean walking fewer kilometres, staying somewhere longer
              than expected or changing the entire route.
            </p>
            <p className="walk-page__donkey-promise">
              Our donkey is our travelling companion, not a machine. We expect
              everyone who joins us to share this understanding.
            </p>
          </div>
        </div>
      </section>

      <div className="walk-page__practical">
        <div className="walk-page__wrap">
          <section className="walk-page__section walk-page__practical-section" aria-labelledby="walk-responsibility-title">
            <div className="walk-page__section-heading">
              <h2 id="walk-responsibility-title">Your Adventure, Your Responsibility</h2>
              <p>
                Although we are happy to welcome you into our journey, you
                participate as an independent travelling companion.
              </p>
            </div>
            <div className="walk-page__reading-column">
              <p className="walk-page__age-rule">
                <strong>Participants must be at least 18 years old</strong> and
                should be comfortable travelling independently.
              </p>
              <p>You are responsible for your own:</p>
              <ul className="walk-page__simple-list">
                {responsibilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <ul className="walk-page__responsibility-points">
                <li>
                  We are not a travel agency, tour operator or professional
                  guiding service.
                </li>
                <li>
                  We cannot guarantee specific routes, distances, accommodation
                  or arrival dates.
                </li>
                <li>
                  We also reserve the right to end someone's participation if
                  their behaviour compromises the safety or well-being of others
                  or our donkey.
                </li>
              </ul>
            </div>
          </section>

          <section className="walk-page__section walk-page__practical-section walk-page__practical-section--limits" aria-labelledby="walk-not-title">
            <div className="walk-page__limits-inner">
              <h2 id="walk-not-title">
                What This Journey <span className="walk-page__nowrap">Is Not</span>
              </h2>
              <p className="walk-page__limits-intro">
                Although mental health awareness and suicide prevention are at
                the heart of our mission, joining our walk is not a form of:
              </p>
              <ul className="walk-page__simple-list walk-page__limits-list">
                {journeyIsNot.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="walk-page__limits-close">
                You are welcome to share your story, but you are never expected
                or pressured to do so. We are simply people walking together
                for a meaningful cause.
              </p>
            </div>
          </section>
        </div>
      </div>

      <section className="walk-page__section walk-page__wrap walk-page__purpose" aria-labelledby="walk-purpose-title">
        <div className="walk-page__section-heading">
          <h2 id="walk-purpose-title">Walk for a Purpose</h2>
        </div>
        <div className="walk-page__reading-column">
          <p>
            We do not charge a participation fee for joining our expedition.
            However, we kindly encourage participants to make a voluntary
            financial donation or arrange sponsorship for their walk to support
            our suicide prevention mission in Vietnam. You could ask friends,
            family members, colleagues or your employer to sponsor your
            adventure.
          </p>
          <p>Every contribution, big or small, can help make a difference.</p>
        </div>
      </section>

      <figure className="walk-page__community-photo">
        <img
          src={communityImage}
          alt="Hikers on a mountain trail in Lào Cai, Vietnam"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <section className="walk-page__closing" aria-labelledby="walk-interest-title">
        <div className="walk-page__wrap walk-page__closing-layout">
          <div className="walk-page__closing-intro">
            <h2 id="walk-interest-title">Still Enthusiastic?</h2>
            <p>
              If everything you have read makes you even more excited about
              joining us, we would love to hear from you!
            </p>
          </div>
          <div className="walk-page__contact-panel">
            <h3>Contact us</h3>
            <p>
              Tell us a little about yourself, why you would like to join our
              journey and whether you are interested in walking with us for 3,
              5 or 10 days.
            </p>
            <a
              className="walk-page__contact-link"
              href="mailto:godonkey@gmail.com?subject=Walk%20With%20Us"
            >
              Email us to join
            </a>
            <a className="walk-page__contact-address" href="mailto:godonkey@gmail.com">
              godonkey@gmail.com
            </a>
          </div>
          <div className="walk-page__closing-note">
            <p>
              As we only welcome a maximum of two guests at a time, we cannot
              guarantee availability or acceptance.
            </p>
            <p>
              We will get in touch to explore the possibilities and see whether
              we are a good match.
            </p>
          </div>
          <p className="walk-page__closing-farewell">
            Come as a stranger. Walk as a friend. Leave with a story.
          </p>
        </div>
      </section>
    </article>
  );
}

export default WalkWithUs;
