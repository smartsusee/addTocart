import React from "react";
import { Link } from "react-router-dom";
// import "../App.css";

function Navbar({ isLoggedIn, userType }) {
  return (
    <nav className="navbar">
      <div className="nav-list">
        {/* {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </>
        )} */}
        {isLoggedIn && userType === "Admin" ? (
        //   <div className="nav-item">
        //     <Link to="/admin-dashboard" className="nav-link">
        //       Dashboard
        //     </Link>
        //     <button
        //       onClick={() => {
        //         window.sessionStorage.clear("userType");
        //         window.sessionStorage.clear("loggedIn");
        //         window.location.href = "/login";
        //       }}
        //     >
        //       logout
        //     </button>
        //   </div>

<>
</>    ) : (
          isLoggedIn && (
            <>
              <div className="nav-item">
                <Link to="/userDetails" className="nav-link">
                  User Details
                </Link>

                <li className="nav-item">
                  <Link to="/user" className="nav-link">
                    user
                  </Link>
                </li>
                <button
                  onClick={() => {
                    window.sessionStorage.clear("userType");
                    window.sessionStorage.clear("loggedIn");
                    window.location.href = "/login";
                  }}
                >
                  logout
                </button>
              </div>
            </>
          )
        )}

        {/* <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li> */}
      </div>
    </nav>
  );
}

export default Navbar;
