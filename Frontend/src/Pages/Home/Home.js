import React from "react";
import "./Home.css";
import Footer from "../../Components/Footer/Footer";
import Subscribe from "./Subscribe/Subscribe";
import Faq from "./Faq/Faq";
import Testimonial from "./Testimonial/Testimonial";
import Talents from "./Benefits/Talents/Talents";
import Company from "./Benefits/Company/Company";
import Hero from "./Hero/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <Company />
      <Talents />
      <Testimonial />
      <Faq />
      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;
