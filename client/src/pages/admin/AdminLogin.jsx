import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const API_URL =
  "https://rc-rd-frames-1.onrender.com/api/admin/login";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save JWT
      localStorage.setItem("adminToken", data.token);

      // Save admin information
      localStorage.setItem("adminData", JSON.stringify(data.admin));

      // Redirect
      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-background"></div>

      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="admin-logo">
          <span>RC</span>
          <small>&</small>
          <span>RD</span>

          <p>FRAMES</p>
        </div>

        <div className="admin-login-heading">
          <span>SECURE ACCESS</span>

          <h1>
            ADMIN
            <br />
            <em>LOGIN.</em>
          </h1>

          <p>Sign in to manage bookings and customer messages.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-email">EMAIL</label>

            <div className="admin-input-wrapper">
              <Mail size={18} />

              <input
                id="admin-email"
                type="email"
                name="email"
                placeholder="admin@rcandrframes.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">PASSWORD</label>

            <div className="admin-input-wrapper">
              <Lock size={18} />

              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              className="admin-login-error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="spinner" size={18} />
                SIGNING IN...
              </>
            ) : (
              <>
                LOGIN
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <span>RC & RD FRAMES</span>
          <span>ADMIN PANEL</span>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;