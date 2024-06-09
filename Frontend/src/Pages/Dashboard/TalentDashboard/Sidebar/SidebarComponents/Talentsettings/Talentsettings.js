// Settings.js
import React from "react";
import "./Talentsettings.css"; // Import your CSS file

const Talentsettings = () => {
  return (
    <div className="settings-container">
      <h1 className="settings-heading">General Settings</h1>
      <div className="settings-section">
        <div className="setting-item">
          <label htmlFor="notification-toggle">Receive Notifications</label>
          <input
            type="checkbox"
            id="notification-toggle"
            className="input-checkbox"
          />
        </div>
        <div className="setting-item">
          <label htmlFor="username-input">Username</label>
          <input type="text" id="username-input" className="input-text" />
        </div>
        <div className="setting-item">
          <label htmlFor="password-input">Password</label>
          <input type="password" id="password-input" className="input-text" />
        </div>
      </div>
    </div>
  );
};

export default Talentsettings;
