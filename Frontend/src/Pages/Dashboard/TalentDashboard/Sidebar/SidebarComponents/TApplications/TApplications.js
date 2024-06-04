import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const TApplications = () => {
  // In your frontend component file (e.g., Jobs.js)

  const [userApplications, setUserApplications] = useState([]);

  // Function to fetch user applications
  const fetchUserApplications = async () => {
    try {
      const token = Cookies.get("auth_token");
      const userId = Cookies.get("user_id"); // Function to get the current user's ID
      const response = await fetch(`http://localhost:5000/api/applications/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user applications");
      }
      const data = await response.json();
      setUserApplications(data);
    } catch (error) {
      console.error("Error fetching user applications:", error);
    }
  };

  useEffect(() => {
    fetchUserApplications();
  }, []); // Fetch user applications when the component mounts

  return (
    <div>
      {/* Display user applications */}
      <h2>User Applications</h2>
      <ul>
        {userApplications.map((application) => (
          <li key={application._id}>
            {/* Display application details */}
            <p>{application.job.title}</p>
            <p>{application.job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TApplications;
