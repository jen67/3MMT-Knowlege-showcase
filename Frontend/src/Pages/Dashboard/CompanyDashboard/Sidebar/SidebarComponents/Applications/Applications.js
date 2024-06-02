import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Applications.css";

const ApplicationsReceived = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/applications", {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        });
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
  }, []);

  return (
    <div>
      <h1>Applications Received</h1>
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
