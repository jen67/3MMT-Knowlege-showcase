import React from "react";
import "./Modal.css"; // Import the CSS

const Modal = ({ message, onClose }) => (
  <div className="gmodal">
    <div className="gmodal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <p className="modal-message">{message}</p>
    </div>
  </div>
);

export default Modal;
