import React from "react";

const Userpage2 = () => {
  return (
    <div>
      <h1>User Page 2</h1>
      <p>
        This is the second user page. Here you can manage additional user
        settings and preferences.
      </p>
      {/* Add more user functionalities here */}
      <button onClick={() => alert("Feature coming soon!")}>
        Update Profile
      </button>
      <button onClick={() => alert("Feature coming soon!")}>
        Change Password
      </button>
    </div>
  );
};

export default Userpage2;
