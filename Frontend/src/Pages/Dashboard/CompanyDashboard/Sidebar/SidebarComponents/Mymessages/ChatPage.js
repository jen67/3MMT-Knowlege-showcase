
import React, { useState } from "react";
import ChatWrapper from "./ChatWrapper";
import UserList from "./UserList";
import "./ChatPage.css"; 
import ChatInput from "./ChatInput";

const ChatPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="chat-page">
      <ChatInput />
      <UserList onSelectUser={handleUserSelect} />
      {selectedUserId && <ChatWrapper receiverId={selectedUserId} />}
    </div>
  );
};

export default ChatPage;
