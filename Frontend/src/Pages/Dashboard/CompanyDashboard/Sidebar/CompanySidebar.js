import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaEnvelopeOpenText, FaRegListAlt, FaRegFileAlt, FaRegEnvelope, FaCog, FaSignOutAlt, FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import images from "../../../../Components/images";
import "./Sidebar.css";


const CompanySidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [logoUrl, setLogoUrl] = useState(localStorage.getItem("logoUrl") || images.clogo);

  useEffect(() => {
    const logoUrl = localStorage.getItem("logoUrl");
    if (logoUrl) {
      setLogoUrl(logoUrl);
    }
  }, []);

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
        <div className="clog-container">
          <img src={logoUrl} alt="Company Logo" className="clogo" />{" "}
          {!collapsed && ""}
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/CompanyDashboard" className="sidebar-link">
                <FaHome /> {!collapsed && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/Profile" className="sidebar-link">
                <FaUser /> {!collapsed && "Profile"}
              </Link>
            </li>
            <li>
              <Link to="/Post-jobs" className="sidebar-link">
                <FaBriefcase /> {!collapsed && "Post Jobs"}
              </Link>
            </li>
            <li>
              <Link to="/Applications" className="sidebar-link">
                <FaEnvelopeOpenText /> {!collapsed && "Applications"}
              </Link>
            </li>
            <li>
              <Link to="/Shortlisted" className="sidebar-link">
                <FaRegListAlt /> {!collapsed && "Shortlisted"}
              </Link>
            </li>
            <li>
              <Link to="/Resumes" className="sidebar-link">
                <FaRegFileAlt /> {!collapsed && "Resumes"}
              </Link>
            </li>
            <li>
              <Link to="/Mymessages" className="sidebar-link">
                <FaRegEnvelope /> {!collapsed && "Messages"}
              </Link>
            </li>
            <li>
              <Link to="/Settings" className="sidebar-link">
                <FaCog /> {!collapsed && "Settings"}
              </Link>
            </li>
            <li>
              <Link to="/" className="sidebar-link">
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