import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  //check if user is login in
  const userLogin = useSelector(state => state?.users?.userAuth);
  return userLogin? children: <Navigate to='/' />
};
export default ProtectedRoute;