import React from "react";
import "./Testimonial.css";
import images from "../../../Components/images";

const Testimonial = () => {
  const cardContainer = React.useRef(null);
  const nextButton = React.useRef(null);
  const prevButton = React.useRef(null);

  const scrollCard = (direction) => {
    if (direction === "next") {
      cardContainer.current.scrollLeft += cardContainer.current.offsetWidth;
    } else if (direction === "prev") {
      cardContainer.current.scrollLeft -= cardContainer.current.offsetWidth;
    }
  };

  return (
    <section id="success-stories">
      <div className="Tsheading">
        <h2>Testimonial</h2>
        <h3>What Our Clients Say</h3>
        <p>
          Discover how Wefind has transformed the careers of both talents and
          companies:
        </p>
      </div>
      <div className="swipe">
        <button
          onClick={() => scrollCard("prev")}
          ref={prevButton}
          className="white-btn previous"
        >
          &#10094;
        </button>
        <button
          onClick={() => scrollCard("next")}
          ref={nextButton}
          className="white-btn next"
        >
          &#10095;
        </button>
      </div>

      <div ref={cardContainer} className="Testimonials-group">
        <div className="card">
          <div className="card-header">
            <img src={images.emilyJ} alt="Emily-Johnson" />
            <div className="name-positon">
              <p>Emily .D.Johnson</p>
              <p>Software Engineer</p>
            </div>
          </div>

          <div className="testimonal">
            <div className="stars">
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
            </div>
            <p>I landed my dream job through Wefind and couldn't be happier!</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <img src={images.johnsonS} alt="Johnson-Smith" />
            <div className="name-positon">
              <p>Johnson .R. Smith</p>
              <p>C.E.O T.I.I</p>
            </div>
          </div>

          <div className="testimonal">
            <div className="stars">
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
            </div>
            <p>
              I Thanks to Wefind, we found the perfect candidate for our team in
              no time!
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <img src={images.sarahL} alt="Sarah-Leeh" />
            <div className="name-positon">
              <p>Sarah Lee</p>
              <p>C.E.O D.S.A</p>
            </div>
          </div>

          <div className="testimonal">
            <div className="stars">
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
            </div>
            <p>
              Wefind connected us with a skilled web developer who exceeded our
              expectations!
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <img src={images.davidB} alt="David-Brown" />
            <div className="name-positon">
              <p>David Brown</p>
              <p>UI/UX</p>
            </div>
          </div>

          <div className="testimonal">
            <div className="stars">
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
            </div>
            <p>
              Thanks to Wefind, I found a company that values my skills and
              offers opportunities for growth!'
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <img src={images.alexandraM} alt="Alexandra-M" />
            <div className="name-positon">
              <p>Alexandra .M. David</p>
              <p>Data Scientist</p>
            </div>
          </div>

          <div className="testimonal">
            <div className="stars">
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
              <img src={images.starIcon} alt="star" />
            </div>
            <p>
              Wefind made my job search effortless. I found a role that
              perfectly matches my skills and interests.
            </p>
          </div>
        </div>
      </div>

      <p className="bottom-text">
        Join the growing list of success stories on Wefind today! Share your
        story with us and inspire others to achieve their goals.
      </p>
    </section>
  );
};

export default Testimonial;
