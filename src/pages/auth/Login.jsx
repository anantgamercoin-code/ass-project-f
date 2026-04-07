import { useState } from "react";
import "../../styles/pages/login.css";
import axios from "axios";
import TopMessage from "../../components/TopMessage";

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setToast({ message: "Enter username & password", type: "warning" });
      return;
    }

    try {
      const { data } = await axios.post(
        "https://ass-projectass-project-backend.onrender.com/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      );

      setToast({
        message: data.message,
        type: "success",
      });

      setTimeout(() => {
        setIsAuthenticated(true);
      }, 1000);
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Login failed ❌",
        type: "error",
      });
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <TopMessage
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="login-card">
        {/* Logo / Title */}
        <div className="login-header">
          <h1>Admin Panel</h1>
          <p>Login to manage your system</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="admin123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>Demo: admin123 / 123456</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
