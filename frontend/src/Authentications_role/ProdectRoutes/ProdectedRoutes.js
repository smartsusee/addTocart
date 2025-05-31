import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = window.sessionStorage.getItem("loggedIn");
  return isLoggedIn === "true" ? <Outlet /> : <Navigate to="login" />;
}

export default ProtectedRoute;
