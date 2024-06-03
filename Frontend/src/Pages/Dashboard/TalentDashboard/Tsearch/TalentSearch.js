import React, { useState } from "react";
import Cookies from "js-cookie";

const TalentSearch = () => {
  const [skills, setSkills] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    const queryString = skillsArray
      .map((skill) => `skills=${encodeURIComponent(skill)}`)
      .join("&");

    try {
      const response = await fetch(
        `http://localhost:5000/api/search/talents?${queryString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching talents:", error);
      setResults([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {results.length > 0 ? (
        results.map((user, index) => (
          <div key={index}>
            <h2>{user.name}</h2>
            <p>Skills: {user.skills.join(", ")}</p>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default TalentSearch;
