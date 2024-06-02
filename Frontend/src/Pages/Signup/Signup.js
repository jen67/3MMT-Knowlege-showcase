import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomSelect from "../../Components/Custom/CustomSelect";
import Modal from "../../Components/Modal/Modal";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Signup.css";

// Job categories
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

// Industries categories
const industries = [
  "Information Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Remote",
  "Agriculture",
  "Automotive",
  "Aerospace",
  "Construction",
  "Energy",
  "Entertainment",
  "Fashion",
  "Food & Beverage",
  "Government",
  "Hospitality",
  "Insurance",
  "Legal",
  "Logistics & Transportation",
  "Media & Communications",
  "Mining",
  "Non-Profit",
  "Pharmaceutical",
  "Public Relations",
  "Sports",
  "Telecommunications",
  "Travel & Tourism",
  "Utilities",
  "Warehousing",
  "Waste Management",
  "Water Management",
  "Wholesale",
  "Marine & Shipping",
  "Biotechnology",
  "Consulting",
  "Design",
  "E-commerce",
  "Engineering",
  "Event Planning",
  "Human Resources",
  "Marketing",
  "Professional Services",
  "Research & Development",
  "Security",
  "Software Development",
  "Video Games",
  "Veterinary",
  "Wellness & Fitness",
];

// API utility function
const registerUser = async (payload) => {
  try {
    console.log("Payload:", payload);
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || "Registration failed");
    }

    const result = await response.json();
    
    // Save auth token in a cookie
    if (result.auth_token) {
      Cookies.set("auth_token", result.auth_token);
    }

    return result;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Schemas
const companySchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  companyName: yup.string().required("Company Name is required"),
  location: yup.string().required("Location is required"),
  industry: yup.string().required("Industry is required"),
  description: yup.string().required("Description is required"),
});

const talentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  mobile: yup.string().required("Mobile Number is required"),
  category: yup.string().required("Category is required"),
});

const Signup = () => {
  const [currentSelection, setCurrentSelection] = useState("Company");

  const schema = currentSelection === "Company" ? companySchema : talentSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState(
    "Your account is being created..."
  );

  const handleToggle = (selection) => {
    setCurrentSelection(selection);
    reset();
  };

  const onSubmit = async (data) => {
    console.log("Form data:", data);

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      is_company: currentSelection === "Company",
      ...(currentSelection === "Company" && {
        name: data.companyName,
        location: data.location,
        industry: data.industry,
        description: data.description,
      }),
      ...(currentSelection === "Talent" && {
        mobile: data.mobile,
        category: data.category,
      }),
    };

    try {
      const result = await registerUser(payload);
      if (result.msg) {
        setShowModal(true);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setLoadingProgress(progress);
          if (progress === 90) setLoadingText("Your account has been created!");
          if (progress === 100) {
            clearInterval(interval);
            setRedirecting(true);
            setTimeout(() => {
              reset();
              setRedirecting(false);
              setShowModal(false);
              navigate(
                currentSelection === "Company"
                  ? "/CompanyDashboard"
                  : "/TalentDashboard"
              );
            }, 2000);
          }
        }, 500);
      } else {
        console.log("Signup failed: " + result.msg);
        setErrorMessage("Signup failed: " + result.msg);
      }
    } catch (error) {
      console.log("Error: " + error.message);
      setErrorMessage(error.message); // Display error message
    }
  };

  return (
    <section className="signupform">
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
        <div className="signup-header">
          <h1>Sign up</h1>
        </div>

        {currentSelection === "Talent" && (
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
        )}

        {currentSelection === "Company" && (
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              type="text"
              {...register("companyName")}
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
          <>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                {...register("location")}
                placeholder="Enter your location"
              />
              {errors.location && (
                <p className="error">{errors.location.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                {...register("description")}
                placeholder="Enter your description"
              />
              {errors.description && (
                <p className="error">{errors.description.message}</p>
              )}
            </div>
          </>
        )}

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

        {currentSelection === "Talent" && (
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
        )}

        {currentSelection === "Company" && (
          <div className="form-group">
            <label htmlFor="industry" className="select-label">
              Select Industry
            </label>
            <CustomSelect
              options={industries.map((industry) => ({
                value: industry,
                label: industry,
              }))}
              onSelectChange={(option) => setValue("industry", option)}
              value={watch("industry")}
              name="industry"
              placeholder="Select Industry"
            />
            {errors.industry && (
              <p className="error">{errors.industry.message}</p>
            )}
          </div>
        )}

        <button type="submit" className="submit-button">
          Sign up
        </button>
        <div className="account-exists d-flex align-center">
          <p>Already have an account?</p>
          <Link to="/login" className="loginlink">
            Login
          </Link>
        </div>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{loadingText}</h2>
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

      {errorMessage && (
        <Modal message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </section>
  );
};

export default Signup;
