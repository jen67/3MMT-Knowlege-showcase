import "./Company.css";
import images from "../../../../Components/images";

const Company = () => {
  return (
    <section id="benefits-companies">
      <h2>Benefits for Companies</h2>
      <div className="company-flex">
       
            <div className="col-1-2">
              <img src={images.business} alt=" business" />
            </div>
            <div className="col-1-2 side-content">
              <p className="company-theader">
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
              <p  className="company-btext">
                Experience the advantages of Wefind and streamline your hiring
                process today!
              </p>
              <button className="business-button">Get Started</button>
            </div>
          </div>
    </section>
  );
};

export default Company;
