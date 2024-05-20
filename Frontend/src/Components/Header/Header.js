import React from "react";
import NavLink from "./NavLink";
import { useState } from "react";
import images from "../images";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="logo">
        <img src={images.logo} alt="Company logo" className="cursor-pointer" />
      </div>
      <nav className="d-flex justify-between align-center ">
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
        <div className={`nav-menu ${isOpen ? "open" : ""} `}>
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
                activeClassName="active-link"
                onClick={() => setIsOpen(false)}
              >
                Home{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/About"
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
                activeClassName="active-link"
                onClick={() => setIsOpen(false)}
              >
                Companies
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/Talent"
                activeClassName="active-link"
                onClick={() => setIsOpen(false)}
              >
                Talents
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/Contact"
                activeClassName="active-link"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="btn-container">
            <button className="blue-btn">Get Started</button>
          </div>
        </div>
        {isOpen && <div className="transparent-background open"></div>}
      </nav>
    </header>
  );
};

export default Header;
