import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Modal from "../../../../../../Components/Modal/Modal";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

import "./ManageJobs.css";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
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
        fetchJobs(); // Refresh job list after deletion
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
    // Redirect to PostJob component with pre-filled data
    navigate("/Post-jobs", { state: { jobId: job._id.$oid, job } });
  };

  return (
    <section className="ManageJobs">
      <h1>Manage Jobs</h1>

      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job._id.$oid} className="job-item">
            <h3>{job.title}</h3>
            <p className="job-requirement">{job.requirements}</p>
            <p className="job-description">{job.description}</p>
            <p className="job-location">{job.location}</p>
            <p>
              Posted on{" "}
              <span>
                {format(new Date(job.posted_date.$date), "MM/dd/yyyy HH:mm:ss")}
              </span>{" "}
            </p>
          <RiEditLine onClick={() => handleEdit(job)} className="edit-icon" />
            <RiDeleteBinLine
              onClick={() => handleDelete(job._id.$oid)}
              className="delete-icon"
            />
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default ManageJobs;
