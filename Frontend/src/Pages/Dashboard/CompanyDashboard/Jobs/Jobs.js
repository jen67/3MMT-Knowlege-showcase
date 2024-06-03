import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FaMapMarkerAlt, FaBookmark } from "react-icons/fa";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";

import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowModal(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = useCallback(async () => {
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (location) params.append("location", location);
    try {
      const response = await fetch(
        `http://localhost:5000/api/search/jobs?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFilteredJobs(data);
      setSelectedJob(data[0]); // Select the first job from the search results
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  }, [title, location]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const jobsResponse = await fetch("http://localhost:5000/api/jobs", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!jobsResponse.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobsData = await jobsResponse.json();
        const parsedJobs = jobsData.map((item) => ({
          ...JSON.parse(item.job),
          name: item.name,
        }));

        let filteredData = parsedJobs;
        if (title || location) {
          const params = new URLSearchParams();
          if (title) params.append("title", title);
          if (location) params.append("location", location);
          const searchResponse = await fetch(
            `http://localhost:5000/api/search/jobs?${params.toString()}`
          );
          if (!searchResponse.ok) {
            throw new Error("Network response was not ok");
          }
          filteredData = await searchResponse.json();
        }

        setJobs(parsedJobs);
        setFilteredJobs(filteredData);
        setSelectedJob(filteredData[0]); // Select the first job from the search results or all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [title, location]);


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

  const resetSearch = () => {
    setFilteredJobs(jobs);
    setSelectedJob(jobs[0]); 
  };

  return (
    <section className="jobs-manageJobs">
      <h1>Find Jobs</h1>
      <div>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Show All Jobs</button>
      </div>

      <div className="jobs-jobContainer">
        <ul className="jobs-jobList">
          {filteredJobs.map((job) => (
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
