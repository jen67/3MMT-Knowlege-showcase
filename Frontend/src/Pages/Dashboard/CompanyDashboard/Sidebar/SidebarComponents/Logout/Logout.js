import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [logoutError, setLogoutError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Call the logout API
    fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include", // This is required to include the cookie in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }

        // Redirect the user to the home page
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error", error);
        setLogoutError(error.message);
      });
  }, [navigate]);

  if (logoutError) {
    return <div>Error logging out: {logoutError}</div>;
  }

  return null;
};

export default Logout;
