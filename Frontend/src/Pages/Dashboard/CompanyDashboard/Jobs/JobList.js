import React from "react";
import "./Jobs.css";

const JobList = ({ jobs, onSelectJob }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-item" onClick={() => onSelectJob(job)}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
