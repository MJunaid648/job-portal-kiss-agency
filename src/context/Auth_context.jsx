import { createContext, useContext, useEffect, useState } from "react";
import { logOut } from "../API/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      const res = await logOut();
      // Clear tokens on successful logout
      if (res) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
        return res
      }
    } catch (error) {}
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token); 
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);