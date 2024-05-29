// src/components/WhatSetsUsApart.js
import React from "react";
import images from "../../../Components/images"; 
import "./WhatSetsUsApart.css";

const features = [
  {
    title: "Innovation",
    description: "We’re at the forefront of technological...",
    icon: images.Innovation,
  },
  {
    title: "Empowerment",
    description: "We believe in the power of empowerment...",
    icon: images.Empowerment,
  },
  {
    title: "Collaboration",
    description: "Collaboration is at the heart...",
    icon: images.Collaboration,
  },
  {
    title: "Customization",
    description: "Tailoring solutions for unique needs...",
    icon: images.Customization,
  },
];

const WhatSetsUsApart = () => {
  return (
    <section className="what-sets-us-apart">
      <h2>What sets us apart</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <img src={feature.icon} alt={feature.title} className="icon" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
