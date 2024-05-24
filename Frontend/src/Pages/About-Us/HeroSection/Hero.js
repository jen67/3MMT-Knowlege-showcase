// src/components/Hero.js
import React from "react";
import images from "../../../Components/images";
import "./Hero.css";

const Hero = () => {

  const styles = {
    backgroundImage: `url(${images.aboutusBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section
      className="Abouthero"
      style={styles}
    >
      <div className="Abouthero-content">
        <h1>
          Welcome to Wefind, where innovation meets opportunity, and connections
          drive success.
        </h1>
      </div>
    </section>
  );
};

export default Hero;
