import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Talentprofile.css";

const Talentprofile = ({ updateImage }) => {
  const [image, setImage] = useState(localStorage.getItem("avatarUrl") || "");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProfile(); // Fetch the profile data when the component mounts
  }, []);

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("auth_token")}`, // Assuming the JWT is stored in a cookie
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        console.log("Fetched profile:", data); // Debug: Check the structure of data
        setSkills(data.skills); // Update the skills
        setDescription(data.description); // Update the description
        setImage(data.image); // Update the image
        localStorage.setItem("avatarUrl", data.image); // Update the image in local storage
        updateImage(data.image); // Update the image in the parent component
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };


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

 const handleSkillsSubmit = async (event) => {
   event.preventDefault();
   console.log("Skills:", skills);
   await updateProfile({ skills });
 };

 const handleDescriptionSubmit = async (event) => {
   event.preventDefault();
   console.log("Description:", description);
   await updateProfile({ description });
 };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("auth_token")}`, // Assuming the JWT is stored in a cookie
        },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const data = await response.json();
      console.log("Updated profile:", data); // Debug: Check the response
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
