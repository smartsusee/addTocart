import React from "react";

const Adminpage2 = () => {
  return (
    <div>
      <h1>Admin Page 2</h1>
      <p>
        This is the second admin page. Here you can manage additional
        administrative tasks.
      </p>
      {/* Add more admin functionalities here */}
      <button onClick={() => alert("Feature coming soon!")}>
        Manage Permissions
      </button>
      <button onClick={() => alert("Feature coming soon!")}>
        View Analytics
      </button>
    </div>
  );
};

export default Adminpage2;
