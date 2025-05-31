import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegPage = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if (userType === "Admin" && secretKey !== "AdarshT") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();
      console.log("user");

      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div
          className="user-type"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "150px" }}>
            <label>
              <input
                type="radio"
                name="UserType"
                value="User"
                onChange={(e) => setUserType(e.target.value)}
              />{" "}
              User
            </label>
            <label>
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => setUserType(e.target.value)}
              />{" "}
              Admin
            </label>
          </div>
        </div>

        {userType === "Admin" && (
          <div className="form-group">
            <label>Secret Key</label>
            <input
              type="text"
              placeholder="Secret Key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>

        <p className="login-link">
          Already registered? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegPage;
