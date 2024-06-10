import React from "react";
import "./Tooltip.css";

const Tooltip = ({ message, isVisible }) => {
  return (
    <div className={`tooltip ${isVisible ? "visible" : ""}`}>{message}</div>
  );
};

export default Tooltip;
