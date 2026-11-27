import "./Contact.css";
import walkingTogether from "../../assets/images/contact/walking-together.jpg";
import vietnamCountryside from "../../assets/images/contact/vietnam-countryside.jpg";
import writingMessage from "../../assets/images/contact/writing-message.jpg";
import calmDalatLake from "../../assets/images/contact/calm-dalat-lake.jpg";

const contactTopics = [
  ["Walk With Us", "Apply to join our adventure for 3, 5 or 10 days."],
  ["Host Us", "Offer a safe place for us and our donkey to spend the night."],
  ["School Visits", "Invite us to your school for a mental health awareness presentation."],
  ["Community Visits", "Introduce us to your village or local community."],
  ["Corporate Sponsorship", "Explore sponsorship and partnership opportunities."],
  ["Donations", "Learn more about financially supporting HOPE."],
  ["Media and Press", "Arrange interviews, articles or media coverage."],
  ["Animal Welfare", "Ask questions about our donkey, her care or our equipment."],
  ["General Enquiries", "Share your ideas, suggestions, questions or encouragement."],
];

const socialChannels = [
  ["Facebook", "Daily updates, photographs, stories and community interactions.", "fa-facebook-f"],
  ["Instagram", "Beautiful landscapes, memorable moments and a closer look at life on the road.", "fa-instagram"],
  ["YouTube", "Travel documentaries, interviews, school visits and longer videos about our expedition.", "fa-youtube"],
  ["TikTok", "Short videos, funny moments, daily adventures and mental health awareness messages.", "fa-tiktok"],
  ["LinkedIn", "Professional updates, corporate partnerships, educational initiatives and the social impact of our expedition.", "fa-linkedin-in"],
  ["Threads", "Short personal reflections, daily updates and conversations from the road.", "fa-threads"],
  ["Zalo", "Connecting with local communities, schools and supporters throughout Vietnam.", null],
];

function Contact() {
  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const topic = String(form.get("topic") || "General Enquiries");
    const message = String(form.get("message") || "").trim();

    for (const [value, fieldName, prompt] of [
      [name, "name", "Please enter your name."],
      [email, "email", "Please enter your email."],
      [message, "message", "Please write a message."],
    ]) {
      if (value) continue;
      const field = event.currentTarget.elements.namedItem(fieldName);
      field.setCustomValidity(prompt);
      field.reportValidity();
      field.addEventListener("input", () => field.setCustomValidity(""), { once: true });
      return;
    }

    const subject = `GoDonkey enquiry: ${topic}`;
    const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`;
    window.location.href = `mailto:godonkey@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <article className="contact-page" aria-labelledby="contact-title">
      <header className="contact-page__hero">
        <div className="contact-page__hero-layout">
          <div className="contact-page__hero-copy">
            <div className="contact-page__hero-inner">
              <h1 id="contact-title">Contact Us</h1>
              <p className="contact-page__hero-lead">Every connection begins with a conversation.</p>
              <p>Whether you have a question about our journey, would like to support our mission, invite us to your school or simply share some words of encouragement, we would love to hear from you.</p>
              <p>GoDonkey is about connecting people, communities and organisations throughout Vietnam and beyond. Everyone is welcome to be part of our journey.</p>
            </div>
          </div>
          <figure className="contact-page__hero-figure">
            <img src={walkingTogether} alt="Two people walking together along a rural road in Vietnam" fetchPriority="high" />
          </figure>
        </div>
        <aside className="contact-page__direct" aria-labelledby="contact-direct-title">
          <div className="contact-page__wrap contact-page__direct-inner">
            <div className="contact-page__direct-details">
              <h2 id="contact-direct-title">Get in Touch</h2>
              <dl>
                <div><dt>Email</dt><dd><a href="mailto:godonkey@gmail.com">godonkey@gmail.com</a></dd></div>
                <div><dt>Website</dt><dd><a href="https://www.godonkey.org">www.godonkey.org</a></dd></div>
              </dl>
            </div>
            <p>We will do our best to respond to your message as soon as possible. However, please understand that during our expedition, we may have limited internet access, particularly when travelling through remote areas of Vietnam.</p>
          </div>
        </aside>
      </header>

      <section className="contact-page__topics contact-page__wrap" aria-labelledby="contact-topics-title">
        <div className="contact-page__section-intro">
          <h2 id="contact-topics-title">How Can We Help You?</h2>
          <p>Feel free to contact us regarding:</p>
        </div>
        <ul className="contact-page__topic-list">
          {contactTopics.map(([title, description]) => (
            <li key={title}><h3>{title}</h3><p>{description}</p></li>
          ))}
        </ul>
        <p className="contact-page__section-close">Every message is welcome, and every connection has the potential to make a difference.</p>
      </section>

      <section className="contact-page__social" aria-labelledby="contact-social-title">
        <div className="contact-page__wrap">
          <div className="contact-page__social-intro">
            <div className="contact-page__section-intro">
              <h2 id="contact-social-title">Follow Us on Social Media</h2>
              <p className="contact-page__social-lead">You don't have to walk 3,450 kilometres to experience the adventure with us.</p>
              <p>Through our social media channels, we will share our daily experiences, beautiful landscapes, unexpected encounters, school visits, challenges and special moments with our donkey.</p>
              <p>Follow us, share our stories and help us spread awareness of mental health and suicide prevention.</p>
            </div>
            <figure className="contact-page__social-figure">
              <img src={vietnamCountryside} alt="People gathering in a rice field near Quy Nhon, Vietnam" loading="lazy" />
            </figure>
          </div>
          <ul className="contact-page__social-list">
            {socialChannels.map(([name, description, icon]) => (
              <li key={name}>
                <span className="contact-page__social-mark" aria-hidden="true">
                  {icon ? <i className={`fa-brands ${icon}`} /> : <i className="fa-solid fa-comments" />}
                </span>
                <div><h3>{name}</h3><p>{description}</p></div>
              </li>
            ))}
          </ul>
          <p className="contact-page__social-note">Official profile links will be added here when available.</p>
        </div>
      </section>

      <div className="contact-page__wrap contact-page__invitations">
        <section aria-labelledby="contact-media-title">
          <h2 id="contact-media-title">Media and Press Enquiries</h2>
          <p>We welcome local and international journalists, newspapers, television stations, radio stations, documentary makers and other media organisations interested in our expedition and its mission.</p>
          <p>For interviews, press releases, photographs, video materials or additional information, please contact us by email.</p>
          <a className="contact-page__button" href="mailto:godonkey@gmail.com?subject=Media%20and%20Press%20Enquiry">Contact Our Media Team</a>
        </section>
        <section aria-labelledby="contact-partners-title">
          <h2 id="contact-partners-title">Partnerships and Sponsorships</h2>
          <p>We believe that meaningful change happens when people and organisations work together.</p>
          <p>If your company or organisation shares our passion for mental health awareness, suicide prevention, education, animal welfare or community development, we would be delighted to explore potential collaborations.</p>
          <p>Together, we can create something that goes beyond the journey itself.</p>
          <a className="contact-page__button" href="mailto:godonkey@gmail.com?subject=Partnership%20and%20Sponsorship%20Enquiry">Become a Partner</a>
        </section>
      </div>

      <section className="contact-page__message" id="send-message" aria-labelledby="contact-message-title">
        <div className="contact-page__wrap contact-page__message-layout">
          <div>
            <h2 id="contact-message-title">Send Us a Message</h2>
            <p>Not sure which category your question belongs to? Simply complete our contact form, and we will get back to you when possible.</p>
            <p>We look forward to hearing from you.</p>
            <figure className="contact-page__message-figure">
              <img src={writingMessage} alt="A person writing a message in a notebook" loading="lazy" decoding="async" />
            </figure>
          </div>
          <form className="contact-page__form" onSubmit={handleSubmit}>
            <div className="contact-page__form-row">
              <label htmlFor="contact-name">Your name<input id="contact-name" name="name" type="text" autoComplete="name" required /></label>
              <label htmlFor="contact-email">Your email<input id="contact-email" name="email" type="email" autoComplete="email" required /></label>
            </div>
            <label htmlFor="contact-topic">What is your message about?
              <select id="contact-topic" name="topic" defaultValue="General Enquiries">
                {contactTopics.map(([title]) => <option key={title} value={title}>{title}</option>)}
              </select>
            </label>
            <label htmlFor="contact-body">Your message<textarea id="contact-body" name="message" rows="6" required /></label>
            <button className="contact-page__button" type="submit">Open email app to send</button>
            <p className="contact-page__form-note">This opens your email app with your message ready. Please send it from there. You can also email <a href="mailto:godonkey@gmail.com">godonkey@gmail.com</a> directly.</p>
          </form>
        </div>
      </section>

      <section className="contact-page__support contact-page__wrap" aria-labelledby="contact-support-title">
        <div className="contact-page__support-heading">
          <h2 id="contact-support-title">Looking for Mental Health Support?</h2>
          <figure className="contact-page__support-figure">
            <img src={calmDalatLake} alt="Morning mist over a quiet lake and forest in Da Lat, Vietnam" loading="lazy" decoding="async" />
          </figure>
        </div>
        <div className="contact-page__support-copy">
          <p>Please remember that GoDonkey is an awareness and fundraising initiative, not a mental health service or emergency response organisation.</p>
          <p>If you are experiencing emotional distress or suicidal thoughts, please contact the HOPE Suicide Prevention Hotline through its official channels.</p>
          <a className="contact-page__button" href="https://hyvongsong.com/en/" target="_blank" rel="noopener noreferrer">Visit HOPE Suicide Prevention Hotline</a>
          <p>Our GoDonkey email and social media accounts are not continuously monitored and should not be used for urgent crisis support.</p>
          <p>If you or someone else is in immediate danger, please contact emergency medical services or visit the nearest hospital.</p>
        </div>
      </section>

      <section className="contact-page__closing" aria-labelledby="contact-closing-title">
        <div className="contact-page__wrap">
          <h2 id="contact-closing-title">Let's Stay Connected</h2>
          <p>One donkey. Thousands of kilometres. Countless stories. One mission.</p>
          <strong>Together, we walk. Together, we connect. Together, we give HOPE.</strong>
          <div className="contact-page__closing-links">
            <a href="https://www.godonkey.org">www.godonkey.org</a>
            <a href="mailto:godonkey@gmail.com">godonkey@gmail.com</a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Contact;
