import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../Loginpage.js/Login_page";
import RegPage from "../Registerpage/Reg_page";
import UserDashboard from "../User/UserDashboard";
import Userpage1 from "../User/Userpage1";
import AdminDashboard from "../Admin/AdminDashboard";
import ProtectedRoute from "./ProdectedRoutes";
import Navbar from "../../assets/Pages/Navbar/Navbar";

function App() {
  const isLoggedIn = window.sessionStorage.getItem("loggedIn"); // Check if logged in
  const userType = window.sessionStorage.getItem("userType");

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} />

        <Routes>
          {/* unauthorized route */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegPage />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            {userType !== "Admin" ? (
              <>
                {/* products change user  */}
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDashboard />} />
                <Route path="/user" element={<Userpage1 />} />
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />
                <Route path="/user" element={<Navigate to="/" />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </>
            )}
          </Route>

          {/* <Route path="/about" element={<About />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
