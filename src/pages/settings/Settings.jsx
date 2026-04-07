import { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";

import "../../styles/pages/settings.css";
import TopMessage from "../../components/TopMessage";

export default function Settings({ setPage, setIsAuthenticated }) {
  const [form, setForm] = useState({
    oldUsername: "",
    oldPassword: "",
    newUsername: "",
    newPassword: "",
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.oldUsername || !form.oldPassword) {
      setToast({ message: "Enter old credentials", type: "warning" });
      return;
    }

    if (!form.newUsername || !form.newPassword) {
      setToast({ message: "Enter new credentials", type: "warning" });
      return;
    }

    try {
      const { data } = await axios.post(
        "https://ass-projectass-project-backend.onrender.com/api/auth/update-password",
        {
          username: form.oldUsername,
          oldPassword: form.oldPassword,
          newUsername: form.newUsername,
          newPassword: form.newPassword,
        },
        {
          withCredentials: true,
        },
      );

      setToast({
        message: data.message || "Updated successfully ✅",
        type: "success",
      });

      setForm({
        oldUsername: "",
        oldPassword: "",
        newUsername: "",
        newPassword: "",
      });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Update failed ❌",
        type: "error",
      });
      console.log(err);
    }
  };

  return (
    <Layout
      setPage={setPage}
      setIsAuthenticated={setIsAuthenticated}
      activePage="settings"
    >
      <TopMessage
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="settings-container">
        <div className="settings-card">
          <h2>Account Settings</h2>
          <p className="subtitle">Update your login credentials securely</p>

          <form onSubmit={handleSubmit}>
            {/* OLD */}
            <div className="section">
              <h4>Current Credentials</h4>

              <div className="input-group">
                <label>Old Username</label>
                <input
                  type="text"
                  name="oldUsername"
                  placeholder="Enter current username"
                  value={form.oldUsername}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Old Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="oldPassword"
                    placeholder="Enter current password"
                    value={form.oldPassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
              </div>
            </div>

            {/* NEW */}
            <div className="section">
              <h4>New Credentials</h4>

              <div className="input-group">
                <label>New Username</label>
                <input
                  type="text"
                  name="newUsername"
                  placeholder="Enter new username"
                  value={form.newUsername}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>New Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    value={form.newPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button className="save-btn" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
