import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, allowedRole }) => {
  const userRole = localStorage.getItem("userRole");
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken || userRole !== allowedRole) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
