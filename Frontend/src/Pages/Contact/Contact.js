import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Footer from "../../Components/Footer/Footer";
import "./Contact.css";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);

    const authToken = Cookies.get("auth_token");
    if (!authToken) {
      alert("You must be logged in to submit a query.");
      return;
    }


    // Create the payload for the API request
    const payload = {
      query: data.message,
      user: Cookies.get("auth_token") ? Cookies.get("auth_token") : null,
    };

    console.log(payload);
    

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setIsModalVisible(true);
        reset();
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert(`Error: ${error.msg}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting your query.");
    }
  };

  return (
    <>
      <section className="contact-us">
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <h1>Contact Us</h1>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              placeholder="Enter your message"
              className="textarea"
            />
            {errors.message && (
              <p className="error">{errors.message.message}</p>
            )}
          </div>
          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
        {isModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <p>
                Your message has been sent to the support team. We will get back
                to you soon.
              </p>
              <button
                onClick={() => {
                  setIsModalVisible(false);
                  reset();
                }}
                className="modal-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
