import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import "./Applications.css";

const ApplicationsReceived = () => {
  const { jobId } = useParams(); // Extract job ID from URL parameters
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) {
        console.error("Job ID is undefined");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/applications/users-applied/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );

        console.log(response); // Correct placement of console.log

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setMessage("Error fetching applications");
      }
    };

    fetchApplications();
  }, [jobId]); // Ensure useEffect runs when jobId changes

  return (
    <div>
      <h1>Applications Received for Job {jobId}</h1>
      {message && <p>{message}</p>}
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            {application.user.name} applied for {application.job.title} on{" "}
            {new Date(application.created_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationsReceived;