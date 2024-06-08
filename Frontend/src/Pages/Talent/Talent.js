import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FaBookmark, FaEnvelope, FaUserCircle } from "react-icons/fa";
import "./Talents.css";
import Spinner from "../../Components/Spinner/Spinner";

const Talent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
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
        console.log("Fetched users:", data);
        setUsers(data);
        // Turn off loading spinner after data is fetched
        setTimeout(() => setIsLoading(false), 2000); // 2 seconds delay
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userToken]);

  const handleCardClick = async (user) => {
    const userId = user._id?.$oid || user._id;

    console.log("User ID:", userId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/user_profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      console.log("Received data:", data);
      setSelectedUser(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="talent-list">
      <h3>Select a talent to view profile</h3>
      {isLoading && <Spinner />} {/* Spinner displayed when loading */}
      {!isLoading && ( // Render only when not loading
        <div className="talent-cards">
          {Array.isArray(users) &&
            users.map((user) => {
              const id = user._id?.$oid || user._id;
              return (
                <div
                  key={id}
                  className="talent-card"
                  onClick={() => handleCardClick(user)}
                >
                  <div className="card-header">
                    <h4>{user.name}</h4>
                    <p>{user.category}</p>
                  </div>
                  <div className="card-body">
                    <p>Email: {user.email}</p>
                    <p>Mobile: {user.mobile}</p>
                  </div>

                  <div className="card-footer">
                    <div className="actions">
                      <button
                        className="bookmark-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <FaBookmark /> Bookmark
                      </button>
                      <button
                        className="message-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <FaEnvelope /> Message
                      </button>
                    </div>
                    <div className="card-date">
                      <p>{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {isModalOpen && selectedUser && (
        <Modal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

const Modal = ({ user, onClose }) => {
  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div
        className="custom-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="custom-close-modal" onClick={onClose}>
          ×
        </button>
        <div className="modal-card">
          <div className="modal-header">
            <div className="profile-logo">
              {user.logo ? (
                <img src={user.logo} alt="Profile" />
              ) : (
                <FaUserCircle size={40} />
              )}
            </div>
            <div className="job-title">
              <h2>{user.name}</h2>
              <p>{user.category}</p>
            </div>
          </div>
          <div className="modal-body">
            <p>Email: {user.email}</p>
            <p>Mobile: {user.mobile}</p>
            <p>Location: {user.location || "N/A"}</p>
          </div>
          <div className="modal-footer">
            <div
              className={`tags ${
                user.skills.length > 3 ? "scrollable-tags" : ""
              }`}
            >
              {user.skills.map((skill, index) => (
                <span key={index} className="tag">
                  {skill}
                </span>
              ))}
            </div>
            <p className="date">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talent;
