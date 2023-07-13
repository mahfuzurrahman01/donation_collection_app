"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import { IUserInfo } from "@/Types/type";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState<IUserInfo>({} as IUserInfo);
  // this function will fetch the login user data from backend
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response: any = await axios.get("http://localhost:5000/checkRole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.ok) {
        setUserDetails(response.data.userInfo);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid]);
  
  return (
    <div>
 
        <div>
          <h1>Name: {userDetails?.name}</h1>
          <h1>Email: {userDetails?.email}</h1>
          <h1>Role: {userDetails?.role}</h1>
        </div>
   
    </div>
  );
};

export default page;
