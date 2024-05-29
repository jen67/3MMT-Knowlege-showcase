import React from "react";
import images from "../../../Components/images";
import "./WhoWeAre.css";
import { useNavigate } from "react-router-dom";

const WhoWeAre = () => {
  const navigate = useNavigate();

  const styles = {
    backgroundImage: `url(${images.whoWeAre})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className="who-we-are">
      <div className="image-content" style={styles}></div>
      <div className="content">
        <h2>Who We Are</h2>
        <p>
          We're more than just a team; we're a community of dreamers and doers,
          united by a common vision to revolutionize the world of talent
          acquisition and recruitment. With a blend of creativity, expertise,
          and relentless determination, we're reshaping the future of work, one
          connection at a time.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="join-us blue-btn"
        >
          Join us today{" "}
        </button>
      </div>
    </section>
  );
};

export default WhoWeAre;
