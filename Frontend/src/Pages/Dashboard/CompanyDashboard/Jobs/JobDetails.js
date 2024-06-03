import React from "react";
import "./Jobs.css";

const JobDetails = ({ job }) => {
  return (
    <div className="job-detail">
      <h2>{job.title}</h2>
      <h3>{job.company}</h3>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>{job.description}</p>
      <button>Apply now</button>
    </div>
  );
};

export default JobDetails;
