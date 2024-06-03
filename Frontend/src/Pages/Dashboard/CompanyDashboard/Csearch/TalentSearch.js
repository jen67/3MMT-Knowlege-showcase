// src/SearchJobs.js

import React, { useState } from "react";

const SearchJobs = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    const params = new URLSearchParams({ title, location }).toString();
    try {
      const response = await fetch(
        `http://localhost:5000/api/search/jobs?${params}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  };

  return (
    <div>
      <h1>Search Jobs</h1>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} - {job.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchJobs;
