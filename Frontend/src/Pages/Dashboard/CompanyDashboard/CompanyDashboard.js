import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  FaBriefcase,
  FaBookmark,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import "./CompanyDashboard.css";
import { format } from "date-fns"; 

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = Cookies.get("auth_token");
      try {
        const response = await fetch("http://localhost:5000/api/company_jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        console.log("Fetched jobs:", data);
        const jobsData = JSON.parse(data);
        setJobs(jobsData);

        // Update the 'Posted jobs' count in the stats state
        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.title === "Posted jobs"
              ? { ...stat, count: jobsData.length }
              : stat
          )
        );
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const [stats, setStats] = useState([
    { title: "Posted jobs", count: 0, icon: FaBriefcase },
    { title: "Shortlisted", count: 0, icon: FaBookmark },
    { title: "Reviewed", count: 0, icon: FaCheckCircle },
    { title: "Applicants", count: 0, icon: FaUsers },
  ]);

  useEffect(() => {
    setStats((prevStats) =>
      prevStats.map((stat) =>
        stat.title === "Posted jobs" ? { ...stat, count: jobs.length } : stat
      )
    );
  }, [jobs]);

  return (
    <div className="Tdashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className="opportunities">
        <h3>Jobs posted</h3>
        {jobs.length === 0 ? ( // Check if jobs array is empty
          <p>No jobs posted yet</p>
        ) : (
          <ul className="opportunity-card-container">
            {jobs.slice(-3).map(
              (
                job,
                index // Render jobs
              ) => (
                <li key={index} className="opportunity-card">
                  <h4 className="opportunity-card-header">
                    {job.title || "N/A"}
                  </h4>
                  <p className="job-description">{job.description || "N/A"}</p>
                  <p className="location">{job.location || "N/A"}</p>
                  <p className="date location">
                    Posted on{" "}
                    <span>
                      {format(
                        new Date(job.posted_date.$date),
                        "MM/dd/yyyy HH:mm:ss"
                      )}
                    </span>{" "}
                  </p>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, count, icon: Icon }) => {
  let color;
  let size;
  switch (title.toLowerCase()) {
    case "posted jobs":
      color = "#f17b54";
      size = "1.4rem";
      break;
    case "shortlisted":
      color = "#62f2c2";
      size = "1.5rem";
      break;
    case "reviewed":
      color = "#7079e5";
      size = "1.5rem";
      break;
    case "applicants":
      color = "#e7b214";
      size = "1.6rem";
      break;
    default:
      color = "#000";
      size = "1.5rem";
  }

  return (
    <div className={`stat ${title.toLowerCase()}-card`}>
      <div className="stat-info">
        <h2>{title}</h2>
        <div className="icon-and-count">
          <div className="icon-container">
            <Icon color={color} size={size} />
          </div>
          <p>{count}</p>
        </div>
      </div>
    </div>
  );
};

const OpportunityCard = ({ job }) => (
  <div className="opportunity-card">
    <div className="opportunity-card-header">
      <h4>{job.title || "N/A"}</h4>
      <span className={`status ${job.status?.toLowerCase() || "pending"}`}>
        {job.status || "Pending"}
      </span>
    </div>
    <div className="opportunity-card-body">
      <p className="companyN">Company: {job.company || "N/A"}</p>
      <p className="date">Posted Date: {job.posted || "N/A"}</p>
      <p className="date location">Location: {job.location || "N/A"}</p>
    </div>
  </div>
);

export default Dashboard;
