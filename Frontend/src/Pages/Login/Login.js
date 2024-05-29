import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import "../Signup/Signup.css";
import CustomSelect from "../../Components/Custom/CustomSelect";
import "../../Components/Custom/CustomSelect.css";
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
  console.log(data);

  // Send a POST request to the backend API
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
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData); // Log the server response

      if (responseData.success) {
        if (data.accountType === "Company") {
          navigate("/CompanyDashboard");
        } else {
          navigate("/TalentDashboard");
        }
      } else {
        // Show an alert with the error message
        alert("Login failed: " + responseData.message);
      }
    })
    .catch((error) => {
      // Show an alert with the error message
      alert("Error: " + error);
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
        <button type="submit" className="submit-button">
          Login
        </button>
        <div className="account-exists d-flex  align-center">
          <p>Don't have an account?</p>
          <Link to="/signup" className="signuplink">Create one</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
