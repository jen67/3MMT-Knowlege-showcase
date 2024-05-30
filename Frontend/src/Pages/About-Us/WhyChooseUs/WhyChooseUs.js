import React from "react";
import "./WhyChooseUs.css";

const reasons = [
  {
    number: "01",
    title: "Unparalleled Experience",
    description:
      "With years of experience and a proven track record of success, Wefind is your trusted partner in talent acquisition and recruitment. ",
  },
  {
    number: "02",
    title: "Personalized Approach",
    description:
      "we take a personalized approach to every interaction, ensuring that your needs are met and your expectations exceeded.",
  },
  {
    number: "03",
    title: "Results-Driven Solution",
    description:
      "We’re not just about promises; we're about results. From startups to companies of all sizes, We deliver  results that drive growth and success.",
  },
  {
    number: "04",
    title: "Affordable Pricing",
    description:
      "Enjoy our services without breaking the bank. Our pricing plans are affordable for all business sizes, ensuring you get the most value.",
  },
  {
    number: "05",
    title: "Hassle-Free Process",
    description:
      "We handle the matching of talented professionals to businesses that require their services, ensuring a stress-free experience.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div className="reasons">
        <div className="header-text">
          <h2>Why Choose Us?</h2>
          <p>
            Whether you're seeking top talent or a rewarding company, we've got
            you covered. We ensure you receive the very best at all time.
          </p>
        </div>
        {reasons.map((reason, index) => (
          <div key={index} className="reason">
            <div className="number">{reason.number}</div>
            <h3 className="Title">{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
