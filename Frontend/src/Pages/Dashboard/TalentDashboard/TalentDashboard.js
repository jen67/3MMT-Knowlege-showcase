import React from "react";
import { FaBriefcase, FaHeart, FaEye, FaCommentDots } from "react-icons/fa";
import "./TalentDashboard.css"; 

const TalentDashboard = () => {
  return (
    <div className="Tdashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat">
          <FaBriefcase className="icon" />
          <div className="stat-info">
            <h2>2</h2>
            <p>Applied Opportunities</p>
          </div>
        </div>
        <div className="stat">
          <FaHeart className="icon" />
          <div className="stat-info">
            <h2>3</h2>
            <p>Shortlisted</p>
          </div>
        </div>
        <div className="stat">
          <FaCommentDots className="icon" />
          <div className="stat-info">
            <h2>0</h2>
            <p>Review</p>
          </div>
        </div>
        <div className="stat">
          <FaEye className="icon" />
          <div className="stat-info">
            <h2>57</h2>
            <p>Views</p>
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
      </div>
    </div>
  );
};

export default TalentDashboard;
