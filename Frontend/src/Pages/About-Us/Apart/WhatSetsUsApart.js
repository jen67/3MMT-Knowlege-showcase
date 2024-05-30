// src/components/WhatSetsUsApart.js
import React from "react";
import images from "../../../Components/images"; 
import "./WhatSetsUsApart.css";

const features = [
  {
    title: "Innovation",
    description:
      "We're at the forefront of technological innovation, leveraging the latest advancements to deliver a seamless and intuitive platform tailored to the needs of our users. ",
    icon: images.Innovation,
  },
  {
    title: "Empowerment",
    description:
      "We believe in the power of empowerment, providing individuals and businesses alike with the tools and resources they need to succeed in an ever-evolving landscape.",
    icon: images.Empowerment,
  },
  {
    title: "Collaboration",
    description: "Collaboration is at the heart of everything we do. By fostering meaningful connections and facilitating collaboration, we're driving innovation and driving positive change in every industry.",
    icon: images.Collaboration,
  },
  {
    title: "Customization",
    description: "Tailoring solutions for unique needs ensures exceptional user experiences, empowering individuals and companies to maximize their potential and achieve their goals efficiently.",
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
