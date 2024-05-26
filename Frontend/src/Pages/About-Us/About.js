import React from "react";
import "./About.css";
import Hero from "./HeroSection/Hero";
import "./HeroSection/Hero.css";
import VisionMission from "./VisMis/VisionMission";
import WhatSetsUsApart from "./Apart/WhatSetsUsApart";
import WhoWeAre from "./WhoWeAre/WhoWeAre";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import OurTeam from "./OurTeam/OurTeam";
import Footer from "../../Components/Footer/Footer";

const About = () => {
  return (
    <>
      <Hero />
      <VisionMission />
      <WhatSetsUsApart />
      <WhoWeAre />
      <WhyChooseUs />
      <OurTeam />
      <Footer />
    </>
  );
};

export default About;
