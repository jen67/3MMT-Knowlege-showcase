import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaEnvelopeOpenText, FaRegListAlt, FaRegFileAlt, FaRegEnvelope, FaCog, FaSignOutAlt, FaBuilding, FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import "./Sidebar.css";

const CompanySidebar = () => {
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
              <Link to="/CompanyDashboard">
                <FaHome /> {!collapsed && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/Profile">
                <FaUser /> {!collapsed && "Profile"}
              </Link>
            </li>
            <li>
              <Link to="/Post-jobs">
                <FaBriefcase /> {!collapsed && "Post Jobs"}
              </Link>
            </li>
            <li>
              <Link to="/Applications">
                <FaEnvelopeOpenText /> {!collapsed && "Applications Received"}
              </Link>
            </li>
            <li>
              <Link to="/Shortlisted">
                <FaRegListAlt /> {!collapsed && "Shortlisted Volunteers"}
              </Link>
            </li>
            <li>
              <Link to="/Resumes">
                <FaRegFileAlt /> {!collapsed && "Resumes"}
              </Link>
            </li>
            <li>
              <Link to="/Mymessages">
                <FaRegEnvelope /> {!collapsed && "My Messages"}
              </Link>
            </li>
            <li>
              <Link to="/Settings">
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

export default CompanySidebar;