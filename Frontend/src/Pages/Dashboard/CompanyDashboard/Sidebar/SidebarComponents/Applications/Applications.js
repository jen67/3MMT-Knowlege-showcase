import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Applications.css";
import Spinner from "../../../../../../Components/Spinner/Spinner";
import { useAuth } from "../../../../../../Context/Authcontext"; // Adjust the path accordingly

const ApplicationsReceived = () => {
  const { jobId } = useAuth(); // Access the jobId from AuthContext
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (jobId) {
      fetchUsersForJob(jobId);
    }
  }, [jobId]);

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

      if (!usersResponse.ok) {
        const errorData = await usersResponse.json();
        console.error("Error fetching users:", errorData);
        setMessage(`Error: ${errorData.message}`);
        setIsLoading(false);
        return;
      }

      const usersData = await usersResponse.json();
      console.log("Fetched users:", usersData);
      setUsers(usersData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Error fetching data");
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {users.length > 0 ? (
            <div>
              <h1>Applications Received</h1>
              <ul>
                {users.map((user) => (
                  <li key={user._id.$oid}>{user.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No users found.</p>
          )}
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ApplicationsReceived;
