import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Camera,
  X,
} from "lucide-react";

function AdminSidebar({
  activePage,
  setActivePage,
  mobileOpen,
  setMobileOpen,
}) {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    window.location.href = "/admin/login";
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <aside
        className={`admin-sidebar ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">
            RC <span>&</span> RD
            <small>FRAMES</small>
          </div>

          <button
            className="admin-mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-sidebar-label">
          MANAGEMENT
        </div>

        <nav className="admin-sidebar-nav">
          <button
            className={
              activePage === "dashboard"
                ? "active"
                : ""
            }
            onClick={() => {
              setActivePage("dashboard");
              setMobileOpen(false);
            }}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button
            className={
              activePage === "bookings"
                ? "active"
                : ""
            }
            onClick={() => {
              setActivePage("bookings");
              setMobileOpen(false);
            }}
          >
            <CalendarCheck size={19} />
            Bookings
          </button>

          <button
            className={
              activePage === "messages"
                ? "active"
                : ""
            }
            onClick={() => {
              setActivePage("messages");
              setMobileOpen(false);
            }}
          >
            <MessageSquare size={19} />
            Messages
          </button>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-secure-label">
            <Camera size={15} />
            <span>SECURE ADMIN AREA</span>
          </div>

          <button
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;