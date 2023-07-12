/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";

export interface IUser {
  email?: string;
  isLoggedIn?: boolean;
}
interface IAuthInfo {
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialUser: IUser = {}; // Renamed `user` to `initialUser`
export const AuthContext = React.createContext<IAuthInfo>({
  userInfo: initialUser,
  setUserInfo: () => {},
  loading: false,
  setLoading: () => {},
});

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [userInfo, setUserInfo] = useState<IUser>({});
  const [loading, setLoading] = useState<boolean>(false);
  const authInfo: IAuthInfo = {
    userInfo,
    setUserInfo,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Store;
