import React from "react";
import "./Chat.css";

const Chat = ({ message }) => {
  return (
    <div className="message">
      <div className="message-sender">{message.sender}</div>
      <div className="message-content">{message.content}</div>
    </div>
  );
};

export default Chat;
