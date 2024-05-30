import React, { useState } from "react";
import Cookies from "js-cookie";
import "./Post-jobs.css";
import CustomSelect from "../../../../../../Components/Custom/CustomSelect";

const PostJobs = ({ addJob }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");



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


  const [industry, setIndustry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("auth_token");

    const jobData = {
      title,
      description,
      requirements,
      location,
    };

    try {
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      addJob(data);

      setTitle("");
      setLocation("");
      setDescription("");
      setRequirements("");
    } catch (error) {
      console.error("Error posting job", error);
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>Post a New Job</h2>
      <div className="form-group">
        <label htmlFor="industry" className="select-label">
          Select Industry
        </label>
     <CustomSelect
  options={industries.map((industry) => ({
    value: industry,
    label: industry,
  }))}
  onSelectChange={(option) => setIndustry(option.value)}
  value={industry}
  name="industry"
  placeholder="Select Industry"
/>
      </div>
      <div>
        <label>Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

        <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              id="Description"
              placeholder="Enter work description"
              className="textarea"
            />
      </div>
      
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Requirements</label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="submit-btn">Post Job</button>
    </form>
  );
};

export default PostJobs;
