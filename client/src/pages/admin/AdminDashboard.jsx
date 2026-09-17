import { useEffect, useMemo, useState } from "react";
import {
  Menu,
  Bell,
  CalendarDays,
  Camera,
  Clock3,
  CheckCircle2,
  CircleX,
  MessageSquare,
  Users,
  ArrowUpRight,
  RefreshCw,
  Eye,
  X,
  Mail,
  Phone,
  Calendar,
  BriefcaseBusiness,
  FileText,
  Loader2,
  AlertCircle,
  Search,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import AdminSidebar from "../../components/admin/AdminSidebar";

const API_URL = import.meta.env.VITE_API_URL;

const BOOKINGS_API = `${API_URL}/api/bookings`;
const CONTACT_API = `${API_URL}/api/contact`;

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);

  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const [bookingError, setBookingError] = useState("");
  const [messageError, setMessageError] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [updatingBooking, setUpdatingBooking] = useState(false);
  const [updatingMessageId, setUpdatingMessageId] = useState(null);

  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingFilter, setBookingFilter] = useState("All");

  const [messageSearch, setMessageSearch] = useState("");
  const [messageFilter, setMessageFilter] = useState("All");

  const adminData = JSON.parse(
    localStorage.getItem("adminData") || "{}"
  );

  /*
    Get fresh token every time.

    This is better than storing the token once because
    the token may change after login.
  */
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  /*
    Handle expired / invalid JWT.
  */
  const handleUnauthorized = (response) => {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");

      window.location.href = "/admin/login";

      return true;
    }

    return false;
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    window.location.href = "/admin/login";
  };

  /* =========================
     FETCH BOOKINGS
  ========================= */

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      setBookingError("");

      const response = await fetch(BOOKINGS_API, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (handleUnauthorized(response)) {
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load bookings"
        );
      }

      setBookings(data.bookings || []);
    } catch (error) {
      setBookingError(
        error.message || "Unable to load bookings."
      );
    } finally {
      setLoadingBookings(false);
    }
  };

  /* =========================
     FETCH MESSAGES
  ========================= */

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      setMessageError("");

      const response = await fetch(CONTACT_API, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (handleUnauthorized(response)) {
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load messages"
        );
      }

      setMessages(
        data.contacts ||
          data.messages ||
          []
      );
    } catch (error) {
      setMessageError(
        error.message || "Unable to load messages."
      );
    } finally {
      setLoadingMessages(false);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    fetchBookings();
    fetchMessages();
  }, []);

  /* =========================
     STATISTICS
  ========================= */

  const statistics = useMemo(() => {
    return {
      total: bookings.length,

      pending: bookings.filter(
        (booking) => booking.status === "Pending"
      ).length,

      confirmed: bookings.filter(
        (booking) => booking.status === "Confirmed"
      ).length,

      completed: bookings.filter(
        (booking) => booking.status === "Completed"
      ).length,

      cancelled: bookings.filter(
        (booking) => booking.status === "Cancelled"
      ).length,

      messages: messages.length,

      newMessages: messages.filter(
        (message) =>
          !message.status ||
          message.status === "New"
      ).length,
    };
  }, [bookings, messages]);

  /* =========================
     RECENT BOOKINGS
  ========================= */

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 6);
  }, [bookings]);

  /* =========================
     FILTER BOOKINGS
  ========================= */

  const filteredBookings = useMemo(() => {
    const search = bookingSearch
      .trim()
      .toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !search ||
        booking.name
          ?.toLowerCase()
          .includes(search) ||
        booking.email
          ?.toLowerCase()
          .includes(search) ||
        booking.phone
          ?.toLowerCase()
          .includes(search) ||
        booking.service
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        bookingFilter === "All" ||
        booking.status === bookingFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    bookings,
    bookingSearch,
    bookingFilter,
  ]);

  /* =========================
     FILTER MESSAGES
  ========================= */

  const filteredMessages = useMemo(() => {
    const search = messageSearch
      .trim()
      .toLowerCase();

    return messages.filter((message) => {
      const matchesSearch =
        !search ||
        message.name
          ?.toLowerCase()
          .includes(search) ||
        message.email
          ?.toLowerCase()
          .includes(search) ||
        message.phone
          ?.toLowerCase()
          .includes(search) ||
        message.message
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        messageFilter === "All" ||
        (message.status || "New") ===
          messageFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    messages,
    messageSearch,
    messageFilter,
  ]);

  /* =========================
     RECENT MESSAGES
  ========================= */

  const recentMessages = useMemo(() => {
    return [...messages]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 5);
  }, [messages]);

  /* =========================
     DATE FORMAT
  ========================= */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  /* =========================
     UPDATE BOOKING STATUS
  ========================= */


const updateBookingStatus = async (bookingId, status) => {
  try {
    setUpdatingBooking(true);

    const response = await fetch(
      `${BOOKINGS_API}/${bookingId}`,
      {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      }
    );

    if (handleUnauthorized(response)) {
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to update booking"
      );
    }

    if (!data.booking) {
      throw new Error("Updated booking data was not returned");
    }

    // Update booking in dashboard immediately
    setBookings((previous) =>
      previous.map((booking) =>
        booking._id === bookingId
          ? data.booking
          : booking
      )
    );

    // Update currently opened booking modal
    setSelectedBooking(data.booking);
  } catch (error) {
    alert(
      error.message || "Unable to update booking."
    );
  } finally {
    setUpdatingBooking(false);
  }
};
  /* =========================
     UPDATE MESSAGE STATUS
  ========================= */

  const updateMessageStatus = async (
    messageId,
    status
  ) => {
    try {
      setUpdatingMessageId(messageId);

      const response = await fetch(
        `${CONTACT_API}/${messageId}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      if (handleUnauthorized(response)) {
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update message"
        );
      }

      if (!data.contact) {
        throw new Error(
          "Updated message data was not returned"
        );
      }

      setMessages((previous) =>
        previous.map((message) =>
          message._id === messageId
            ? data.contact
            : message
        )
      );
    } catch (error) {
      alert(
        error.message ||
          "Unable to update message."
      );
    } finally {
      setUpdatingMessageId(null);
    }
  };

  /* =========================
     REFRESH
  ========================= */

  const refreshDashboard = () => {
    fetchBookings();
    fetchMessages();
  };

  /* =========================
     STATUS CLASS
  ========================= */

  const getStatusClass = (status) => {
    return (
      status?.toLowerCase() ||
      "pending"
    );
  };

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}

      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* MAIN */}

      <main className="admin-main">

        {/* TOPBAR */}

        <header className="admin-topbar">

          <div className="admin-topbar-left">

            <button
              className="admin-menu-button"
              onClick={() =>
                setMobileOpen(true)
              }
            >
              <Menu size={22} />
            </button>

            <div>
              <span className="admin-topbar-eyebrow">
                RC & RD FRAMES
              </span>

              <h1>
                {activePage ===
                "dashboard"
                  ? "Dashboard"
                  : activePage ===
                    "bookings"
                  ? "Bookings"
                  : "Messages"}
              </h1>
            </div>

          </div>

          <div className="admin-topbar-right">

            <button
              className="admin-refresh-button"
              onClick={refreshDashboard}
              title="Refresh dashboard"
            >
              <RefreshCw size={18} />
            </button>

            <button
              className="admin-notification"
              onClick={() =>
                setActivePage("messages")
              }
              title="Messages"
            >
              <Bell size={18} />

              {statistics.newMessages >
                0 && (
                <span>
                  {statistics.newMessages}
                </span>
              )}
            </button>

            <div className="admin-topbar-user">

              <div className="admin-user-avatar">
                {(adminData.name ||
                  "A")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong>
                  {adminData.name ||
                    "Admin"}
                </strong>

                <span>
                  Administrator
                </span>
              </div>

            </div>

            <button
              className="admin-logout-button"
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={17} />
              <span>Logout</span>
            </button>

          </div>
        </header>

        {/* CONTENT */}

        <div className="admin-content">

          {/* =====================
              DASHBOARD
          ===================== */}

          {activePage ===
            "dashboard" && (
            <>

              {/* WELCOME */}

              <motion.section
                className="admin-welcome"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >

                <div>

                  <span>
                    WELCOME BACK
                  </span>

                  <h2>
                    GOOD AFTERNOON,
                    <br />
                    <em>
                      {(
                        adminData.name ||
                        "ADMIN"
                      ).toUpperCase()}
                      .
                    </em>
                  </h2>

                  <p>
                    Manage your
                    photography business,
                    bookings and customer
                    messages from one
                    place.
                  </p>

                </div>

                <div className="admin-welcome-decoration">
                  <CameraIcon />
                </div>

              </motion.section>

              {/* STATISTICS */}

              <section className="admin-stat-grid">

                <StatCard
                  title="Total Bookings"
                  value={
                    statistics.total
                  }
                  icon={
                    <CalendarDays
                      size={21}
                    />
                  }
                  description="All booking requests"
                  className="primary"
                />

                <StatCard
                  title="Pending"
                  value={
                    statistics.pending
                  }
                  icon={
                    <Clock3
                      size={21}
                    />
                  }
                  description="Awaiting confirmation"
                />

                <StatCard
                  title="Confirmed"
                  value={
                    statistics.confirmed
                  }
                  icon={
                    <CheckCircle2
                      size={21}
                    />
                  }
                  description="Confirmed bookings"
                />

                <StatCard
                  title="Completed"
                  value={
                    statistics.completed
                  }
                  icon={
                    <CheckCircle2
                      size={21}
                    />
                  }
                  description="Finished sessions"
                />

                <StatCard
                  title="Cancelled"
                  value={
                    statistics.cancelled
                  }
                  icon={
                    <CircleX
                      size={21}
                    />
                  }
                  description="Cancelled bookings"
                />

                <StatCard
                  title="Messages"
                  value={
                    statistics.messages
                  }
                  icon={
                    <MessageSquare
                      size={21}
                    />
                  }
                  description={`${statistics.newMessages} new messages`}
                />

              </section>

              {/* RECENT BOOKINGS */}

              <section className="admin-panel">

                <PanelHeader
                  eyebrow="BOOKING MANAGEMENT"
                  title="Recent Bookings"
                  icon={
                    <CalendarDays
                      size={18}
                    />
                  }
                  actionText="View All"
                  onAction={() =>
                    setActivePage(
                      "bookings"
                    )
                  }
                />

                {bookingError ? (
                  <ErrorBox
                    message={
                      bookingError
                    }
                  />
                ) : loadingBookings ? (
                  <LoadingBox
                    text="Loading bookings..."
                  />
                ) : recentBookings.length ===
                  0 ? (
                  <EmptyBox
                    text="No bookings available yet."
                  />
                ) : (
                  <BookingTable
                    bookings={
                      recentBookings
                    }
                    formatDate={
                      formatDate
                    }
                    getStatusClass={
                      getStatusClass
                    }
                    onView={
                      setSelectedBooking
                    }
                  />
                )}

              </section>

              {/* RECENT MESSAGES */}

              <section className="admin-panel">

                <PanelHeader
                  eyebrow="CUSTOMER COMMUNICATION"
                  title="Recent Messages"
                  icon={
                    <MessageSquare
                      size={18}
                    />
                  }
                  actionText="View All"
                  onAction={() =>
                    setActivePage(
                      "messages"
                    )
                  }
                />

                {messageError ? (
                  <ErrorBox
                    message={
                      messageError
                    }
                  />
                ) : loadingMessages ? (
                  <LoadingBox
                    text="Loading messages..."
                  />
                ) : recentMessages.length ===
                  0 ? (
                  <EmptyBox
                    text="No customer messages yet."
                  />
                ) : (
                  <MessageTable
                    messages={
                      recentMessages
                    }
                    formatDate={
                      formatDate
                    }
                  />
                )}

              </section>

            </>
          )}

          {/* =====================
              BOOKINGS PAGE
          ===================== */}

          {activePage ===
            "bookings" && (
            <section className="admin-panel admin-full-panel">

              <div className="admin-filter-header">

                <div>
                  <span>
                    CUSTOMER BOOKINGS
                  </span>

                  <h3>
                    <CalendarDays
                      size={18}
                    />
                    All Bookings
                  </h3>
                </div>

                <div className="admin-filter-actions">

                  <div className="admin-search">
                    <Search size={15} />

                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={
                        bookingSearch
                      }
                      onChange={(e) =>
                        setBookingSearch(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <select
                    value={
                      bookingFilter
                    }
                    onChange={(e) =>
                      setBookingFilter(
                        e.target.value
                      )
                    }
                  >
                    <option value="All">
                      All Status
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>

                  <button
                    className="admin-panel-action"
                    onClick={
                      fetchBookings
                    }
                  >
                    <RefreshCw
                      size={15}
                    />
                    Refresh
                  </button>

                </div>

              </div>

              {!loadingBookings &&
                !bookingError && (
                  <div className="admin-result-count">
                    Showing{" "}
                    <strong>
                      {
                        filteredBookings.length
                      }
                    </strong>{" "}
                    of{" "}
                    <strong>
                      {bookings.length}
                    </strong>{" "}
                    bookings
                  </div>
                )}

              {bookingError ? (
                <ErrorBox
                  message={
                    bookingError
                  }
                />
              ) : loadingBookings ? (
                <LoadingBox
                  text="Loading bookings..."
                />
              ) : filteredBookings.length ===
                0 ? (
                <EmptyBox
                  text="No bookings match your search."
                />
              ) : (
                <BookingTable
                  bookings={
                    filteredBookings
                  }
                  formatDate={
                    formatDate
                  }
                  getStatusClass={
                    getStatusClass
                  }
                  onView={
                    setSelectedBooking
                  }
                />
              )}

            </section>
          )}

          {/* =====================
              MESSAGES PAGE
          ===================== */}

          {activePage ===
            "messages" && (
            <section className="admin-panel admin-full-panel">

              <div className="admin-filter-header">

                <div>
                  <span>
                    CUSTOMER COMMUNICATION
                  </span>

                  <h3>
                    <MessageSquare
                      size={18}
                    />
                    All Messages
                  </h3>
                </div>

                <div className="admin-filter-actions">

                  <div className="admin-search">
                    <Search size={15} />

                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={
                        messageSearch
                      }
                      onChange={(e) =>
                        setMessageSearch(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <select
                    value={
                      messageFilter
                    }
                    onChange={(e) =>
                      setMessageFilter(
                        e.target.value
                      )
                    }
                  >
                    <option value="All">
                      All Messages
                    </option>

                    <option value="New">
                      New
                    </option>

                    <option value="Read">
                      Read
                    </option>

                    <option value="Replied">
                      Replied
                    </option>
                  </select>

                  <button
                    className="admin-panel-action"
                    onClick={
                      fetchMessages
                    }
                  >
                    <RefreshCw
                      size={15}
                    />
                    Refresh
                  </button>

                </div>

              </div>

              {!loadingMessages &&
                !messageError && (
                  <div className="admin-result-count">
                    Showing{" "}
                    <strong>
                      {
                        filteredMessages.length
                      }
                    </strong>{" "}
                    of{" "}
                    <strong>
                      {messages.length}
                    </strong>{" "}
                    messages
                  </div>
                )}

              {messageError ? (
                <ErrorBox
                  message={
                    messageError
                  }
                />
              ) : loadingMessages ? (
                <LoadingBox
                  text="Loading messages..."
                />
              ) : filteredMessages.length ===
                0 ? (
                <EmptyBox
                  text="No messages match your search."
                />
              ) : (
                <MessageTable
                  messages={
                    filteredMessages
                  }
                  formatDate={
                    formatDate
                  }
                  detailed
                  onUpdateStatus={
                    updateMessageStatus
                  }
                  updatingMessageId={
                    updatingMessageId
                  }
                />
              )}

            </section>
          )}

        </div>
      </main>

      {/* BOOKING MODAL */}

      <AnimatePresence>
        {selectedBooking && (
          <BookingDetailsModal
            booking={
              selectedBooking
            }
            formatDate={
              formatDate
            }
            formatDateTime={
              formatDateTime
            }
            getStatusClass={
              getStatusClass
            }
            onClose={() =>
              setSelectedBooking(
                null
              )
            }
            onUpdateStatus={
              updateBookingStatus
            }
            updating={
              updatingBooking
            }
          />
        )}
      </AnimatePresence>

    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  title,
  value,
  icon,
  description,
  className = "",
}) {
  return (
    <motion.div
      className={`admin-stat-card ${className}`}
      whileHover={{
        y: -3,
      }}
    >

      <div className="admin-stat-top">

        <div className="admin-stat-icon">
          {icon}
        </div>

        <ArrowUpRight
          size={17}
        />

      </div>

      <div className="admin-stat-value">
        {value}
      </div>

      <div className="admin-stat-title">
        {title}
      </div>

      <div className="admin-stat-description">
        {description}
      </div>

    </motion.div>
  );
}

/* =========================
   PANEL HEADER
========================= */

function PanelHeader({
  eyebrow,
  title,
  icon,
  actionText,
  onAction,
}) {
  return (
    <div className="admin-panel-header">

      <div>
        <span>{eyebrow}</span>

        <h3>
          {icon}
          {title}
        </h3>
      </div>

      {actionText && (
        <button
          className="admin-panel-action"
          onClick={onAction}
        >
          {actionText}
          <ArrowUpRight
            size={15}
          />
        </button>
      )}

    </div>
  );
}

/* =========================
   BOOKING TABLE
========================= */

function BookingTable({
  bookings,
  formatDate,
  getStatusClass,
  onView,
}) {
  return (
    <div className="admin-table-wrapper">

      <table className="admin-table">

        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Event Date</th>
            <th>Created</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {bookings.map(
            (booking) => (
              <tr
                key={
                  booking._id
                }
              >

                <td>

                  <div className="admin-customer-cell">

                    <div className="admin-table-avatar">
                      {booking.name
                        ?.charAt(
                          0
                        )
                        .toUpperCase() ||
                        "C"}
                    </div>

                    <div>

                      <strong>
                        {booking.name ||
                          "Unknown"}
                      </strong>

                      <span>
                        {booking.email ||
                          "No email"}
                      </span>

                    </div>

                  </div>

                </td>

                <td>
                  <span className="admin-service">
                    {booking.service ||
                      "—"}
                  </span>
                </td>

                <td>
                  {formatDate(
                    booking.eventDate
                  )}
                </td>

                <td>
                  {formatDate(
                    booking.createdAt
                  )}
                </td>

                <td>

                  <span
                    className={`admin-status ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status ||
                      "Pending"}
                  </span>

                </td>

                <td>

                  <button
                    className="admin-view-button"
                    onClick={() =>
                      onView(
                        booking
                      )
                    }
                    title="View booking"
                  >
                    <Eye
                      size={16}
                    />
                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}

/* =========================
   MESSAGE TABLE
========================= */

function MessageTable({
  messages,
  formatDate,
  detailed = false,
  onUpdateStatus,
  updatingMessageId,
}) {
  return (
    <div className="admin-table-wrapper">

      <table className="admin-table">

        <thead>
          <tr>

            <th>Customer</th>

            <th>Email</th>

            {detailed && (
              <th>Phone</th>
            )}

            <th>Message</th>

            <th>Date</th>

            <th>Status</th>

            {detailed && (
              <th>Update</th>
            )}

          </tr>
        </thead>

        <tbody>

          {messages.map(
            (message) => {

              const status =
                message.status ||
                "New";

              const updating =
                updatingMessageId ===
                message._id;

              return (
                <tr
                  key={
                    message._id
                  }
                >

                  <td>
                    <strong>
                      {message.name ||
                        "Unknown"}
                    </strong>
                  </td>

                  <td>
                    {message.email ||
                      "—"}
                  </td>

                  {detailed && (
                    <td>
                      {message.phone ||
                        "—"}
                    </td>
                  )}

                  <td>
                    <div className="admin-message-preview">
                      {message.message ||
                        "—"}
                    </div>
                  </td>

                  <td>
                    {formatDate(
                      message.createdAt
                    )}
                  </td>

                  <td>

                    <span
                      className={`admin-status ${status.toLowerCase()}`}
                    >
                      {status}
                    </span>

                  </td>

                  {detailed && (
                    <td>

                      <div className="admin-message-status-buttons">

                        {[
                          "New",
                          "Read",
                          "Replied",
                        ].map(
                          (
                            nextStatus
                          ) => (
                            <button
                              key={
                                nextStatus
                              }
                              className={
                                status ===
                                nextStatus
                                  ? "active"
                                  : ""
                              }
                              disabled={
                                updating
                              }
                              onClick={() =>
                                onUpdateStatus(
                                  message._id,
                                  nextStatus
                                )
                              }
                            >

                              {updating &&
                              status ===
                                nextStatus ? (
                                <Loader2
                                  size={
                                    12
                                  }
                                  className="spinner"
                                />
                              ) : (
                                nextStatus
                              )}

                            </button>
                          )
                        )}

                      </div>

                    </td>
                  )}

                </tr>
              );
            }
          )}

        </tbody>

      </table>

    </div>
  );
}

/* =========================
   BOOKING MODAL
========================= */

function BookingDetailsModal({
  booking,
  formatDate,
  formatDateTime,
  getStatusClass,
  onClose,
  onUpdateStatus,
  updating,
}) {
  return (
    <motion.div
      className="admin-modal-overlay"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={onClose}
    >

      <motion.div
        className="admin-booking-modal"
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.98,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <div className="admin-modal-header">

          <div>

            <span>
              BOOKING DETAILS
            </span>

            <h2>
              {booking.name}
            </h2>

          </div>

          <button
            className="admin-modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <div className="admin-modal-status-row">

          <span
            className={`admin-status ${getStatusClass(
              booking.status
            )}`}
          >
            {booking.status}
          </span>

          <span>
            Created{" "}
            {formatDateTime(
              booking.createdAt
            )}
          </span>

        </div>

        <div className="admin-detail-grid">

          <DetailItem
            icon={
              <Mail size={17} />
            }
            label="EMAIL"
            value={
              booking.email
            }
          />

          <DetailItem
            icon={
              <Phone size={17} />
            }
            label="PHONE"
            value={
              booking.phone
            }
          />

          <DetailItem
            icon={
              <BriefcaseBusiness
                size={17}
              />
            }
            label="SERVICE"
            value={
              booking.service
            }
          />

          <DetailItem
            icon={
              <Calendar
                size={17}
              />
            }
            label="EVENT DATE"
            value={formatDate(
              booking.eventDate
            )}
          />

        </div>

        <div className="admin-detail-message">

          <div className="admin-detail-message-title">

            <FileText
              size={17}
            />

            <span>
              CUSTOMER MESSAGE
            </span>

          </div>

          <p>
            {booking.message ||
              "No additional message provided."}
          </p>

        </div>

        <div className="admin-status-section">

          <span>
            UPDATE BOOKING STATUS
          </span>

          <div className="admin-status-buttons">

            {(() => {
              const currentStatus =
                booking.status || "Pending";

              let availableStatuses = [];

              if (currentStatus === "Pending") {
                availableStatuses = [
                  "Confirmed",
                  "Cancelled",
                ];
              } else if (
                currentStatus === "Confirmed"
              ) {
                availableStatuses = [
                  "Completed",
                  "Cancelled",
                ];
              }

              if (
                availableStatuses.length === 0
              ) {
                return (
                  <span className="admin-status-final">
                    {currentStatus === "Completed"
                      ? "Booking completed"
                      : "Booking cancelled"}
                  </span>
                );
              }

              return availableStatuses.map(
                (status) => (
                  <button
                    key={status}
                    className={`admin-status-button ${status.toLowerCase()}`}
                    disabled={updating}
                    onClick={() =>
                      onUpdateStatus(
                        booking._id,
                        status
                      )
                    }
                  >
                    {updating ? (
                      <Loader2
                        size={15}
                        className="spinner"
                      />
                    ) : null}

                    {status}
                  </button>
                )
              );
            })()}

          </div>

        </div>

      </motion.div>

    </motion.div>
  );
}

/* =========================
   DETAIL ITEM
========================= */

function DetailItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="admin-detail-item">

      <div className="admin-detail-icon">
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value || "—"}
        </strong>

      </div>

    </div>
  );
}

/* =========================
   STATE BOXES
========================= */

function LoadingBox({ text }) {
  return (
    <div className="admin-state-box">

      <Loader2
        size={22}
        className="spinner"
      />

      <span>
        {text}
      </span>

    </div>
  );
}

function EmptyBox({ text }) {
  return (
    <div className="admin-state-box">

      <Users size={22} />

      <span>
        {text}
      </span>

    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div className="admin-state-box error">

      <AlertCircle
        size={22}
      />

      <span>
        {message}
      </span>

    </div>
  );
}

/* =========================
   CAMERA DECORATION
========================= */

function CameraIcon() {
  return (
    <div className="admin-decoration-camera">
      <CameraIconShape />
    </div>
  );
}

function CameraIconShape() {
  return (
    <div className="camera-shape">
      <div className="camera-lens"></div>
    </div>
  );
}

export default AdminDashboard;