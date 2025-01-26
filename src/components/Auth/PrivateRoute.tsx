import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirectPath = "/login",
}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
