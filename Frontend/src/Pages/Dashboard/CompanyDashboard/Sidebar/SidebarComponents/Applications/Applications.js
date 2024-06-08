import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import "./Applications.css";

const ApplicationsReceived = () => {
  const { jobId } = useParams(); // Extract job ID from URL parameters
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJobAndApplications = async () => {
      if (!jobId) {
        console.error("Job ID is undefined");
        return;
      }

      try {
        // Fetch job details
        const jobResponse = await fetch(
          `http://localhost:5000/api/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        if (!jobResponse.ok) {
          throw new Error("Failed to fetch job");
        }
        const jobData = await jobResponse.json();
        setJob(jobData);

        // Fetch applications for the job
        const applicationsResponse = await fetch(
          `http://localhost:5000/api/applications/users-applied/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );
        if (!applicationsResponse.ok) {
          throw new Error("Failed to fetch applications");
        }
        const applicationsData = await applicationsResponse.json();
        setApplications(applicationsData);
      } catch (error) {
        setMessage("Error fetching data");
        console.error(error);
      }
    };

    fetchJobAndApplications();
  }, [jobId]); // Ensure useEffect runs when jobId changes

  return (
    <div>
      {job && (
        <>
          <h1>Applications Received for Job "{job.title}"</h1>
          <p>Company: {job.company}</p>
          <p>Posted Date: {new Date(job.posted_date.$date).toLocaleDateString()}</p>
          <p>Description: {job.description}</p>
        </>
      )}
      {message && <p>{message}</p>}
      <ul>
        {applications.map((application) => (
          <li key={application._id.$oid}>
            {application.name} applied on{" "}
            {new Date(application.posted_date.$date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationsReceived;
