// src/components/OurTeam.js
import React from "react";
import images from "../../../Components/images"; 
import "./OurTeam.css";

const teamMembers = [
  {
    name: "Gift Ameche",
    role: "Frontend Developer",
    description:
      "A creative problem-solver with a talent for building user interfaces. Gift leverages her skills to design user journeys that are polished.",
    image: images.Team,
    socials: {
      facebook: "https://www.facebook.com/gift.ameche",
      linkedin: "https://www.linkedin.com/in/gift-ameche/",
      twitter: "https://twitter.com/giftameche",
      github: "https://github.com/giftameche",
    },
  },
  {
    name: "Justine Ugwu",
    role: "Frontend Developer",
    description: "A passionate coder with a knack for crafting beautiful and user-friendly interfaces.  Transforms ideas into intuitive web experiences.",
    image: images.Team,
    socials: {
      facebook: "https://www.facebook.com/justine.ugwu",
      linkedin: "https://www.linkedin.com/in/justine-ugwu/",
      twitter: "https://twitter.com/justineugwu",
      github: "https://github.com/justineugwu",
    },
  },
  {
    name: "Omar",
    role: "Backend Developer",
    description: "A coding whiz with a focus on backend development. Omar ensures smooth data flow and efficient server-side functionality.",
    image: images.Team,
    socials: {
      facebook: "https://www.facebook.com/omar",
      linkedin: "https://www.linkedin.com/in/omar/",
      twitter: "https://twitter.com/omar",
      github: "https://github.com/omar",
    },
  },
  {
    name: "West",
    role: "Backend Developer",
    description: "The mastermind behind the scenes!  West brings expertise in building robust and scalable back-end systems that power Wefind's seamless operation. ",
    image: images.Team,
    socials: {
      facebook: "https://www.facebook.com/west",
      linkedin: "https://www.linkedin.com/in/west/",
      twitter: "https://twitter.com/west",
      github: "https://github.com/west",
    },
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
            <p className="team-role">{member.role}</p>
            <p>{member.description}</p>
            <div className="social-icons">
              {Object.entries(member.socials).map(([network, url]) => (
                <a key={network} href={url} target="_blank" rel="noopener noreferrer">
                  <img src={images[network + 'Icon']} alt={network} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
