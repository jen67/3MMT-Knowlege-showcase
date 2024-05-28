import React from "react";
import { FaBriefcase, FaHeart, FaEye, FaCommentDots } from "react-icons/fa";
import "./TalentDashboard.css"; 

const TalentDashboard = () => {
  return (
    <div className="Tdashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat opportunities-card">
          <div className="stat-info">
            <h2>Opportunities</h2>
            <div className="icon-and-count">
              <div className="icon-container">
                <FaBriefcase className="icon" />
              </div>
              <p>2</p>
            </div>
          </div>
        </div>
        <div className="stat shortlisted">
          <div className="stat-info">
            <h2>Shortlisted</h2>
            <div className="icon-and-count">
              <div className="icon-container">
                <FaHeart className="icon" />
              </div>
              <p>3</p>
            </div>
          </div>
        </div>
        <div className="stat review">
          <div className="stat-info">
            <h2>Review</h2>
            <div className="icon-and-count">
              <div className="icon-container">
                <FaCommentDots className="icon" />
              </div>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="stat views">
          <div className="stat-info">
            <h2>Views</h2>
            <div className="icon-and-count">
              <div className="icon-container">
                <FaEye className="icon" />
              </div>
              <p>57</p>
            </div>
          </div>
        </div>
      </div>
      <div className="opportunities">
        <h3>Opportunities Applied Recently</h3>
        <div className="opportunity">
          <h4>Web Developer Volunteer at Coach Tribe (3 positions)</h4>
          <p>Coach Tribe - Posted 2 weeks ago</p>
          <p>Category: Back End Development</p>
          <span className="status pending">Pending</span>
        </div>
        <div className="opportunity">
          <h4>Front-end Developer Volunteer</h4>
          <p>Dropify Technologies - Posted 3 weeks ago</p>
          <p>Category: Product Development</p>
          <span className="status pending">Pending</span>
        </div>

        <div className="opportunity">
          <h4>Front-end Developer Volunteer</h4>
          <p>Dropify Technologies - Posted 3 weeks ago</p>
          <p>Category: Product Development</p>
          <span className="status pending">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default TalentDashboard;