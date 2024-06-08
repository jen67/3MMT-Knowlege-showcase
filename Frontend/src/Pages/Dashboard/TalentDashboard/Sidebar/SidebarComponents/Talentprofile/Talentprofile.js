import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";
import CustomSelect from "../../../../../../Components/Custom/CustomSelect";
import Spinner from "../../../../../../Components/Spinner/Spinner";
import "../../../../CompanyDashboard/Sidebar/SidebarComponents/Profile/Profile.css";
import { useAuth } from "../../../../../../Context/Authcontext";
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
  const { talentName, updateTalentName } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [toolTipMessage, setToolTipMessage] = useState("");
  const [showToolTip, setShowToolTip] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState([]);

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

        updateTalentName(data.name); // Update talentName in context
        console.log("Received data:", data);
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.mobile) setMobile(data.mobile);
        if (data.category) setCategory(data.category);
        if (data.skills) setSkills(data.skills);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, updateTalentName]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleMobileChange = (event) => setMobile(event.target.value);
  const handleCategoryChange = (value) => setCategory(value);
  const handleSkillsChange = (skill) => {
    setSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const profileData = {
      name,
      mobile,
      category,
      skills,
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
          data.msg === "Profile updated"
        ) {
          setToolTipMessage("Profile updated successfully");
          setShowToolTip(true);
          setTimeout(() => {
            setShowToolTip(false);
            setActiveTab("profile");
          }, 3000);
          Cookies.set("tuserName", talentName);
          console.log(talentName);
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
              <h2>{name}</h2>
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
                <label htmlFor="mobile">Mobile:</label>
                <p>{mobile || "No mobile provided"}</p>
              </div>
              <div className="">
                <label htmlFor="category">Category:</label>
                <p>{category || "No category provided"}</p>
              </div>
              <div className="">
                <label htmlFor="skills">Skills:</label>
                <p>{skills.join(", ") || "No skills provided"}</p>
              </div>
            </div>
          ) : (
            <form className="form-fields" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  id="mobile"
                  type="text"
                  value={mobile}
                  onChange={handleMobileChange}
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
                  value={jobCategories.find((cat) => cat === category)}
                  name="category"
                  placeholder="Select Category"
                />
              </div>
              <div className="">
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
                        checked={skills.includes(skill)}
                        onChange={() => handleSkillsChange(skill)}
                      />
                      <label htmlFor={skill}>{skill}</label>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-button t-button">
                Save Profile
              </button>
            </form>
          )}
        </>
      )}
    </section>
  );
};

export default TalentProfile;
