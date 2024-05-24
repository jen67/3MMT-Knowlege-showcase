import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

  const onSubmit = (data) => {
    console.log(data);
    setIsModalVisible(true);
    // Here you can handle the form submission, e.g., send the data to your server
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
                Your message has been sent to the WeFind support team. We will
                get back to you soon.
              </p>
              <button onClick={() => {setIsModalVisible(false); reset();}} className="modal-button">Close</button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
