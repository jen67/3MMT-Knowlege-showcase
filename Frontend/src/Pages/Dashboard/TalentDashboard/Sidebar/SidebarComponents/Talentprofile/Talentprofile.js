import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";
import CustomSelect from "../../../../../../Components/Custom/CustomSelect";
import Spinner from "../../../../../../Components/Spinner/Spinner";
import "../../../../CompanyDashboard/Sidebar/SidebarComponents/Profile/Profile.css";
import "./Talentprofile.css";

const jobCategories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Cybersecurity Specialist",
  "Data Scientist",
  "DevOps Engineer",
  "UI/UX Designer",
  "Mobile App Developer",
  "Project Manager",
  "QA Engineer",
  "Cloud Engineer",
  "Machine Learning Engineer",
];

const skillsList = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "PHP",
  "TypeScript",
  "SQL",
  "HTML",
  "CSS",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Django",
  "Flask",
  "Spring",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
];

const Tooltip = ({ message, show }) => {
  return <div className={`tooltip ${show ? "show" : ""}`}>{message}</div>;
};

const TalentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    category: "",
    skills: [],
  });
  const [toolTipMessage, setToolTipMessage] = useState("");
  const [showToolTip, setShowToolTip] = useState(false);

  const token = Cookies.get("auth_token");

  useEffect(() => {
    const fetchTProfile = async () => {
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
        console.log("Fetched profile data:", data);

        setProfile(data);
        setFormData({
          name: data.name,
          mobile: data.mobile,
          category: data.category,
          skills: data.skills || [],
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setIsLoading(false);
      }
    };

    fetchTProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
    }));
  };

  const handleSkillChange = (skill) => {
    setFormData((prevFormData) => {
      const skills = prevFormData.skills.includes(skill)
        ? prevFormData.skills.filter((s) => s !== skill)
        : [...prevFormData.skills, skill];
      return { ...prevFormData, skills };
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      let updatedProfile = await response.json();
      if (typeof updatedProfile === "string") {
        updatedProfile = JSON.parse(updatedProfile);
      }
      console.log("Updated profile data:", updatedProfile);

      setProfile(updatedProfile);
      // Ensure formData is updated with the new profile data
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: updatedProfile.name,
        mobile: updatedProfile.mobile,
        category: updatedProfile.category,
        skills: updatedProfile.skills || [],
      }));

      setToolTipMessage("Profile updated successfully");
      setShowToolTip(true);
      setTimeout(() => {
        setShowToolTip(false);
        setActiveTab("profile");
      }, 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setToolTipMessage("Error updating profile");
      setShowToolTip(true);
      setTimeout(() => setShowToolTip(false), 3000);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || "",
      mobile: profile?.mobile || "",
      category: profile?.category || "",
      skills: profile?.skills || [],
    });
    setActiveTab("profile");
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
              <h2>{profile?.name || ""}'s Profile</h2>
              <p>{profile?.email || ""}</p>
            </div>
          </div>
          <div className="update-container">
            <button
              type="button"
              className={`details ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Details
            </button>
            <button
              type="button"
              className={`update-d ${activeTab === "update" ? "active" : ""}`}
              onClick={() => setActiveTab("update")}
            >
              Update Profile
            </button>
          </div>
          {activeTab === "profile" ? (
            <div className="details">
              <div className="">
                <label htmlFor="name">Name:</label>
                <p>{profile?.name || "No name provided"}</p>
              </div>
              <div className="">
                <label htmlFor="email">Email:</label>
                <p>{profile?.email || "No email provided"}</p>
              </div>
              <div className="">
                <label htmlFor="mobile">Mobile:</label>
                <p>{profile?.mobile || "No mobile provided"}</p>
              </div>
              <div className="">
                <label htmlFor="category">Category:</label>
                <p>{profile?.category || "No category provided"}</p>
              </div>
              <div className="">
                <label htmlFor="skills">Skills:</label>
                <p>{profile?.skills?.join(", ") || "No skills provided"}</p>
              </div>
            </div>
          ) : (
            <form className="form-fields" onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  id="mobile"
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="select-label">
                  Select Category
                </label>
                <CustomSelect
                  options={jobCategories.map((cat) => ({
                    value: cat,
                    label: cat,
                  }))}
                  onSelectChange={handleCategoryChange}
                  value={formData.category}
                  name="category"
                  placeholder="Select Category"
                />
              </div>

              <div className="select-group">
                <label htmlFor="skills" className="select-label">
                  Select Skills
                </label>
                <div className="skills-checkbox-group">
                  {skillsList.map((skill) => (
                    <div key={skill} className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        id={skill}
                        name="skills"
                        value={skill}
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillChange(skill)}
                      />
                      <label htmlFor={skill}>{skill}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pbutton-group">
                <button type="submit" className="submit-button">
                  Save Profile
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </section>
  );
};

export default TalentProfile;
