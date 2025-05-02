import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext";
import NavDrawer from "../components/NavDrawer/navDrawer";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <NavDrawer>
      <Outlet />
    </NavDrawer>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;