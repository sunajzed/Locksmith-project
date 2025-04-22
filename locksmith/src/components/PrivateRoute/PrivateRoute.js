import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  // Check if user is authenticated and has the locksmith role
  return accessToken && userRole === "locksmith" ? <Outlet /> : <Navigate to="/login?role=locksmith" />;
};

export default PrivateRoute;
