import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ChatInput from "./ChatInput";
import Message from "./Message";
import "./Mymessages.css"; 

const Mymessages = ({ conversationId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const userToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/messages/${conversationId}`,
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

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId, userToken]);

  const sendMessage = async (content) => {
    const newMessage = {
      content,
      sender: "You",
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          receiver_id: receiverId,
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages([...messages, { ...newMessage, ...data }]);
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
