import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  LogOut,
  X,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AdminSidebar({ activePage, setActivePage, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    navigate("/admin/login");
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="admin-mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${
          mobileOpen ? "admin-sidebar-open" : ""
        }`}
      >
        <div className="admin-sidebar-top">
          <div className="admin-sidebar-logo">
            <div className="admin-sidebar-logo-mark">
              <span>RC</span>
              <small>&</small>
              <span>RD</span>
            </div>

            <div>
              <strong>FRAMES</strong>
              <span>ADMIN PANEL</span>
            </div>
          </div>

          <button
            className="admin-sidebar-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-sidebar-divider" />

        <nav className="admin-sidebar-nav">
          <button
            className={`admin-sidebar-link ${
              activePage === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleNavigation("dashboard")}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            className={`admin-sidebar-link ${
              activePage === "bookings" ? "active" : ""
            }`}
            onClick={() => handleNavigation("bookings")}
          >
            <CalendarDays size={19} />
            <span>Bookings</span>
          </button>

          <button
            className={`admin-sidebar-link ${
              activePage === "messages" ? "active" : ""
            }`}
            onClick={() => handleNavigation("messages")}
          >
            <MessageSquare size={19} />
            <span>Messages</span>
          </button>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-profile">
            <div className="admin-profile-icon">
              <Camera size={17} />
            </div>

            <div>
              <strong>RC & RD Admin</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button
            className="admin-sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;