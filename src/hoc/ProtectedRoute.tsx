import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

import { useAuth } from "../context/Auth";

const ProtectedRoute = () => {
  const { userId, loading } = useAuth();

  // If no userId, redirect to login
  if (!loading && !userId) {
    return <Navigate to="/login" replace />;
  }

  // Else render child routes/components
  return <Outlet />;
};

export default ProtectedRoute;
