import React, { Component, useState } from "react";
import { Navigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    let objData = {
      email: email,
      password: password,
    };

    if (
      objData.email === "Admin@gmail.com" &&
      objData.password === "Admin@123"
    ) {
      window.sessionStorage.setItem("userType", "Admin");
      window.sessionStorage.setItem("loggedIn", true);
      return (window.location.href = "../Admin/AdminDashboard.js");
    } else if (
      objData.email === "User@gmail.com" &&
      objData.password === "User@123"
    ) {
      window.sessionStorage.setItem("userType", "User");
      window.sessionStorage.setItem("loggedIn", true);
      return (window.location.href = "../User/UserDashboard.js");
    } else {
      alert("Invalid email or password");
      return;
    }
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
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
