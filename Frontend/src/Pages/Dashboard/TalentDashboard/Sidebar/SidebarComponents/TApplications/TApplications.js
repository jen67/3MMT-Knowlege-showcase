import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./TApplications.css";
// import {
//   FaIdCard,
//   FaBuilding,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaRegListAlt,
//   FaRegNewspaper,
// } from "react-icons/fa";

const TApplications = () => {
  const [userApplications, setUserApplications] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserApplications = async () => {
    try {
      const token = Cookies.get("auth_token");
      const response = await fetch(
        `http://localhost:5000/api/applications/my-jobs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch user applications: ${response.statusText}`
        );
      }

      let data = await response.json();
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      setUserApplications(
        data
          .map((item) => {
            let parsedItem;
            try {
              parsedItem = JSON.parse(item);
            } catch (error) {
              console.error("Error parsing item:", error);
              return null;
            }

            if (!parsedItem || !parsedItem[0]) {
              console.error("Malformed item:", item);
              return null;
            }

            const job = parsedItem[0];
            const id = job._id?.$oid;
            const company = job.company?.$oid;
            const postedDate = job.posted_date
              ? new Date(job.posted_date.$date)
              : null;

            return { ...job, id, company, postedDate };
          })
          .filter((item) => item !== null) // Filter out null items
      );
    } catch (error) {
      if (error.message.includes("Failed to fetch user applications")) {
        setError("Failed to fetch user applications. Please try again later.");
      } else {
        setError(error.message);
      }
      console.error("Error fetching user applications:", error);
    }
  };

  useEffect(() => {
    fetchUserApplications();
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!userApplications.length) {
    return <div className="message">No applications found.</div>;
  }

  return (
    <div className="t-applications-container">
      <h2>User Applications</h2>
      <ul>
        {userApplications.map((application, index) => (
          <li key={`${application.id}-${index}`} className="application-item">
            <p>ID: {application.id}</p>
            <p>Company: {application.company}</p>
            <p>
              Posted Date:{" "}
              {application.postedDate
                ? application.postedDate.toLocaleDateString()
                : "N/A"}
            </p>
            <p>Title: {application.title || "N/A"}</p>
            <p>Description: {application.description || "N/A"}</p>
            <p>Requirements: {application.requirements || "N/A"}</p>
            <p>Location: {application.location || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TApplications;
