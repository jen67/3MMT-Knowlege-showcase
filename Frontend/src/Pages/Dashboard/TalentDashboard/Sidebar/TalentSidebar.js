import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaEnvelopeOpenText,
  FaRegListAlt,
  FaRegFileAlt,
  FaRegEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBuilding,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";
import "./Sidebar.css";

const TalentSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button onClick={toggleCollapse}>
          <span className="toggle-icon">
            {collapsed ? <FaArrowCircleRight /> : <FaArrowCircleLeft />}
          </span>
        </button>
        <h2>
          <FaBuilding /> {!collapsed && "Company Logo"}
        </h2>
        <nav>
          <ul>
            <li>
              <Link to="/TalentDashboard">
                <FaHome /> {!collapsed && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/Talentprofile">
                <FaUser /> {!collapsed && "Profile"}
              </Link>
            </li>

            <li>
              <Link to="/TApplications">
                <FaEnvelopeOpenText /> {!collapsed && "Applications"}
              </Link>
            </li>
            <li>
              <Link to="/TShortlisted">
                <FaRegListAlt /> {!collapsed && "Shortlisted Companies"}
              </Link>
            </li>
            <li>
              <Link to="/TOpportunities">
                <FaRegFileAlt /> {!collapsed && "Opportunities"}
              </Link>
            </li>
            <li>
              <Link to="/TMessages">
                <FaRegEnvelope /> {!collapsed && "My Messages"}
              </Link>
            </li>
            <li>
              <Link to="/Talentsettings">
                <FaCog /> {!collapsed && "Settings"}
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaSignOutAlt /> {!collapsed && "Logout"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TalentSidebar;
