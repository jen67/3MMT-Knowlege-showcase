import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Modal from "../../../../../../Components/Modal/Modal";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine, RiEditLine, RiAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import "./ManageJobs.css";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const token = Cookies.get("auth_token");
    try {
      const response = await fetch("http://localhost:5000/api/company_jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      console.log("Fetched jobs:", data);
      setJobs(JSON.parse(data));

      // Simulate a delay before setting isLoading to false
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 1000ms = 1 second delay
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const token = Cookies.get("auth_token");
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchJobs();
        setModalMessage("Job deleted successfully!");
        setShowModal(true);
      } else {
        const errorData = await response.json();
        setModalMessage(`Error: ${errorData.msg}`);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      setModalMessage("Failed to delete job.");
      setShowModal(true);
    }
  };

  const handleEdit = (job) => {
    navigate("/Post-jobs", { state: { jobId: job._id.$oid, job } });
  };

  return (
    <section className="ManageJobs">
      <h1>Manage Jobs</h1>
      <div className="ManageJobs-wrapper">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <ul className="job-list">
            {jobs.length === 0 ? (
              <li className="empty-job-list">
                <p>You have not posted any job yet</p>
                <Link to="/Post-jobs">
                  <RiAddLine /> Post jobs
                </Link>
              </li>
            ) : (
              jobs.map((job) => (
                <li key={job._id.$oid} className="job-item">
                  <h3>{job.title}</h3>
                  <p className="job-requirement">{job.requirements}</p>
                  <p className="job-description">{job.description}</p>
                  <p className="job-location">{job.location}</p>
                  <p className="date-posted">
                    Posted on{" "}
                    <span>
                      {format(
                        new Date(job.posted_date.$date),
                        "MM/dd/yyyy HH:mm:ss"
                      )}
                    </span>{" "}
                  </p>
                  <RiEditLine
                    onClick={() => handleEdit(job)}
                    className="edit-icon"
                  />
                  <RiDeleteBinLine
                    onClick={() => handleDelete(job._id.$oid)}
                    className="delete-icon"
                  />
                </li>
              ))
            )}
          </ul>
        )}
        {showModal && (
          <Modal message={modalMessage} onClose={() => setShowModal(false)} />
        )}
      </div>
    </section>
  );
};

export default ManageJobs;
