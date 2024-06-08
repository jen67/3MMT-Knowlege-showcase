import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretUp } from "react-icons/fa";
import { useAuth } from "../../Context/Authcontext";
import images from "../images";
import NavLink from "./NavLink";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userName, talentName, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateToSignup = () => {
    navigate("/Signup");
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const loggedInUserName = user && user.is_company ? userName : talentName; // Determine which name to display based on user type
  return (
    <header>
      <div className="logo">
        <img src={images.logo} alt="Company logo" className="cursor-pointer" />
      </div>
      <nav className="d-flex justify-between align-center">
        {!isOpen && (
          <div className="toggles">
            <img
              onClick={toggleMenu}
              src={images.menuIcon}
              alt="menu icon"
              className="menu-icon cursor-pointer"
            />
          </div>
        )}
        <div className={`nav-menu ${isOpen ? "open" : ""}`}>
          <img
            src={images.closeIcon}
            className="close-icon cursor-pointer"
            alt="close icon"
            onClick={() => setIsOpen(false)}
          />
          <ul>
            <li>
              <NavLink
                exact
                to="/"
                className="header-link"
                activeClassName="active-link"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/About"
                className="header-link"
                activeClassName="active-link"
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/Company"
                className="header-link"
                activeClassName="active-link"
                onClick={() => setIsOpen(false)}
              >
                Companies
              </NavLink>
            </li>
            
            <li>
              <NavLink
                exact
                to="/Contact"
                className="header-link"
                activeClassName="active-link"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
            </li>

            {user && (
              <>
              <li>
              <NavLink
                exact
                to="/Talent"
                className="header-link"
                activeClassName="active-link"
                onClick={() => setIsOpen(false)}
              >
                Talents
              </NavLink>
            </li>
              
              <li>
                <NavLink
                  exact
                  to="/Jobs"
                  className="header-link"
                  activeClassName="active-link"
                  onClick={() => setIsOpen(false)}
                >
                  Jobs
                </NavLink>
              </li>
              </>
            )}
          </ul>

          <div className="btn-container">
            {user ? (
              <div className="user-dropdown">
                <button
                  className={`user-button user-name ${user ? "logged-in" : ""}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {loggedInUserName || "Welcome... 😊 "}{" "}
                  {/* Display logged-in user's name */}
                  <FaCaretUp
                    className={`caret ${isDropdownOpen ? "rotate" : ""}`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <NavLink
                      exact
                      to={`/${
                        user.is_company ? "CompanyDashboard" : "TalentDashboard"
                      }`}
                      activeClassName="active-link"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="blue-btn" onClick={navigateToSignup}>
                Get Started
              </button>
            )}
          </div>
        </div>
        {isOpen && (
          <div
            className="transparent-background open"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </nav>
    </header>
  );
};

export default Header;