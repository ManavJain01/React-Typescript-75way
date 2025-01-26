import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PublicRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  isAuthenticated,
  redirectPath = "/",
}) => {
  return isAuthenticated ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

export default PublicRoute;
