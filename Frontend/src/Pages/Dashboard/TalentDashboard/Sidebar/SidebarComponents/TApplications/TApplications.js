import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../../../../../../Context/Authcontext";
import "./TApplications.css";
import Spinner from "../../../../../../Components/Spinner/Spinner";


const TApplications = () => {
  const { user, updateUser } = useAuth();
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

        // Update user's data with applications count
        updateUser({ ...user, applicationsCount: data.length });

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
          setError(
            "Failed to fetch user applications. Please try again later."
          );
        } else {
          setError(error.message);
        }
        console.error("Error fetching user applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserApplications();
  }, [updateUser, user]);

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

  if (!userApplications.length) {
    return <div className="message">No applications found.</div>;
  }

  return (
    <div className="t-applications-container">
      <div class="tapplication-content">
        <h2>User Applications</h2>
        <ul>
          {userApplications.map((application, index) => (
            <li key={`${application.id}-${index}`} className="application-item">
              <p>Company: {application.company}</p>
              <p>ID: {application.id}</p>
              <p>Title: {application.title || "N/A"}</p>
              <p>Requirements: {application.requirements || "N/A"}</p>
              <p>Description: {application.description || "N/A"}</p>
              <p>Location: {application.location || "N/A"}</p>

              <p>
                Posted Date:{" "}
                {application.postedDate
                  ? application.postedDate.toLocaleDateString()
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TApplications;
