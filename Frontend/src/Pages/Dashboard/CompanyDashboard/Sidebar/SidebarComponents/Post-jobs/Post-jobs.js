import React, { useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from 'react-router-dom';
import Modal from "../../../../../../Components/Modal/Modal";
import CustomSelect from "../../../../../../Components/Custom/CustomSelect";
import "../../../../../Signup/Signup.css";
import "../../../../../Login/Login.css";
import "./Post-jobs.css"



const PostJob = () => {
  const location = useLocation();
  const job = location.state ? location.state.job : null;

  const [title, setTitle] = useState(job ? job.title : null);
  const [description, setDescription] = useState(job ? job.description : "");
  const [requirements, setRequirements] = useState(job ? job.requirements : "");
  const [locationState, setLocationState] = useState(job ? job.location : "");

  // Error states
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [requirementsError, setRequirementsError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const jobTitles = [
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    setTitleError(!title);
    setDescriptionError(!description);
    setRequirementsError(!requirements);
    setLocationError(!location);

  
    // Only proceed with fetch if all fields are filled
    if (title && description && requirements && locationState) {
      const token = Cookies.get("auth_token");
      const url = job
        ? `http://localhost:5000/api/jobs/${job._id}`
        : "http://localhost:5000/api/jobs";
      const method = job ? "PUT" : "POST";

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
            setTitle(null);
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