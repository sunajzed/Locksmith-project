import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const CustomerRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  // Check if the user is logged in and is a customer
  if (!accessToken || userRole !== "customer") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default CustomerRoute;
