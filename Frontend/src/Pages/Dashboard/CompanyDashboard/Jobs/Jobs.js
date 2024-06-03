import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FaMapMarkerAlt, FaBookmark } from "react-icons/fa";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie";
import "./Jobs.css";

const Spinner = () => (
  <div className="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
    <div className="bounce4"></div>
    <div className="bounce5"></div>
  </div>
);

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all jobs once
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
        setJobs(parsedJobs);
        setFilteredJobs(parsedJobs);
        setSelectedJob(parsedJobs[0]);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    fetchAllJobs();
  }, []);

  // Handle search filtering
  const handleSearch = useCallback(() => {
    const filtered = jobs.filter((job) => {
      const matchesTitle = title
        ? job.title.toLowerCase().includes(title.toLowerCase())
        : true;
      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true;
      return matchesTitle && matchesLocation;
    });
    setFilteredJobs(filtered);
    setSelectedJob(filtered[0] || null);
  }, [jobs, title, location]);



  // Apply for a job
  const applyForJob = async (jobId) => {
    const token = Cookies.get("auth_token")
    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ job_id: jobId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Application submitted successfully");
      } else {
        alert(data.msg || "Error submitting application");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  // Handle window resize to close modal on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowModal(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 400);

    return () => clearTimeout(timer);
  }, [title, location, handleSearch]);

  const resetSearch = () => {
    setFilteredJobs(jobs);
    setSelectedJob(jobs[0]);
    setTitle("");
    setLocation("");
  };

  return (
    <section className="jobs-manageJobs">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Find Jobs</h1>
          <div>
            <div className="search-inputs">
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
            </div>
            <div className="jobs-btn">
              <button onClick={handleSearch}>Search</button>
              <button onClick={resetSearch}>Show All Jobs</button>
            </div>
          </div>

          <div className="jobs-jobContainer">
            {filteredJobs.length > 0 ? (
              <>
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
                      <button
                        className="jobs-applyButton"
                        onClick={(e) => {
                          e.stopPropagation();
                          applyForJob(job._id.$oid);
                        }}
                      >
                        <AiOutlineSend /> Apply
                      </button>
                    </li>
                  ))}
                </ul>

                {selectedJob && (
                  <div className="jobs-jobDetails jobs-desktopView">
                    <h2>{selectedJob.title}</h2>
                    <p className="jobs-jobCompany">{selectedJob.name}</p>
                    <div className="jobs-jobLocation">
                      <FaMapMarkerAlt /> {selectedJob.location}
                    </div>
                    <p className="jobs-jobRequirement">
                      {selectedJob.requirements}
                    </p>
                    <p className="jobs-jobDescription">
                      {selectedJob.description}
                    </p>
                    <button className="jobs-applyButton">
                      <AiOutlineSend /> Apply
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="no-jobs-message">
                No jobs found. Please try a different search.
              </p>
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
                  <p className="jobs-jobRequirement">
                    {selectedJob.requirements}
                  </p>
                  <p className="jobs-jobDescription">
                    {selectedJob.description}
                  </p>
                  <button
                    className="jobs-applyButton"
                    onClick={() => applyForJob(selectedJob._id.$oid)}
                  >
                    <AiOutlineSend /> Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Jobs;