import React, { useState, useEffect } from 'react';
import './Hero.css';
import images from '../../../Components/images';


const imageArray = [
    images.hompbg,
    images.hompbg1,
    images.hompbg2,
    images.hompbg3,
];
  
const Hero = () => {
   
   const [imageIndex, setImageIndex] = useState(0);

   useEffect(() => {
     imageArray.forEach((image) => {
       new Image().src = image;
     });
   }, []);

   useEffect(() => {
     const timer = setInterval(() => {
       setImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
     }, 5000); // Change image every 5 seconds

     return () => clearInterval(timer); // Clean up on component unmount
   }, []);
    
  const herostyle = {
    backgroundImage: `url(${imageArray[imageIndex]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section id="hero" className="Hero-section">
      <div className="background" style={herostyle}>
        <div className="overlay"></div>
      </div>
      <div className="info">
        <h1>
          Fuel Startup Growth. Launch Your Career. Connect on
          <span>Wefind.</span>
        </h1>
        <p>
          Startups find skilled volunteers. Talents gain experience & build
          careers. Join Wefind, your gateway to success!
        </p>
        <div className="btn">
          <button className="business-button">Companies</button>
          <button className="white-button">Talents</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;