import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as yup from "yup";
import "../Signup/Signup.css";
import "../Login/Login.css";
import "./forgot-password.css";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  token: yup.string().required("Token is required"),
  password: yup.string().required("Password is required"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);

    // Send a POST request to the backend API
    fetch("http://localhost:5000/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        token: data.token,
        password: data.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or token");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData); // Log the server response
        // Handle the server response, e.g. show a message to the user
      })
      .catch((error) => {
        // Handle the error, e.g. show a message to the user
        console.error('Error:', error);
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
          <label htmlFor="token">Token</label>
          <input
            id="token"
            type="text"
            {...register("token")}
            placeholder="Enter your reset token"
          />
          {errors.token && <p className="error">{errors.token.message}</p>}
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
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <button type="submit" className="submit-button">
          Reset Password
        </button>
        <button type="reset" className="cancel-button">
          <Link to="/Login"> Cancel </Link>
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;