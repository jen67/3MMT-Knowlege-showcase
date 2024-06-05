import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Talentprofile.css";

const Talentprofile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    category: "",
  });

  useEffect(() => {
    const fetchTProfile = async () => {
      const token = Cookies.get("auth_token");
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        console.log("Fetched profile data:", data);

        // Set the profile data to both profile and formData
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchTProfile();
  }, []);

  useEffect(() => {
    console.log("FormData after change:", formData);
  }, [formData]);

const handleChange = (e) => {
  if (["name", "email", "mobile", "category"].includes(e.target.name)) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }
};

  const handleUpdate = async () => {
    const token = Cookies.get("auth_token");
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedProfile = await response.json();
      console.log("Updated profile data:", updatedProfile);
      setProfile(updatedProfile);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>{profile.name}'s Profile</h1>
      {editMode ? (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Mobile: {profile.mobile}</p>
          <p>Category: {profile.category}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Talentprofile;
