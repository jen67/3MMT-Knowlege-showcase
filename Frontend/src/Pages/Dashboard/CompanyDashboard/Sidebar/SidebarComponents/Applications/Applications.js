import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Applications.css";
import Spinner from "../../../../../../Components/Spinner/Spinner";
import { format } from "date-fns";

const ApplicationsReceived = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJobAndApplications();
  }, []);

  const fetchJobAndApplications = async () => {
    const token = Cookies.get("auth_token");
    try {
      const jobResponse = await fetch(
        `http://localhost:5000/api/company_jobs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!jobResponse.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const jobData = await jobResponse.json();
      console.log("Fetched jobs:", jobData);

      // Check if jobData is an array and has content
      if (Array.isArray(jobData) && jobData.length > 0) {
        setJobs(jobData);
      } else {
        console.warn(
          "Fetched jobs data is not in expected format or empty:",
          jobData
        );
        setJobs([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setIsLoading(false);
    }
  };

  const fetchUsersForJob = async (jobId) => {
    console.log("Fetching users for job ID:", jobId);
    const token = Cookies.get("auth_token");
    try {
      const usersResponse = await fetch(
        `http://localhost:5000/api/applications/users-applied/${jobId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
        alert("Applied users fetched");
      } else {
        const errorData = await usersResponse.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert("Error fetching users:", error);
      setMessage("Error fetching data");
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <ul>
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job) => (
                <li key={job._id.$oid} className="job-item">
                  <h3>{job.title}</h3>
                  <p className="job-requirement">{job.requirements}</p>
                  <p className="job-description">{job.description}</p>
                  <p className="job-location">{job.location}</p>
                  <p className="date-posted">
                    Posted on{" "}
                    <span>
                      {format(
                        new Date(job.posted_date.$date),
                        "MM/dd/yyyy HH:mm:ss"
                      )}
                    </span>
                  </p>
                  <button onClick={() => fetchUsersForJob(job._id.$oid)}>
                    View Applicants
                  </button>
                </li>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </ul>
          {users.length > 0 && (
            <div>
              <h1>Applications Received</h1>
              <ul>
                {users.map((user) => (
                  <li key={user._id}>{user.name}</li>
                ))}
              </ul>
            </div>
          )}
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ApplicationsReceived;
