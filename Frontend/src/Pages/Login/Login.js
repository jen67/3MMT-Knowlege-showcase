import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import Cookies from "js-cookie";
import "../Signup/Signup.css";
import CustomSelect from "../../Components/Custom/CustomSelect";
import "../../Components/Custom/CustomSelect.css";
import Modal from "../../Components/Modal/Modal";
import "./Login.css";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  accountType: yup.string().required("Account type is required"),
});

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then((responseData) => {
        Cookies.set("auth_token", responseData.access_token);
        // Decode the payload of the JWT
        // const base64Url = responseData.access_token.split(".")[1];
        // const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        // const payload = JSON.parse(window.atob(base64));

        // Cookies.set("user_id", payload.sub.id);

        if (responseData.access_token) {
          // Check if the account type from the backend matches the user's intended login type
          if (
            (data.accountType === "Company" && !responseData.is_company) ||
            (data.accountType === "Talent" && responseData.is_company)
          ) {
            throw new Error(
              "Account type mismatch. Please select the correct account type."
            );
          }

          setModalMessage("Login successful!");
          setShowModal(true);

          if (responseData.is_company) {
            navigate("/CompanyDashboard");
          } else {
            navigate("/TalentDashboard");
          }
        }
      })
      .catch((error) => {
        setModalMessage(error.message);
        setShowModal(true);
      });
  };


  const accountTypes = [
    { value: "Company", label: "Company" },
    { value: "Talent", label: "Talent" },
  ];

  return (
    <section className="loginform">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="login-header">
          <h1>Login</h1>
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            autoComplete="new-password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="accountType">Account Type</label>
          <Controller
            name="accountType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomSelect
                id="accountType"
                options={accountTypes}
                onSelectChange={(value) => field.onChange(value)}
                value={field.value}
              />
            )}
          />
          {errors.accountType && (
            <p className="error">{errors.accountType.message}</p>
          )}
        </div>

        <div className="forgotten-psw d-flex justify-between align-center">
          <div className="psscheck d-flex align-center">
            <input
              type="checkbox"
              id="terms-and-services"
              name="terms-and-services"
            />
            <label htmlFor="terms-and-services">
              <Link to="/TermsOfService" className="terms-link">
                Terms and Services
              </Link>
            </label>
          </div>
          <Link to="/forgot-password" className="forgot-password-link">
            Forgotten Password
          </Link>
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>
        <div className="account-exists d-flex  align-center">
          <p>Don't have an account?</p>
          <Link to="/signup" className="signuplink">
            Create one
          </Link>
        </div>
      </form>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default Login;
