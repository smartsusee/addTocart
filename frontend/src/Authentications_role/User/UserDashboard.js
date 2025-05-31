import React from "react";

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>
        Welcome to the user dashboard. Here you can view your profile, manage
        your settings, and access user-specific features.
      </p>
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
  );
};

export default UserDashboard;
