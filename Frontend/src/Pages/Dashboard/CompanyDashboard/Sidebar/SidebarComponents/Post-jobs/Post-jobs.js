import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Modal from "../../../../../../Components/Modal/Modal";
import CustomSelect from "../../../../../../Components/Custom/CustomSelect";
import "../../../../../Signup/Signup.css";
import "../../../../../Login/Login.css";
import "./Post-jobs.css";

const PostJob = () => {
  const location = useLocation();
  const job = location.state ? location.state.job : null;

  const [title, setTitle] = useState(job ? job.title : "");
  const [locationState, setLocationState] = useState(job ? job.location : "");
  const [description, setDescription] = useState(job ? job.description : "");
  const [requirements, setRequirements] = useState(job ? job.requirements : "");

  useEffect(() => {
    if (!location.state) {
      setTitle("");
      setLocationState("");
      setDescription("");
      setRequirements("");
    }
  }, [location.state]);

  // Error states
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [requirementsError, setRequirementsError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const jobTitles = [
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
    "AI Engineer",
    "Algorithm Engineer",
    "Android Developer",
    "API Developer",
    "Application Support Analyst",
    "Automation Engineer",
    "Big Data Analyst",
    "Big Data Engineer",
    "Bioinformatics Specialist",
    "Blockchain Developer",
    "Business Intelligence Analyst",
    "C++ Developer",
    "Cloud Architect",
    "Cloud Consultant",
    "Cloud Product and Project Manager",
    "Cloud Services Developer",
    "Cloud Software and Network Engineer",
    "Cloud System Administrator",
    "Cloud System Engineer",
    "Computer Vision Engineer",
    "Cybersecurity Analyst",
    "Data Architect",
    "Data Engineer",
    "Data Protection Officer",
    "Database Developer",
    "Deep Learning Engineer",
    "DevOps Manager",
    "Digital Marketing Specialist",
    "Embedded Systems Engineer",
    "Ethical Hacker",
    "Firmware Engineer",
    "Game Designer",
    "Game Tester",
    "Hardware Engineer",
    "Information Security Manager",
    "IoT Engineer",
    "iOS Developer",
    "IT Analyst",
    "IT Coordinator",
    "IT Director",
    "IT Support Specialist",
    "IT Technician",
    "Java Developer",
    "JavaScript Developer",
    "Junior Software Engineer",
    "Linux System Administrator",
    "Mobile Game Developer",
    "Network Administrator",
    "Network Architect",
    "Network Engineer",
    "Network Systems Administrator",
    "Penetration Tester",
    "Product Manager",
    "Python Developer",
    "QA Analyst",
    "Quantum Programmer",
    "Ruby Developer",
    "Sales Engineer",
    "Scrum Master",
    "Security Architect",
    "Security Consultant",
    "Security Engineer",
    "Security Specialist",
    "Senior Database Administrator",
    "Senior Web Developer",
    "SEO Specialist",
    "Software QA Tester",
    "Software Support Engineer",
    "Solutions Architect",
    "Systems Designer",
    "Technical Writer",
    "Telecommunications Specialist",
    "User Experience Designer",
    "User Interface Designer",
    "Virtual Reality Developer",
    "Web Designer",
    "Web Developer",
    "WordPress Developer",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    setTitleError(!title);
    setDescriptionError(!description);
    setRequirementsError(!requirements);
    setLocationError(!locationState);

    // Only proceed with fetch if all fields are filled
    if (title && description && requirements && locationState) {
      const token = Cookies.get("auth_token");
      const url =
        job && job._id && job._id.$oid
          ? `http://localhost:5000/api/jobs/${job._id.$oid}`
          : "http://localhost:5000/api/jobs";
      const method = job && job._id && job._id.$oid ? "PUT" : "POST";

      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          requirements,
          location: locationState,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          setModalMessage(
            job ? "Job updated successfully!" : "Job posted successfully!"
          );
          setShowModal(true);
          if (!job) {
            setTitle("");
            setDescription("");
            setRequirements("");
            setLocationState("");
          }
        })
        .catch((error) => {
          console.error("Error posting job:", error);
          setModalMessage("Failed to post job.");
          setShowModal(true);
        });
    }
  };

  return (
    <section className="Postjobs-form">
      <h1>{job ? "Edit Job" : "Post Jobs"}</h1>
      <form onSubmit={handleSubmit} className="post-job-form form-container">
        <div className="form-group">
          <label htmlFor="title" className="select-label">
            Title:
          </label>
          <CustomSelect
            options={jobTitles.map((jobTitle) => ({
              value: jobTitle,
              label: jobTitle,
            }))}
            onSelectChange={setTitle}
            value={title}
            placeholder="Select a job title"
          />
          {titleError && <p className="error">Title is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter job description"
            className="textarea"
            maxLength={600}
          />
          {descriptionError && <p className="error">Description is required</p>}
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Enter job requirements"
            className="textarea"
            maxLength={600}
          />
          {requirementsError && (
            <p className="error">Requirements are required</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="location" className="select-label">
            Location:
          </label>
          <input
            type="text"
            value={locationState}
            onChange={(e) => setLocationState(e.target.value)}
            placeholder="Enter job location"
          />
          {locationError && <p className="error">Location is required</p>}
        </div>
        <button type="submit" className="submit-button">
          {job ? "Update Job" : "Post Job"}
        </button>
      </form>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default PostJob;
