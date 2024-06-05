import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CustomSelect from '../../../../Components/Custom/CustomSelect';
import {
  FaMapMarkerAlt,
  FaBookmark,
  FaCheck,
  FaBuilding,
  FaClipboardList,
  FaRegFileAlt,
} from "react-icons/fa";
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
  const [appliedJobs, setAppliedJobs] = useState([]); // New state to keep track of applied jobs
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

    // Fetch user's applied jobs
    const fetchUserAppliedJobs = async () => {
      const token = Cookies.get("auth_token");
      const user_id = Cookies.get("user_id");
      try {
        const response = await fetch(
          `http://localhost:5000/api/application/user/${user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const appliedJobIds = data.map((application) => application.job._id);
          setAppliedJobs(appliedJobIds);
        } else {
          throw new Error("Failed to fetch user's applied jobs");
        }
      } catch (error) {
        console.error("Error fetching user's applied jobs:", error);
      }
    };
    fetchUserAppliedJobs();
  }, []);



  // Handle search filtering

 const [searchType, setSearchType] = useState("all");

 const handleSearch = useCallback(() => {
   const filtered = jobs.filter((job) => {
     const titleMatches = job.title.toLowerCase().includes(title.toLowerCase());
     const locationMatches = job.location
       .toLowerCase()
       .includes(location.toLowerCase());
     if (searchType === "all") {
       return titleMatches || locationMatches;
     } else if (searchType === "title") {
       return titleMatches;
     } else {
       return locationMatches;
     }
   });
   setFilteredJobs(filtered);
   setSelectedJob(filtered[0] || null);
 }, [jobs, title, location, searchType]);

 const handleInputChange = (e) => {
   if (searchType === "all") {
     const [titlePart, ...locationPart] = e.target.value.split(" ");
     setTitle(titlePart);
     setLocation(locationPart.join(" "));
   } else if (searchType === "title") {
     setTitle(e.target.value);
   } else {
     setLocation(e.target.value);
   }
 };


  // Apply for a job
  const applyForJob = async (jobId) => {
    const token = Cookies.get("auth_token");
    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ job_id: jobId }),
      });

      console.log("response", response);
      const data = await response.json();
      if (response.ok) {
        alert("Application submitted successfully");
        setAppliedJobs([...appliedJobs, jobId]); // Update applied jobs
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
          <div className="inputs-container">
            <div className="search-inputs">
              <div className="search-select">
                <CustomSelect
                  options={[
                    { value: "all", label: "Search All" },
                    { value: "title", label: "Job Title" },
                    { value: "location", label: "Location" },
                  ]}
                  onSelectChange={setSearchType}
                  value={searchType}
                  name="searchType"
                  placeholder="Select search type"
                />
              </div>
              <input
                type="text"
                placeholder={
                  searchType === "all"
                    ? "Search All"
                    : searchType === "title"
                    ? "Job Title"
                    : "Location"
                }
                value={
                  searchType === "all"
                    ? `${title} ${location}`.trim()
                    : searchType === "title"
                    ? title
                    : location
                }
                onChange={handleInputChange}
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
                      <p className="jobs-jobLocation">{job.location}</p>
                      <p className="jobs-jobRequirement">{job.requirements}</p>
                      <p className="jobs-jobDescription">{job.description}</p>
                      <p className="jobs-jobPosted">
                        Posted{" "}
                        {formatDistanceToNow(new Date(job.posted_date.$date), {
                          addSuffix: true,
                        })}
                      </p>
                      {appliedJobs.includes(job._id.$oid) && (
                        <div className="jobs-applied">
                          <FaCheck size={20} />
                          <span>Applied</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                {selectedJob && (
                  <div className="jobs-jobDetails">
                    <h2>{selectedJob.title}</h2>

                    <div className="jobs-jobSection">
                      <h3>
                        <FaBuilding /> Company
                      </h3>
                      <p>{selectedJob.name}</p>
                    </div>

                    <div className="jobs-jobSection">
                      <h3>
                        <FaMapMarkerAlt /> Location
                      </h3>
                      <p>{selectedJob.location}</p>
                    </div>

                    <div className="jobs-scrollableContent">
                      <div className="jobs-jobSection">
                        <h3>
                          <FaClipboardList /> Requirements
                        </h3>
                        <p>{selectedJob.requirements}</p>
                      </div>
                      <div className="jobs-jobSection">
                        <h3>
                          <FaRegFileAlt /> Description
                        </h3>
                        <p>{selectedJob.description}</p>
                      </div>
                      <button
                        className="jobs-applyButton"
                        onClick={() => applyForJob(selectedJob._id.$oid)}
                        disabled={appliedJobs.includes(selectedJob._id.$oid)}
                      >
                        <AiOutlineSend />{" "}
                        {appliedJobs.includes(selectedJob._id.$oid)
                          ? "Applied"
                          : "Apply"}
                      </button>
                    </div>
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
                    disabled={appliedJobs.includes(selectedJob._id.$oid)}
                  >
                    <AiOutlineSend />{" "}
                    {appliedJobs.includes(selectedJob._id.$oid)
                      ? "Applied"
                      : "Apply"}
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
