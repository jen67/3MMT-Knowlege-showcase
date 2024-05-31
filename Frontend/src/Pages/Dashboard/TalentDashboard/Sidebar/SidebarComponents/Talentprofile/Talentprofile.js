import React, { useState } from 'react';
import "./Talentprofile.css";

const Talentprofile = ({ updateImage }) => {
  const [image, setImage] = useState(localStorage.getItem("avatarUrl") || "");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
        localStorage.setItem("avatarUrl", reader.result);
        updateImage(reader.result); // Update the image in the parent component
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImageSubmit = (event) => {
    event.preventDefault();
    console.log("Image:", image);
    // Add code here to update the image on the server
  };

  const handleSkillsSubmit = (event) => {
    event.preventDefault();
    console.log("Skills:", skills);
    // Add code here to update the skills on the server
  };

  const handleDescriptionSubmit = (event) => {
    event.preventDefault();
    console.log("Description:", description);
    // Add code here to update the description on the server
  };

  return (
    <form className="profile">
      <h1>Your Profile</h1>
      <div className="profile-image">
        <label>
          Profile Image:
          <input type="file" onChange={handleImageChange} />
          {image && <img src={image} alt="Profile" />}
        </label>
        <button onClick={handleImageSubmit}>Update Image</button>
      </div>

      <label>
        Skills:
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </label>
      <button onClick={handleSkillsSubmit}>Update Skills</button>

      <label>
        About Me:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button onClick={handleDescriptionSubmit}>Update Description</button>
    </form>
  );
};

export default Talentprofile;