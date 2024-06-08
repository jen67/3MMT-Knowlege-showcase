import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FaBookmark, FaEnvelope } from "react-icons/fa";
import "./Talents.css";

const TalentList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const userToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        console.log("Fetched users:", data); // Log fetched users data
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userToken]);

  console.log("Users:", users); // Log the current users state

  return (
    <div className="talent-list">
      <h3>Select a talent to view profile:</h3>
      <div className="talent-cards">
        {Array.isArray(users) &&
          users.map((user) => {
            const id = user._id?.$oid || user._id;
            return (
              <div
                key={id}
                className="talent-card"
                onClick={() => onSelectUser(user)}
              >
                <h4>{user.name}</h4>
                <p>Category: {user.category}</p>
                <p>Email: {user.email}</p>
                <p>Mobile: {user.mobile}</p>
                <div className="actions">
                  <button
                    className="bookmark-btn"
                    onClick={(e) => {
                      e.stopPropagation(); /* Handle bookmark action */
                    }}
                  >
                    <FaBookmark /> Bookmark
                  </button>
                  <button
                    className="message-btn"
                    onClick={(e) => {
                      e.stopPropagation(); /* Handle message action */
                    }}
                  >
                    <FaEnvelope /> Message
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TalentList;
