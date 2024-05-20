import images from "../../../../Components/images";
import "./Talents.css";

const Talents = () => {
    return (
      <section>
        <div className="benefits-talents">
          <div className="container">
            <h2>Benefits for Talents</h2>
            <div className="Talents">
              <img
                src={images.talentImg}
                alt="Illustration representing talents"
              />
            </div>
            <div className="company-flex">
              <div className="row">
                <div className="col-1-2 side-content">
                  <p className="Talent-header">Talents on Wefind enjoy a host of benefits:</p>
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
                  <button
                    className="button white-button"
                    aria-label="Get started with Wefind"
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Talents;