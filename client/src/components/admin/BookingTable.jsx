import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
} from "lucide-react";

function BookingTable({
  bookings,
  onStatusChange,
}) {
  const [expandedId, setExpandedId] = useState(null);

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatCreatedDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getStatusClass = (status) => {
    return status
      ? status.toLowerCase()
      : "pending";
  };

  if (!bookings.length) {
    return (
      <div className="admin-empty-state">
        <CalendarDays size={40} />
        <h3>No bookings found</h3>
        <p>
          Customer booking requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Event Date</th>
            <th>Submitted</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => {
            const isExpanded =
              expandedId === booking._id;

            return (
              <tr
                key={booking._id}
                className={
                  isExpanded
                    ? "booking-row-expanded"
                    : ""
                }
              >
                <td colSpan="6" className="booking-cell">
                  <div className="booking-main-row">
                    <div className="booking-customer">
                      <div className="customer-avatar">
                        {booking.name
                          ?.charAt(0)
                          ?.toUpperCase() || "C"}
                      </div>

                      <div>
                        <strong>
                          {booking.name}
                        </strong>

                        <span>
                          {booking.email}
                        </span>
                      </div>
                    </div>

                    <div className="booking-service">
                      {booking.service}
                    </div>

                    <div className="booking-date">
                      {formatDate(
                        booking.eventDate
                      )}
                    </div>

                    <div className="booking-submitted">
                      {formatCreatedDate(
                        booking.createdAt
                      )}
                    </div>

                    <div className="booking-status-control">
                      <select
                        value={booking.status}
                        className={`status-select ${getStatusClass(
                          booking.status
                        )}`}
                        onChange={(e) =>
                          onStatusChange(
                            booking._id,
                            e.target.value
                          )
                        }
                      >
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
                    </div>

                    <button
                      className="booking-expand-button"
                      onClick={() =>
                        setExpandedId(
                          isExpanded
                            ? null
                            : booking._id
                        )
                      }
                    >
                      {isExpanded ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="booking-details">
                      <div className="booking-detail-grid">
                        <div>
                          <span>PHONE</span>

                          <a
                            href={`tel:${booking.phone}`}
                          >
                            <Phone size={15} />
                            {booking.phone}
                          </a>
                        </div>

                        <div>
                          <span>EMAIL</span>

                          <a
                            href={`mailto:${booking.email}`}
                          >
                            <Mail size={15} />
                            {booking.email}
                          </a>
                        </div>

                        <div>
                          <span>EVENT DATE</span>
                          <strong>
                            {formatDate(
                              booking.eventDate
                            )}
                          </strong>
                        </div>
                      </div>

                      <div className="booking-message">
                        <span>MESSAGE</span>

                        <p>
                          {booking.message ||
                            "No message provided."}
                        </p>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BookingTable;