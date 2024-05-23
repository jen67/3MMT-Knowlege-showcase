import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomSelect from "../../Components/CustomSelect";
import { Link } from "react-router-dom";
import "./Signup.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobile: yup.string().required("Mobile Number is required"),
  companyName: yup.string(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  category: yup.string().required("Category is required"),
});

const jobCategories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Cybersecurity Specialist",
  "Data Scientist",
  "DevOps Engineer",
  "UI/UX Designer",
  "Mobile App Developer",
  "Project Manager",
  "QA Engineer",
  "Cloud Engineer",
  "Machine Learning Engineer",
];

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const currentSelectionWatch = watch("currentSelection");
  const [currentSelection, setCurrentSelection] = useState("Company");
  const [showModal, setShowModal] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (selection) => {
    setCurrentSelection(selection);
  };

  const onSubmit = (data) => {
    if (currentSelection === "Company" && !data.companyName) {
      setError("companyName", {
        type: "required",
        message: "Company Name is required",
      });
      return;
    }
    console.log(data);
    setShowModal(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setLoadingProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
        setRedirecting(true); // Set redirecting to true
        setTimeout(() => {
          reset();
          setRedirecting(false); // Set redirecting back to false after a delay
          setShowModal(false); // Hide the modal after the redirecting text has been displayed
          navigate("/dashboard");
        }, 2000);
      }
    }, 500);
  };

  useEffect(() => {
    if (currentSelectionWatch === "Company") {
      register("companyName", {
        required: "Company Name is required",
      });
    } else {
      setValue("companyName", "");
    }
  }, [currentSelectionWatch, register, setValue]);

  return (
    <section className="signupform">
      <div className="">
        <div className="signup-header">
          <h1>Sign up </h1>
        </div>
      </div>
      <div className="toggle-container">
        <button
          onClick={() => handleToggle("Company")}
          className={`company-button ${
            currentSelection === "Company" ? "active" : ""
          }`}
        >
          Company
        </button>
        <button
          onClick={() => handleToggle("Talent")}
          className={`talent-button ${
            currentSelection === "Talent" ? "active" : ""
          }`}
        >
          Talent
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            id="mobile"
            type="text"
            {...register("mobile")}
            placeholder="Enter your mobile number"
          />
          {errors.mobile && <p className="error">{errors.mobile.message}</p>}
        </div>
        {currentSelection === "Company" && (
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              type="text"
              {...register("companyName", {
                required:
                  currentSelection === "Company" && "Company Name is required",
              })}
              placeholder="Enter your company name"
            />
            {errors.companyName && (
              <p className="error">{errors.companyName.message}</p>
            )}
          </div>
        )}
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            autoComplete="new-password"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="category" className="select-label">
            Select Category
          </label>
          <CustomSelect
            options={jobCategories.map((category) => ({
              value: category,
              label: category,
            }))}
            onSelectChange={(option) => setValue("category", option)}
            value={watch("category")}
            name="category"
            placeholder="Select Category"
          />
          {errors.category && (
            <p className="error">{errors.category.message}</p>
          )}
        </div>
        <button type="submit" className="submit-button">
          Sign up
        </button>

        <div className="account-exists d-flex justify-between align-center">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Account created successfully!</h2>
            <div className="loading-bar">
              <div
                className="loading-progress"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            {redirecting && <p>Redirecting to dashboard...</p>}
          </div>
        </div>
      )}
    </section>
  );
};

export default Signup;
