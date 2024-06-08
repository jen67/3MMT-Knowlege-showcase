// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";

// const useFetchUserName = () => {
//   const [userName, setUserName] = useState("");
//   const token = Cookies.get("auth_token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         let data = await response.json();
//         if (typeof data === "string") {
//           data = JSON.parse(data);
//         }

//         if (data.name) setUserName(data.name);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchData();
//   }, [token]);

//   return userName;
// };

// export default useFetchUserName;
