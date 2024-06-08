import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./UserList.css";

const UserList = ({ onSelectUser }) => {
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
  }, [userToken, setUsers]);

  console.log("Users:", users); // Log the current users state

  return (
    <div className="user-list">
      <h3>Select a user to chat with:</h3>
      <ul>
        {Array.isArray(users) &&
          users.map((user, index) => {
            // Extract id from _id field based on its type
            const id =
              user._id && typeof user._id === "object" ? user._id.$oid : user._id;
            console.log("User:", user); // Log the current user
            console.log("ID:", id); // Log the extracted id
            return (
              <li key={id || index} onClick={() => {
                console.log("Clicked user with ID:", id); // Log the clicked user id
                onSelectUser(id);
              }}>
                {user.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserList;