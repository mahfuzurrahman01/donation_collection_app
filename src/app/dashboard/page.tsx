"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axios from "axios";
const page = () => {
  const [role, setRole] = useState<string>();
  const token: any = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.get(
          "http://localhost:5000/checkRole",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.data.ok) {
          console.log(response);
          setRole(response.data.userInfo.role);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div>
      <h1>This is dashboard for {role}</h1>
    </div>
  );
};

export default page;
