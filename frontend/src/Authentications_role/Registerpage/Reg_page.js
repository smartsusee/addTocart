import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authaxios } from "../../AuthAxios/Auth";
import { Bounce, toast } from "react-toastify";

const RegPage = () => {
  const [details, setdetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState("");
  // const [secretKey, setSecretKey] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let regData = {
      name: details.name,
      email: details.email,
      password: details.password,
    };
    let emailValidate = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let passwordValidate =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (
      regData.email === "" ||
      regData.password === "" ||
      regData.name === ""
    ) {
      toast.error(" Please fill all the fields!", {
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
      return;
    }
    if (!emailValidate.test(details.email)) {
      toast.error("Please enter a valid Gmail address!", {
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
      return;
    } else if (!passwordValidate.test(details.password)) {
      toast.error("Please enter a valid password.!", {
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
      return;
    }
    if (userType === "Admin") {
      alert("Invalid Admin");
    } else {
      authaxios
        .post("/RegPost", regData)
        .then((res) => {
          console.log(res.data);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
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
              // onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label> Name</label>
          <input
            type="text"
            value={details.name}
            placeholder=" name"
            onChange={(e) => setdetails({ ...details, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            value={details.email}
            type="text"
            placeholder="Enter email"
            onChange={(e) => setdetails({ ...details, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={details.password}
            onChange={(e) =>
              setdetails({ ...details, password: e.target.value })
            }
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
