import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Mymessages from "./Mymessages";

const ChatWrapper = ({ receiverId }) => {
  const [conversationId, setConversationId] = useState(null);
  const userToken = Cookies.get("auth_token");

  useEffect(() => {
    const getOrCreateConversation = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/conversations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ receiver_id: receiverId }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setConversationId(data.conversation_id);
      } catch (error) {
        console.error("Error fetching or creating conversation:", error);
      }
    };

    getOrCreateConversation();
  }, [receiverId, userToken]);

  if (!conversationId) {
    return <div>Loading...</div>;
  }

  return <Mymessages conversationId={conversationId} receiverId={receiverId} />;
};

export default ChatWrapper;
