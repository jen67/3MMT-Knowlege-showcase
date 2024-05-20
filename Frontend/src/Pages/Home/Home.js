import React from "react";
import "./Home.css"
import Footer from "../../Components/Footer/Footer";
import images from "../../Components/images";
import Subscribe from "./Subscribe/Subscribe";
import Faq from "./Faq/Faq";
import Testimonial from "./Testimonial/Testimonial";
import Talents from "./Benefits/Talents/Talents";

const Home = () => {
  return (
    <>
      {/* Hero Section   */}
      <section id="hero" className="Hero-section" >
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

      {/* <!-- Benefits for Companies Section --> */}
      <section id="benefits-companies">
        <div className="container">
          <h2>Benefits for Companies</h2>
          <div className="company-flex">
            <div className="row">
              <div className="col-1-2">
                <img src={images.business} alt=" business" />
              </div>
              <div className="col-1-2 side-content">
                <p>
                  Joining Wefind offers a multitude of benefits for companies:
                </p>
                <ul>
                  <li>Access to a diverse pool of qualified candidates.</li>
                  <li>Efficient job posting and candidate management tools.</li>
                  <li>Customized matchmaking based on your hiring needs.</li>
                  <li>
                    Brand exposure and visibility among top talents in your
                    industry.
                  </li>
                </ul>
                <p>
                  Experience the advantages of Wefind and streamline your hiring
                  process today!
                </p>
                <button className="button business">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>

     <Talents />
      <Testimonial />
      <Faq />
      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;
