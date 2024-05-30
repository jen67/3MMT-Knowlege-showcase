import React, { useState } from "react";
import Cookies from "js-cookie";
import Modal from "../../../../../../Components/Modal/Modal";
import CustomSelect from "../../../../../../Components/Custom/CustomSelect";
import "../../../../../Signup/Signup.css";



const PostJob = () => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");

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
    if (title && description && requirements && location) {
      const token = Cookies.get("auth_token");

      const postData = {
        title,
        description,
        requirements,
        location,
      };
      console.log("Posting the following data:", postData);

      fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          requirements,
          location,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setModalMessage("Job posted successfully!");
          setShowModal(true);
          setTitle(null);
          setDescription("");
          setRequirements("");
          setLocation("");
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
      <form onSubmit={handleSubmit} className="post-job-form">
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter job location"
          />
          {locationError && <p className="error">Location is required</p>}
        </div>
        <button type="submit" className="submit-button">
          Post Job
        </button>
      </form>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default PostJob;