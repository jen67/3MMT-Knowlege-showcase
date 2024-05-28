// src/components/VisionMission.js
import React from "react";
import "./VisionMission.css";
import images from "../../../Components/images";


const VisionMission = () => {
  return (
    <>
    <section className="vision-mission">
      <div className="vision">
        <img src={images.vision} alt="Vision icon" />
        <h2>Our Vision</h2>
        <p>
          At Wefind, we envision a world where talent meets opportunity
          seamlessly. Our mission is to create a global ecosystem where
          individuals find the right opportunities and companies discover their
          perfect match effortlessly. 
        </p>
      </div>
      <div className="mission">
        <img src={images.mission} alt="Mission icon" />
        <h2>Our Mission</h2>
        <p>
          At Wefind, our mission is clear: to redefine the way talents and
          companies connect. We're not just a platform; we're a catalyst for
          change, empowering individuals to unlock their full potential and
          businesses to thrive in a competitive landscape.
        </p>
      </div>
    </section>
    
    </>
  );
};

export default VisionMission;
