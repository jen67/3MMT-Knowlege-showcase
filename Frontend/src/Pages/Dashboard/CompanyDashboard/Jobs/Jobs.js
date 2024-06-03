import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CompanySearch from "../Csearch/TalentSearch";

import "../Sidebar/SidebarComponents/ManageJobs/ManageJobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      console.log("Fetched jobs:", data); // Debug: Check the structure of data
      setJobs(JSON.parse(data)); // Ensure data is parsed correctly
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <>
      <section className="ManageJobs">
        <h1>Find Jobs</h1>
        <CompanySearch />

        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job._id.$oid} className="job-item">
              <h3>{job.title}</h3>
              <p className="job-requirement">{job.requirements}</p>
              <p className="job-description">{job.description}</p>
              <p className="job-location">{job.location}</p>
              <p className="job-company">{job.company.name}</p>
              <p>
                Posted{" "}
                {formatDistanceToNow(new Date(job.posted_date.$date), {
                  addSuffix: true,
                })}
              </p>
            </li>
          ))}
        </ul>

        <div className="job-details"></div>
      </section>
    </>
  );
};

export default Jobs;
