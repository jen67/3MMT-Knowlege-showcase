import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);

    const token = Cookies.get("auth_token");

    if (!token) {
      console.error("Error: No authentication token found");
      return;
    }

    fetch("http://localhost:5000/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: data.email,
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

        Cookies.set("reset_token", responseData.reset_token);

        fetch("http://localhost:5000/auth/update-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: data.email,
            reset_token: responseData.reset_token,
            new_password: data.password,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Failed to update password: " + response.statusText
              );
            }
            return response.json();
          })
          .then((updateResponseData) => {
            console.log(updateResponseData);
            setResetModalMessage("Password has been updated successfully.");
            setShowResetModal(true);
          })
          .catch((error) => {
            console.error("Error:", error);
            setResetModalMessage("An error occurred: " + error.message);
            setShowResetModal(true);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        setResetModalMessage("An error occurred: " + error.message);
        setShowResetModal(true);
      });
  };

  const handleModalClose = () => {
    setShowResetModal(false);
    navigate("/Login");
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
        <Modal message={resetModalMessage} onClose={handleModalClose} />
      )}
    </section>
  );
};

export default ForgotPassword;
