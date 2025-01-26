import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RoleAuthProps {
  isAuthenticated: boolean;
  userRoles: string[]; // User's roles (e.g., ['admin', 'user'])
  allowedRoles: string[]; // Roles allowed to access this route
  redirectPath?: string;
}

const RoleAuthRoute: React.FC<RoleAuthProps> = ({
  isAuthenticated,
  userRoles,
  allowedRoles,
  redirectPath = "/", // Default redirect path for unauthorized users
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  return hasAccess ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default RoleAuthRoute;
