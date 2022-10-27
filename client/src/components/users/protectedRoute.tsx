import React from "react";
import { Navigate } from "react-router-dom";
import { getState } from "../../redux/Hooks";

const ProtectedRoute = ({ children }) => {
  //check if user is login in
  const userLogin = getState(state => state?.auth?.token);
  return userLogin? children: <Navigate to='/' />

};
export default ProtectedRoute;