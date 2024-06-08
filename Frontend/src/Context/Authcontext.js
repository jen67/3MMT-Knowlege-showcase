// AuthContext.js
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = Cookies.get("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [userName, setUserName] = useState(() => Cookies.get("userName") || "");
  const [talentName, setTalentName] = useState(
    () => Cookies.get("talentName") || ""
  );
  const navigate = useNavigate();

  const updateUser = (newUserData) => {
    setUser(newUserData);
    Cookies.set("user", JSON.stringify(newUserData));
  };

  const updateUserName = (name) => {
    setUserName(name);
    Cookies.set("userName", name);
  };

  const updateTalentName = (name) => {
    setTalentName(name);
    Cookies.set("talentName", name);
  };

  const logout = () => {
    setUser(null);
    setUserName("");
    setTalentName("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userName,
        talentName,
        updateUser,
        updateUserName,
        updateTalentName,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
