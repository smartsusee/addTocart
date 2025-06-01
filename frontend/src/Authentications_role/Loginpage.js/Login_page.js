import React, { Component, useState } from "react";
import { Navigate } from "react-router-dom";
import { authaxios } from "../../AuthAxios/Auth";
import { jwtDecode } from "jwt-decode";
import { Bounce, toast } from "react-toastify";

export default function Login() {
  const [data, setadata] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    authaxios
      .post("/Login", { email: data.email, password: data.password })
      .then((res) => {
        let token = res.data.token;
        if (!token) {
         toast.error("token not found, please check your credentials", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
          return ;
        }
        if (token) {
          const decoded = jwtDecode(token);

          if (decoded.role === "admin") {
            window.sessionStorage.setItem("userType", "Admin");
            window.sessionStorage.setItem("loggedIn", true);
            return (window.location.href = "../Admin/AdminDashboard.js");
          } else {
            window.sessionStorage.setItem("userType", "User");
            window.sessionStorage.setItem("loggedIn", true);
            return (window.location.href = "../User/UserDashboard.js");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => setadata({ ...data, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={data.password}
            placeholder="Enter password"
            onChange={(e) => setadata({ ...data, password: e.target.value })}
            required
          />
        </div>

        <div className="remember-me">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>

        <p className="register-link">
          Not registered? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}
