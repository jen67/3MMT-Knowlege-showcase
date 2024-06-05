
import React from "react";
import "./Message.css"; 

const Message = ({ message }) => (
  <div className="message">
    <p>{message.content}</p>
  </div>
);

export default Message;
