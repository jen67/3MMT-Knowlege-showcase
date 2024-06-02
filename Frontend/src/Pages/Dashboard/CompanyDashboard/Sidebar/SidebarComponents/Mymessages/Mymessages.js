import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ChatInput from "./ChatInput";
import Message from "./Chat";
import "./Mymessages.css"; // Import CSS for Mymessages component

const Mymessages = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const userToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/messages/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [conversationId, userToken]);

  const sendMessage = async (content) => {
    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          receiver_id: "receiver_user_id", // Replace with actual receiver id
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages([...messages, data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default Mymessages;
