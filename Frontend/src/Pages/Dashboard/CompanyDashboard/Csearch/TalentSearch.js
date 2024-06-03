import React, { useState } from "react";

const CompanySearch = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search/jobs?title=${title}&location=${location}`
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format");
      }
      setJobs(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job title"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>Error: {error}</p>}
      {jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.location}</p>
        </div>
      ))}
    </div>
  );
};

export default CompanySearch;
