import React from "react";
import Typical from "react-typical";
import "./TermsOfService.css";

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <h1 className="termsandservice">
        <Typical
          steps={["Terms and Services for Wefind", 9000]}
          wrapper="span"
        />
      </h1>
    </div>
  );
};

export default TermsOfService;
