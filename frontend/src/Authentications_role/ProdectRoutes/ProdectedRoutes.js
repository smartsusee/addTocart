import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = window.sessionStorage.getItem("loggedIn");

  return JSON.parse(isLoggedIn) === true ? <Outlet /> : <Navigate to="login" />;
}

export default ProtectedRoute;
