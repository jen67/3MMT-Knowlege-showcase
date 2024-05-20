import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import images from "../images";

const Footer = () => {
  return (
    <footer className="d-flex flex-column">
      <div className="flex-items">
      
        <div className="logo-div">
          <img src={images.blackLogo} alt="black logo" className="black-logo" />
          <p>Connect talents to companies and companies to professionals</p>
        </div>
        <div className="contact" aria-label="Contact Information">
          <h3>Contact</h3>
          <address>
            <p>
              <img src={images.locationIcon} alt="Location: " />
              732 Despard St, Africa
            </p>
            <p>
              <img src={images.phoneIcon} alt="Phone number: " />
              +234 987 367 89
            </p>
            <p>
              <img src={images.mailIcon} alt="Email: " />
              infor@wefind.com
            </p>
          </address>
        </div>
        <nav>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Company">Companies</Link>
            </li>
            <li>
              <Link to="/Talent">Talents</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
            <li>
              <button className="blue-btn">Get Started</button>
            </li>
          </ul>
        </nav>
        <div className="social">
          <h3>Follow Us</h3>
          <div className="social-links d-flex align-center">
            <Link to="/facebook" aria-label="Follow us on Facebook">
              <img src={images.facebookIcon} alt="facebook" />
            </Link>
            <Link to="/twitter" aria-label="Follow us on twitter">
              <img src={images.twitterIcon} alt="twitter" />
            </Link>
            <Link to="/youtube" aria-label="Follow us on Youtube">
              <img src={images.youtubeIcon} alt="youtube" />
            </Link>
            <Link to="/instagram" aria-label="Follow us on Instagram">
              <img src={images.instagramIcon} alt="instagram" />
            </Link>
            <Link to="/linkedin" aria-label="Follow us on Linkedin">
              <img src={images.linkedinIcon} alt="linkedin" />
            </Link>
          </div>
        </div>
    </div>

      <div className="copyright">
        <p>© 2024 Wefind. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
