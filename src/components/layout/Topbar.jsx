import "../../styles/layout/topbar.css";
import axios from "axios";

function Topbar({ setIsAuthenticated }) {
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://ass-projectass-project-backend.onrender.com/api/auth/logout",
        {},
        {
          withCredentials: true, // 🔥 IMPORTANT for session cookie
        },
      );

      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="topbar">
      <div className="topbar__left">
        <h3>Dashboard</h3>
      </div>

      <div className="topbar__right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;
