import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  FaBriefcase,
  FaHeart,
  FaEye,
  FaCommentDots,
} from "react-icons/fa";
import { useAuth } from "../../../Context/Authcontext";
import "./TalentDashboard.css";
import Spinner from "../../../Components/Spinner/Spinner";

const TalentDashboard = () => {
  const { user, updateUser } = useAuth();
  const [stats, setStats] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const viewsCount = Cookies.get(`viewsCount_${user.id}`);
      setStats([
        {
          title: "Applications",
          count: user.applicationsCount,
          icon: FaBriefcase,
        },
        { title: "Shortlisted", count: 0, icon: FaHeart },
        { title: "Review", count: 0, icon: FaCommentDots },
        { title: "Views", count: viewsCount, icon: FaEye },
      ]);
    }

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

        updateUser({ ...user, applicationsCount: data.length });

        const limitedData = data
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
          .filter((item) => item !== null)
          .slice(-3);

        setOpportunities(limitedData);
      } catch (error) {
        if (error.message.includes("Failed to fetch user applications")) {
          setError(
            "Failed to fetch user applications. Please try again later."
          );
        } else {
          setError(error.message);
        }
        console.error("Error fetching user applications:", error);
      } finally {
        
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      };
    }

    fetchUserApplications();
  }, [user, updateUser]);

  if (loading) {
    return (
      <div className="loading">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

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
    case "applications":
      color = "#f17b54";
      size = "1.4rem";
      break;
    case "shortlisted":
      color = "#62f2c2";
      size = "1.5rem";
      break;
    case "review":
      color = "#7079e5";
      size = "1.5rem";
      break;
    case "views":
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
      <p className="companyN">
      Company: {opportunity.company || "N/A"}
      </p>
      <p className="date">
       Posted Date:{" "}
        {opportunity.postedDate
          ? opportunity.postedDate.toLocaleDateString()
          : "N/A"}
      </p>
      <p className="date location">
        location: {opportunity.location || "N/A"}
      </p>
    </div>
  </div>
);

export default TalentDashboard;
