import React, { useState, useEffect } from "react";
import CustomSelect from "../../../../../../Components/Custom/CustomSelect";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";
import Spinner from "../../../../../../Components/Spinner/Spinner";
import { useAuth } from "../../../../../../Context/Authcontext";
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

const Tooltip = ({ message, show }) => {
  return <div className={`tooltip ${show ? "show" : ""}`}>{message}</div>;
};

const Profile = () => {
  const { userName, updateUserName } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [toolTipMessage, setToolTipMessage] = useState("");
  const [showToolTip, setShowToolTip] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");

  const token = Cookies.get("auth_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let data = await response.json();
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        updateUserName(data.name);
        console.log("Received data:", data);
        console.log("Your email:", data.email);
        if (data.name) setCompanyName(data.name);
        if (data.email) setEmail(data.email);
        if (data.location) setLocation(data.location);
        if (data.industry) setIndustry(data.industry);
        if (data.description) setDescription(data.description);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, updateUserName]);

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
          setToolTipMessage("Profile updated successfully");
          setShowToolTip(true);
          setTimeout(() => {
            setShowToolTip(false);
            setActiveTab("profile");
          }, 3000);

          Cookies.set("userName", companyName);
          console.log(userName);
        } else {
          setToolTipMessage("Error updating profile");
          setShowToolTip(true);
          setTimeout(() => setShowToolTip(false), 3000);
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setToolTipMessage("Error updating profile");
        setShowToolTip(true);
        setTimeout(() => setShowToolTip(false), 3000);
      });
  };

  return (
    <section className="Company-profile">
      <Tooltip message={toolTipMessage} show={showToolTip} />
      <h1>Update your Profile</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="logo-upload">
            <div className="input-logo">
              <FaUserCircle size={70} />
            </div>
            <div className="logo-pdetails">
              <h2>{companyName}</h2>
              <p>{email} </p>
            </div>
          </div>

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
                <p>{location || "No location provided"}</p>
              </div>
              <div className="">
                <label htmlFor="industry" className="">
                  Industry:
                </label>
                <p>{industry || "No industry provided"}</p>
              </div>
              <div className="">
                <label htmlFor="description">Description:</label>
                <p>{description || "No description provided"}</p>
              </div>
            </div>
          ) : (
            <form className="form-fields" onSubmit={handleFormSubmit}>
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

              <button type="submit" className="submit-button">
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
