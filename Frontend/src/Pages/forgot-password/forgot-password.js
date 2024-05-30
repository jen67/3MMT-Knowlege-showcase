import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import * as yup from "yup";
import "../Signup/Signup.css";
import "../Login/Login.css";
import "./forgot-password.css";
import Modal from "../../Components/Modal/Modal";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const ForgotPassword = () => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetModalMessage, setResetModalMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);

    // Get the authentication token from local storage or wherever it's stored
    const token = Cookies.get("auth_token"); 

    // Check if the token is null or empty
    if (!token) {
      console.error("Error: No authentication token found");
      return;
    }

    // Send a POST request to the backend API with the authentication token
    fetch("http://localhost:5000/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password, // Include the new password in the request body
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or token: " + response.statusText);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        // Set the reset modal message and show the reset modal
        setResetModalMessage("Password has been reset successfully.");
        setShowResetModal(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Set the reset modal message and show the reset modal
        setResetModalMessage("An error occurred: " + error.message);
        setShowResetModal(true);
      });
  };
  return (
    <section className="forgot-password-form">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="forgot-password-header">
          <h1>Reset your Password</h1>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            autoComplete="username"
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            autoComplete="new-password"
            placeholder="Enter your new password"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="submit-button">
          Reset Password
        </button>
        <button type="reset" className="cancel-button">
          <Link to="/Login"> Cancel </Link>
        </button>
      </form>
      {showResetModal && (
        <Modal
          message={resetModalMessage}
          onClose={() => setShowResetModal(false)}
        />
      )}
    </section>
  );
};

export default ForgotPassword;
