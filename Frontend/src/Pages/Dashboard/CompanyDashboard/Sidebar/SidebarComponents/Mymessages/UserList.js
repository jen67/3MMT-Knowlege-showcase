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

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userToken]);

  return (
    <div className="user-list">
      <h3>Select a user to chat with:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user.id)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
