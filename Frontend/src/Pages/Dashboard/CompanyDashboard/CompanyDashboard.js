import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  FaBriefcase,
  FaBookmark,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import "./CompanyDashboard.css";

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
    { title: "Shortlisted", count: 3, icon: FaBookmark },
    { title: "Reviewed", count: 0, icon: FaCheckCircle },
    { title: "Applicants", count: 57, icon: FaUsers },
  ]);

  useEffect(() => {
    setStats((prevStats) =>
      prevStats.map((stat) =>
        stat.title === "Posted jobs" ? { ...stat, count: jobs.length } : stat
      )
    );
  }, [jobs]);

  const [opportunities /*setOpportunities */] = useState([
    {
      title: "Web Developer Volunteer at Coach Tribe (3 positions)",
      company: "Coach Tribe",
      posted: "2 weeks ago",
      category: "Back End Development",
      status: "Pending",
    },
    {
      title: "Front-end Developer Volunteer",
      company: "Dropify Technologies",
      posted: "3 weeks ago",
      category: "Product Development",
      status: "Pending",
    },
    {
      title: "Front-end Developer Volunteer",
      company: "Dropify Technologies",
      posted: "3 weeks ago",
      category: "Product Development",
      status: "Pending",
    },
  ]);

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
        <h3>Opportunities Applied Recently</h3>
        {opportunities.map((opportunity, index) => (
          <OpportunityCard key={index} opportunity={opportunity} />
        ))}
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

const OpportunityCard = ({ opportunity }) => (
  <div className="opportunity-card">
    <div className="opportunity-card-header">
      <h4>{opportunity.title || "N/A"}</h4>
      <span
        className={`status ${opportunity.status?.toLowerCase() || "pending"}`}
      >
        {opportunity.status || "Pending"}
      </span>
    </div>
    <div className="opportunity-card-body">
      <p className="companyN">Company: {opportunity.company || "N/A"}</p>
      <p className="date">
        Posted Date:{" "}
        {opportunity.postedDate
          ? opportunity.postedDate.toLocaleDateString()
          : "N/A"}
      </p>
      <p className="date location">location: {opportunity.location || "N/A"}</p>
    </div>
  </div>
);

export default Dashboard;
