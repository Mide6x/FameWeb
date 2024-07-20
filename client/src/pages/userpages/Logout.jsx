import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

export const Logout = () => {
  const { logout } = useAuth(); // Ensure this matches the method name in AuthContext

  useEffect(() => {
    // Perform the logout operation
    logout();
  }, [logout]);

  // Redirect to the login page after logout
  return <Navigate to="/login" />;
};
