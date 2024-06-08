import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./TalentSidebar.css";
import {
  FaHome,
  FaUser,
  FaEnvelopeOpenText,
  FaRegListAlt,
  FaRegFileAlt,
  FaRegEnvelope,
  FaCog,
  FaSignOutAlt,
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaUserCircle,
} from "react-icons/fa";
import "../../TSidebar.css";

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
        <div className="clog-container">
          <FaUserCircle size={20} className="clogo" /> {!collapsed && ""}
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                exact
                to="/TalentDashboard"
                className="sidebar-link"
                activeClassName="active"
              >
                <FaHome /> {!collapsed && "Dashboard"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Talentprofile"
                className="sidebar-link"
                activeClassName="active"
              >
                <FaUser /> {!collapsed && "Profile"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/TApplications"
                className="sidebar-link"
                activeClassName="active"
              >
                <FaEnvelopeOpenText /> {!collapsed && "Applications"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/TShortlisted"
                className="sidebar-link"
                activeClassName="active"
              >
                <FaRegListAlt /> {!collapsed && "Shortlisted "}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/TOpportunities"
                className="sidebar-link"
                activeClassName="active"
              >
                <FaRegFileAlt /> {!collapsed && "Opportunities"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/TMessages"
                className="sidebar-link"
                activeClassName="active"
              >
                <FaRegEnvelope /> {!collapsed && "Messages"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Talentsettings"
                className="sidebar-link"
                activeClassName="active"
              >
                <FaCog /> {!collapsed && "Settings"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/TLogout"
                className="sidebar-link"
                activeClassName="active"
              >
                <FaSignOutAlt /> {!collapsed && "Logout"}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TalentSidebar;
