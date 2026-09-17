import {
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

function ContactTable({
  contacts,
  onStatusChange,
}) {
  const formatDate = (date) => {
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
      : "new";
  };

  if (!contacts.length) {
    return (
      <div className="admin-empty-state">
        <MessageSquare size={40} />

        <h3>No messages yet</h3>

        <p>
          Customer contact messages will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table contact-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Message</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>
                <div className="booking-customer">
                  <div className="customer-avatar">
                    {contact.name
                      ?.charAt(0)
                      ?.toUpperCase() || "C"}
                  </div>

                  <div>
                    <strong>
                      {contact.name}
                    </strong>

                    <span>
                      {contact.email}
                    </span>
                  </div>
                </div>
              </td>

              <td>
                <div className="contact-message-preview">
                  {contact.message}
                </div>
              </td>

              <td>
                <a
                  className="contact-phone"
                  href={`tel:${contact.phone}`}
                >
                  {contact.phone || "—"}
                </a>
              </td>

              <td>
                {formatDate(contact.createdAt)}
              </td>

              <td>
                <select
                  value={contact.status}
                  className={`status-select contact-status ${getStatusClass(
                    contact.status
                  )}`}
                  onChange={(e) =>
                    onStatusChange(
                      contact._id,
                      e.target.value
                    )
                  }
                >
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Replied">
                    Replied
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;