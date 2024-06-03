import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CompanySearch from "../Csearch/TalentSearch";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";

import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowModal(false);
      }
    };

    window.addEventListener("resize", handleResize);

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
      const parsedJobs = data.map((item) => ({
        ...JSON.parse(item.job),
        name: item.name,
      }));
      setJobs(parsedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    if (window.innerWidth < 768) {
      setShowModal(true);
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
    <section className="jobs-manageJobs">
      <h1>Find Jobs</h1>
      <CompanySearch />

      <div className="jobs-jobContainer">
        <ul className="jobs-jobList">
          {jobs.map((job) => (
            <li
              key={job._id.$oid}
              className="jobs-jobItem"
              onClick={() => handleJobClick(job)}
            >
              <div className="jobs-jobHeader">
                <h3>{job.title}</h3>
                <button
                  className="jobs-bookmarkButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(job._id.$oid);
                  }}
                >
                  {bookmarkedJobs.includes(job._id.$oid) ? (
                    <FaBookmark color="gold" size={20} />
                  ) : (
                    <FaBookmark size={20} />
                  )}
                </button>
              </div>
              <p className="jobs-jobCompany">{job.name}</p>
              <p className="jobs-jobLocation">
                <FaMapMarkerAlt /> {job.location}
              </p>
              <p className="jobs-jobRequirement">{job.requirements}</p>
              <p className="jobs-jobDescription">{job.description}</p>
              <p className="jobs-jobPosted">
                Posted{" "}
                {formatDistanceToNow(new Date(job.posted_date.$date), {
                  addSuffix: true,
                })}
              </p>
            </li>
          ))}
        </ul>

        {selectedJob && !showModal && (
          <div className="jobs-jobDetails jobs-desktopView">
            <h2>{selectedJob.title}</h2>
            <p className="jobs-jobCompany">{selectedJob.name}</p>
            <div className="jobs-jobLocation">
              <FaMapMarkerAlt /> {selectedJob.location}
            </div>
            <p className="jobs-jobRequirement">{selectedJob.requirements}</p>
            <p className="jobs-jobDescription">{selectedJob.description}</p>
            <button className="jobs-applyButton">
              <AiOutlineSend /> Apply
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="jobs-modal jobs-mobileView">
          <div className="jobs-modalContent">
            <span
              className="jobs-closeButton"
              onClick={() => setShowModal(false)}
            >
              <AiOutlineClose />
            </span>
            <div className="jobs-jobDetails">
              <h2>{selectedJob.title}</h2>
              <p className="jobs-jobCompany">{selectedJob.name}</p>
              <div className="jobs-jobLocation">
                <FaMapMarkerAlt /> {selectedJob.location}
              </div>
              <p className="jobs-jobRequirement">{selectedJob.requirements}</p>
              <p className="jobs-jobDescription">{selectedJob.description}</p>
              <button className="jobs-applyButton">
                <AiOutlineSend /> Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Jobs;
