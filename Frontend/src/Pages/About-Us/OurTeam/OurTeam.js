// src/components/OurTeam.js
import React from "react";
import images from "../../../Components/images"; 
import "./OurTeam.css";

const teamMembers = [
  {
    name: "Gift Ameche",
    role: "Frontend Developer",
    description: "A creative problem-solver...",
    image: images.davidB,
  },
  {
    name: "Justine Ugwu",
    role: "Frontend Developer",
    description: "A seasoned developer with a knack...",
    image: images.emilyJ,
  },
  {
    name: "Omar",
    role: "Backend Developer",
    description: "A passionate coder with a focus on...",
    image: images.johnsonS,
  },
  {
    name: "West",
    role: "Backend Developer",
    description: "A talented backend mind behind the scenes...",
    image: images.sarahL,
  },
];

const OurTeam = () => {
  return (
    <section className="our-team">
      <h2>Our team</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
