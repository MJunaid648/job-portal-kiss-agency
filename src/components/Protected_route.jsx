import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  if (!token) return false;
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 > Date.now();
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = isTokenValid(token);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;