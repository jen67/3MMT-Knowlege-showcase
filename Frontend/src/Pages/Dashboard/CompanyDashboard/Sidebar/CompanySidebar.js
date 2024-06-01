import React, { useState } from "react";
import NavLink from "../../../../Components/Header/NavLink";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaEnvelopeOpenText,
  FaRegListAlt,
  FaRegFileAlt,
  FaRegEnvelope,
  FaCog,
  FaSignOutAlt,
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaTasks,
  FaUserCircle,
} from "react-icons/fa";
import "../../TSidebar.css";

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
        <div className="clog-container">
          <FaUserCircle size={50} className="clogo" />  {!collapsed && ""}
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/CompanyDashboard" className="sidebar-link">
                <FaHome /> {!collapsed && "Dashboard"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/Profile" className="sidebar-link">
                <FaUser /> {!collapsed && "Profile"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/Post-jobs" className="sidebar-link">
                <FaBriefcase /> {!collapsed && "Post Jobs"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/ManageJobs" className="sidebar-link">
                <FaTasks /> {!collapsed && "Manage Jobs"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/Applications" className="sidebar-link">
                <FaEnvelopeOpenText /> {!collapsed && "Applications"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/Shortlisted" className="sidebar-link">
                <FaRegListAlt /> {!collapsed && "Shortlisted"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/Resumes" className="sidebar-link">
                <FaRegFileAlt /> {!collapsed && "Resumes"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/Mymessages" className="sidebar-link">
                <FaRegEnvelope /> {!collapsed && "Messages"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/Settings" className="sidebar-link">
                <FaCog /> {!collapsed && "Settings"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/Logout" className="sidebar-link">
                <FaSignOutAlt /> {!collapsed && "Logout"}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CompanySidebar;
