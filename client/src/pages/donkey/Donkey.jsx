import donkeyImage from "../../assets/images/donkey/donkey.jpg";
import cartImage from "../../assets/images/donkey/cart.jpg";
import grazingImage from "../../assets/images/donkey/grazing.jpg";
import mountainRoadImage from "../../assets/images/donkey/mountain-road.jpg";
import ruralHouseImage from "../../assets/images/donkey/rural-house.jpg";
import restingImage from "../../assets/images/donkey/resting.jpg";
import travelEquipmentImage from "../../assets/images/donkey/travel-equipment.jpg";
import dalatLandscapeImage from "../../assets/images/donkey/dalat-landscape.jpg";
import "./Donkey.css";

const welfareNeeds = [
  "Sufficient and appropriate food.",
  "Fresh and clean drinking water.",
  "Regular breaks throughout the day.",
  "A safe and comfortable place to spend the night.",
  "Shade and protection from extreme weather.",
  "Regular hoof care and health checks.",
  "Sufficient time to rest and recover.",
  "Opportunities to graze, relax and behave naturally.",
];

const cartFeatures = [
  ["Lightweight construction", "To minimise the physical effort required from our donkey."],
  ["Suspension system", "To absorb shocks and reduce the impact of uneven roads."],
  ["Braking system", "To improve control and safety, particularly when travelling downhill."],
  ["Electrical lighting", "To improve visibility and safety on the road."],
  ["Specially fitted harness", "Designed to distribute pulling forces appropriately and minimise pressure and friction."],
  ["Balanced weight distribution", "To reduce unnecessary strain on our donkey."],
  ["Supporting legs", "Allowing the cart to stand independently when disconnected from our donkey."],
  ["Protective wheel structure", "To improve safety around the moving wheels."],
  ["Weather-resistant storage", "To protect our equipment, supplies and personal belongings."],
];

function Donkey() {
  return (
    <article className="donkey-page" aria-labelledby="donkey-title">
      <header className="donkey-page__hero">
        <div className="donkey-page__hero-copy">
          <div className="donkey-page__hero-inner">
            <h1 id="donkey-title">Our Donkey</h1>
            <p className="donkey-page__hero-lead">More than a travelling companion. A member of our team.</p>
            <p>At the heart of our adventure is a very special four-legged companion. Our donkey comes from the Puppy Farm in Đà Lạt, Vietnam. She is a dark-coloured female donkey who is accustomed to being around people and interacting with visitors.</p>
            <p>She will be joining us on our approximately 3,450-kilometre journey through Vietnam, from the southernmost part of the country to the far north.</p>
          </div>
        </div>
        <figure className="donkey-page__hero-photo">
          <img src={donkeyImage} alt="Our dark-coloured donkey standing in the Vietnamese mountains" fetchPriority="high" />
        </figure>
      </header>

      <div className="donkey-page__principle">
        <p>However, there is one principle that stands above everything else:</p>
        <strong>Her well-being is more important than completing our journey.</strong>
      </div>

      <section className="donkey-page__section donkey-page__wrap" aria-labelledby="donkey-welfare-title">
        <div className="donkey-page__section-heading">
          <h2 id="donkey-welfare-title">Animal Welfare Comes First</h2>
          <p>Our donkey is not simply a means of transportation. She is our travelling companion, and her physical and emotional well-being will always be our first priority.</p>
          <figure className="donkey-page__welfare-photo">
            <img src={grazingImage} alt="A donkey moving freely through a green pasture" loading="lazy" decoding="async" />
          </figure>
        </div>
        <div className="donkey-page__section-body">
          <p>Every day, we will make sure that she has access to:</p>
          <ul className="donkey-page__needs">{welfareNeeds.map((need) => <li key={need}>{need}</li>)}</ul>
          <p>We will closely monitor her behaviour, appetite, energy levels and physical condition throughout the expedition.</p>
          <p>If she does not want to walk, we will investigate why. If she needs to rest, we rest. If she shows signs of discomfort, exhaustion or illness, we will stop and seek appropriate veterinary care when needed.</p>
          <p className="donkey-page__emphasis">No appointment, school visit, sponsorship agreement or daily distance target will ever take priority over her welfare.</p>
        </div>
      </section>

      <section className="donkey-page__band" aria-labelledby="donkey-weight-title">
        <div className="donkey-page__wrap donkey-page__band-inner">
          <div className="donkey-page__band-heading">
            <h2 id="donkey-weight-title">How Much Weight Will She Pull?</h2>
            <figure className="donkey-page__gear-photo">
              <img src={travelEquipmentImage} alt="Expedition backpack with a water bottle and sleeping mat" loading="lazy" decoding="async" />
            </figure>
          </div>
          <div>
            <p>Our donkey weighs more than 100 kilograms, while our specially designed cart has a target total weight of approximately 70 kilograms, including our luggage and equipment.</p>
            <p>Pulling a well-balanced wheeled cart is different from carrying weight directly on the back. The effort required depends on several factors, including the terrain, road surface, gradient, wheel resistance, weather conditions and the donkey's physical condition.</p>
            <p>For this reason, we will not rely solely on weight calculations. We will continually evaluate whether the workload is appropriate and comfortable for her.</p>
            <p className="donkey-page__emphasis">We will reduce the load, adjust our route or stop walking whenever necessary.</p>
          </div>
        </div>
      </section>

      <section className="donkey-page__cart" aria-labelledby="donkey-cart-title">
        <div className="donkey-page__wrap donkey-page__cart-layout">
          <div>
            <h2 id="donkey-cart-title">Our Custom-Built Cart</h2>
            <p>Our cart has been specially designed and custom-built by a company in Đà Nẵng, Vietnam.</p>
            <p>During the design process, our main objective was to create a lightweight, practical and safe cart that meets the needs of both our donkey and our expedition.</p>
          </div>
          <figure className="donkey-page__cart-photo">
            <img src={cartImage} alt="The custom-built expedition cart with storage, suspension and supporting legs" loading="lazy" decoding="async" />
          </figure>
        </div>
        <div className="donkey-page__wrap donkey-page__features">
          <h3>The cart includes several important features:</h3>
          <ul>{cartFeatures.map(([name, description]) => <li key={name}><strong>{name}</strong><span>{description}</span></li>)}</ul>
          <p>Every unnecessary kilogram matters. We will carefully consider what we bring and continuously evaluate whether our equipment is necessary.</p>
        </div>
      </section>

      <div className="donkey-page__wrap donkey-page__practical">
        <section aria-labelledby="donkey-break-title">
          <h2 id="donkey-break-title">Taking a Break</h2>
          <figure className="donkey-page__break-photo">
            <img src={restingImage} alt="A donkey lying down and resting in a safe outdoor area" loading="lazy" decoding="async" />
          </figure>
          <p>Whenever we stop for a longer break, we can deploy the supporting legs of our cart, allowing it to stand independently.</p>
          <p>This means that we can disconnect our donkey from the cart and give her the opportunity to move freely within a safe area, rest, eat and drink without being attached to any equipment.</p>
          <p>We will also regularly inspect her harness and check for signs of irritation, pressure or discomfort.</p>
          <p className="donkey-page__emphasis">Our breaks are not determined solely by our own needs. Her needs are equally important.</p>
        </section>
        <section aria-labelledby="donkey-road-title">
          <h2 id="donkey-road-title">Safety on the Road</h2>
          <figure className="donkey-page__road-photo">
            <img src={mountainRoadImage} alt="A winding mountain road near Đà Lạt, Vietnam" loading="lazy" decoding="async" />
          </figure>
          <p>Travelling through Vietnam presents many different challenges, from busy rural roads and steep mountain slopes to heavy rainfall and high temperatures.</p>
          <p>We will make every reasonable effort to reduce these risks by choosing suitable routes, avoiding unnecessary traffic, monitoring weather conditions and adjusting our daily walking schedule.</p>
          <p>Whenever road conditions become unsuitable or unsafe for our donkey, we will look for an alternative route or another safe solution.</p>
          <p className="donkey-page__emphasis">We would rather take a longer route than expose her to unnecessary risks.</p>
        </section>
      </div>

      <section className="donkey-page__stay" aria-labelledby="donkey-stay-title">
        <div className="donkey-page__wrap donkey-page__stay-inner">
          <div className="donkey-page__stay-copy">
            <h2 id="donkey-stay-title">Where Will Our Donkey Sleep?</h2>
            <p>Finding a safe overnight location for our donkey will always be our first consideration when looking for accommodation.</p>
            <p>We will look for places where she can rest comfortably, with sufficient space, fresh water, appropriate food and protection from unsuitable weather conditions.</p>
            <p>If you own a farm, homestay, guesthouse or another property with suitable space for a donkey, we would love to hear from you.</p>
            <p>Your hospitality could make a meaningful contribution to our journey.</p>
            <a className="donkey-page__contact" href="mailto:godonkey@gmail.com?subject=Offer%20Our%20Donkey%20a%20Place%20to%20Stay">Offer Our Donkey a Place to Stay</a>
          </div>
          <figure className="donkey-page__stay-photo">
            <img src={ruralHouseImage} alt="A wooden house surrounded by greenery in rural Vietnam" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      <section className="donkey-page__future donkey-page__wrap" aria-labelledby="donkey-future-title">
        <h2 id="donkey-future-title">What Happens After Our Journey?</h2>
        <div className="donkey-page__future-layout">
          <figure className="donkey-page__future-photo">
            <img src={dalatLandscapeImage} alt="Pine trees and farmland in Đà Lạt, Vietnam" loading="lazy" decoding="async" />
          </figure>
          <div className="donkey-page__section-body">
            <p>Our responsibility towards our donkey does not end when we reach our final destination.</p>
            <p>After completing the expedition, our plan is to bring her back to the Puppy Farm in Đà Lạt, where she originally came from and where she is familiar with her surroundings.</p>
            <p>We want her to return to a comfortable and familiar environment where she can continue her life after the adventure.</p>
            <p className="donkey-page__emphasis">Her future matters just as much as the journey itself.</p>
          </div>
        </div>
      </section>

      <section className="donkey-page__promise" aria-labelledby="donkey-promise-title">
        <div className="donkey-page__wrap donkey-page__promise-inner">
          <h2 id="donkey-promise-title">Our Promise</h2>
          <div className="donkey-page__promise-columns">
            <div>
              <p>We have an ambitious goal of walking approximately 3,450 kilometres through Vietnam. However, completing that distance is not our ultimate measure of success.</p>
              <p>A successful journey is one in which we can raise awareness of mental health, support suicide prevention, connect with communities and ensure that our donkey remains healthy, comfortable and well cared for.</p>
            </div>
            <div className="donkey-page__promise-decisions">
              <p>If our journey needs to change, we will change it.</p>
              <p>If our journey needs to stop, we will stop it.</p>
              <p>We can change our plans. We can change our route. But we will never compromise the well-being of our donkey.</p>
            </div>
          </div>
          <p className="donkey-page__promise-quote">She is not carrying our mission. She is sharing it with us.</p>
        </div>
      </section>
    </article>
  );
}

export default Donkey;
