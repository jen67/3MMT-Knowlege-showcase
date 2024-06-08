import React from "react";
import { useAuth } from "./Context/Authcontext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/Login" />;
  }

  return children;
};

export default ProtectedRoute;
