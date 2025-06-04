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
import AdminDashboard from "../Admin/AdminDashboard";
import ProtectedRoute from "./ProdectedRoutes";
import Navbar from "../../assets/Pages/Navbar/Navbar";
import PieAdminDashboard from "../pages/Chart/PieChart";
import LineChart from "../pages/Chart/LineChart";
import BarChart from "../pages/Chart/BarChart";
import AdminProductAddPage from "../../assets/Pages/ProductAddPage/ProductAddPage";
import ViewProduct from "../../assets/Pages/ViewProduct/ViewProduct";

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
                {/* products change user page  */}
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDashboard />} />

                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                {/* admin page  */}
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/pieChart" element={<PieAdminDashboard />} />
                <Route path="/LineChart" element={<LineChart />} />
                <Route path="/BarChart" element={<BarChart />} />
                <Route
                  path="/AdminProductCreate"
                  element={<AdminProductAddPage />}
                />
                <Route path="/viewProduct" element={<ViewProduct />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />
                <Route path="/user" element={<Navigate to="/" />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </>
            )}
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
