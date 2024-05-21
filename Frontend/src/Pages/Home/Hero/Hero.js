import "./Hero.css";

const Hero = () => {
  return (
    <section id="hero" className="Hero-section">
      <div className="container">
        <div className="info">
          <h1 className="header-text-color">
            Fuel Startup Growth. Launch Your Career. Connect on
            <span className="special">Wefind.</span>
          </h1>
          <p>
            Startups find skilled volunteers. Talents gain experience & build
            careers. Join Wefind, your gateway to success!
          </p>
          <div className="btn">
            <button className="button company">Companies</button>
            <button className="button">Talents</button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
