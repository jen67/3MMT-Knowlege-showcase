import React from "react";
import "./Home.css"
import Footer from "../../Components/Footer/Footer";
import images from "../../Components/images";
import Subscribe from "./Subscribe/Subscribe";
import Faq from "./Faq/Faq";
import Testimonial from "./Testimonial/Testimonial";

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

      {/* <!-- Benefits for Talents Section --> */}
      <section>
        <div className="benefits-talents">
          <div className="container">
            <h2>Benefits for Talents</h2>
            <div className="company-flex">
              <div className="row">
                <div className="col-1-2 side-content">
                  <p>Talents on Wefind enjoy a host of benefits:</p>
                  <ul>
                    <li>
                      Access to a wide range of job opportunities across various
                      industries and skill sets.
                    </li>
                    <li>
                      Personalized recommendations based on your skills and
                      preferences.
                    </li>
                    <li>
                      Networking opportunities with industry professionals.
                    </li>
                    <li>
                      Career development resources and support to help you
                      thrive in your career.
                    </li>
                  </ul>
                  <p>
                    Unlock endless possibilities and take control of your career
                    journey with Wefind!
                  </p>
                  <button className="button">Get started</button>
                </div>

                <div className="col-1-2">
                  <img src={images.talentImg} alt=" Talents" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonial />
      <Faq />
      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;
