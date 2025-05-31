// AdminLayout.jsx
import { useNavigate } from "react-router-dom";
// https://www.youtube.com/watch?v=zKlpiQvPKHI  login authu video notes
// github link: https://github.com/the-debug-arena/login-registration/blob/304e8645f78d8201ace3602a6ce526b08b2c6806/src/components/ProtectedRoute.js
function AdminLayout() {
  const navigate = useNavigate();


  return (
    <div>
      <header>
        <h1>Admin Panel</h1>
        <button>Logout</button>
      </header>
    </div>
  );
}

export default AdminLayout;
