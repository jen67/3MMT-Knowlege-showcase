import React, { useState, useEffect } from "react";
import CustomSelect from "../../../../../../Components/Custom/CustomSelect";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";
import "./Profile.css";

const industries = [
  "Information Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Remote",
  "Agriculture",
  "Automotive",
  "Aerospace",
  "Construction",
  "Energy",
  "Entertainment",
  "Fashion",
  "Food & Beverage",
  "Government",
  "Hospitality",
  "Insurance",
  "Legal",
  "Logistics & Transportation",
  "Media & Communications",
  "Mining",
  "Non-Profit",
  "Pharmaceutical",
  "Public Relations",
  "Sports",
  "Telecommunications",
  "Travel & Tourism",
  "Utilities",
  "Warehousing",
  "Waste Management",
  "Water Management",
  "Wholesale",
  "Marine & Shipping",
  "Biotechnology",
  "Consulting",
  "Design",
  "E-commerce",
  "Engineering",
  "Event Planning",
  "Human Resources",
  "Marketing",
  "Professional Services",
  "Research & Development",
  "Security",
  "Software Development",
  "Video Games",
  "Veterinary",
  "Wellness & Fitness",
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  // const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");

  const token = Cookies.get("auth_token");

  useEffect(() => {
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.name) setCompanyName(data.name);
        if (data.location) setLocation(data.location);
        if (data.industry) setIndustry(data.industry);
        if (data.description) setDescription(data.description);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      });
  }, [token]);

  const handleCompanyNameChange = (event) => setCompanyName(event.target.value);
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleIndustryChange = (value) => setIndustry(value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const profileData = {
      name: companyName,
      location,
      industry,
      description,
    };

    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.msg === "User profile updated" ||
          data.msg === "Company profile updated"
        ) {
          alert("Profile updated successfully");
        } else {
          alert("Error updating profile");
        }
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <section className="Company-profile">
      <h1>Update your Profile</h1>
      <div className="logo-upload">
        <div className="input-logo">
          <FaUserCircle size={70} />
        </div>
        <div className="logo-pdetails">
          <h2>CompanyName {companyName}</h2>
          <p>company Email </p>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="update-container">
            <button
              type="button"
              className={`details ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => handleTabChange("profile")}
            >
              Profile Details
            </button>
            <button
              type="button"
              className={`update-d ${activeTab === "update" ? "active" : ""}`}
              onClick={() => handleTabChange("update")}
            >
              Update Profile
            </button>
          </div>

          {activeTab === "profile" ? (
            <div className="details">      
                <div className="">
                  <label htmlFor="location">Location:</label>
                  <p>{location}</p>
                </div>
                <div className="">
                  <label htmlFor="industry" className="">
                     Industry: 
                  </label>
                  <p>industry {industry}</p>
                </div>
                <div className="">
                  <label htmlFor="description">Description:</label>
                  <p>{description}</p>
                </div>
            </div>
          ) : (
            <form className="form-fields">
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={handleCompanyNameChange}
                  placeholder="Enter your company name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Enter your location"
                />
              </div>
              <div className="form-group">
                <label htmlFor="industry" className="select-label">
                  Select Industry
                </label>

                <CustomSelect
                  options={industries.map((ind) => ({
                    value: ind,
                    label: ind,
                  }))}
                  onSelectChange={handleIndustryChange}
                  value={industries.find((ind) => ind === industry)}
                  name="industry"
                  placeholder="Select Industry"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter your description"
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                onClick={handleFormSubmit}
              >
                Save Profile
              </button>
            </form>
          )}
        </>
      )}
    </section>
  );
};

export default Profile;
