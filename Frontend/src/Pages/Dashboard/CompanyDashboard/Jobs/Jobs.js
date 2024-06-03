import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CompanySearch from "../Csearch/TalentSearch";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineSend, AiFillStar, AiOutlineClose } from "react-icons/ai"; // Import the close icon

import "../Sidebar/SidebarComponents/ManageJobs/ManageJobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State to track selected job
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]); // State to store bookmarked jobs
  const [showModal, setShowModal] = useState(false); // State to control mobile modal
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowModal(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      console.log("Fetched jobs:", data); // Debug: Check the structure of data
      setJobs(JSON.parse(data)); // Ensure data is parsed correctly
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    if (window.innerWidth <= 768) {
      setShowModal(true); // Show modal on mobile
    }
  };

  const toggleBookmark = (jobId) => {
    if (bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter((id) => id !== jobId));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  return (
    <>
      <section className="ManageJobs">
        <h1>Find Jobs</h1>
        <CompanySearch />

        <div className="job-container">
          {/* Job List Section */}
          <ul className="job-list">
            {jobs.map((job) => (
              <li
                key={job._id.$oid}
                className="job-item"
                onClick={() => handleJobClick(job)} // Add onClick handler
              >
                <h3>{job.title}</h3>
                <p className="job-requirement">{job.requirements}</p>
                <p className="job-description">{job.description}</p>
                <p className="job-location">{job.location}</p>
                <p className="job-company">{job.company.name}</p>
                <p>
                  Posted{" "}
                  {formatDistanceToNow(new Date(job.posted_date.$date), {
                    addSuffix: true,
                  })}
                </p>
                <button
                  className="bookmark-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent job click event from firing
                    toggleBookmark(job._id.$oid);
                  }}
                >
                  {bookmarkedJobs.includes(job._id.$oid) ? (
                    <AiFillStar color="gold" />
                  ) : (
                    <AiFillStar />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Job Details Section (Desktop View) */}
          {selectedJob && !showModal && (
            <div className="job-details desktop-view">
              <h2>{selectedJob.title}</h2>
              <p className="job-requirement">{selectedJob.requirements}</p>
              <p className="job-description">{selectedJob.description}</p>
              <div className="job-location">
                <FaMapMarkerAlt /> {selectedJob.location}
              </div>
              <button className="apply-button">
                <AiOutlineSend /> Apply
              </button>
            </div>
          )}
        </div>

        {/* Job Details Modal (Mobile View) */}
        {showModal && (
          <div className="modal mobile-view">
            <div className="modal-content">
              <span
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                <AiOutlineClose /> {/* Use the close icon */}
              </span>
              <div className="job-details">
                <h2>{selectedJob.title}</h2>
                <p className="job-requirement">{selectedJob.requirements}</p>
                <p className="job-description">{selectedJob.description}</p>
                <div className="job-location">
                  <FaMapMarkerAlt /> {selectedJob.location}
                </div>
                <button className="apply-button">
                  <AiOutlineSend /> Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Jobs;
