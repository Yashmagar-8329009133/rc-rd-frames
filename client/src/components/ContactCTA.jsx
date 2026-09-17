import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const BOOKING_API = "http://localhost:5000/api/bookings";
const CONTACT_API = "http://localhost:5000/api/contact";

function ContactCTA() {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    eventDate: "",
    message: "",
  });

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const [bookingStatus, setBookingStatus] = useState({
    type: "",
    message: "",
  });

  const [contactStatus, setContactStatus] = useState({
    type: "",
    message: "",
  });

  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setBookingData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setContactData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    setBookingStatus({
      type: "",
      message: "",
    });

    setBookingLoading(true);

    try {
      const response = await fetch(BOOKING_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit booking.");
      }

      setBookingStatus({
        type: "success",
        message:
          "Your booking request has been submitted successfully. We'll get back to you soon.",
      });

      setBookingData({
        name: "",
        email: "",
        phone: "",
        service: "",
        eventDate: "",
        message: "",
      });
    } catch (error) {
      setBookingStatus({
        type: "error",
        message:
          error.message ||
          "Unable to submit your booking. Please try again.",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    setContactStatus({
      type: "",
      message: "",
    });

    setContactLoading(true);

    try {
      const response = await fetch(CONTACT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setContactStatus({
        type: "success",
        message:
          "Your message has been sent successfully. We'll contact you soon.",
      });

      setContactData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        message:
          error.message ||
          "Unable to send your message. Please try again.",
      });
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-background">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt=""
        />
      </div>

      <div className="contact-overlay"></div>

      <div className="container contact-content">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">LET'S CREATE TOGETHER</span>

          <h2>
            LET'S CREATE
            <br />
            SOMETHING <em>MEMORABLE.</em>
          </h2>

          <p>
            Have a shoot in mind? Tell us about your idea and
            let's turn it into something worth remembering.
          </p>
        </motion.div>

        {/* BOOKING FORM */}

        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="form-heading">
            <span className="eyebrow">BOOK A SHOOT</span>

            <h3>
              LET'S PLAN
              <br />
              YOUR <em>SESSION.</em>
            </h3>
          </div>

          <form
            className="booking-form"
            onSubmit={handleBookingSubmit}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="booking-name">
                  FULL NAME *
                </label>

                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={bookingData.name}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="booking-email">
                  EMAIL *
                </label>

                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={bookingData.email}
                  onChange={handleBookingChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="booking-phone">
                  PHONE *
                </label>

                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={bookingData.phone}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="booking-service">
                  SERVICE *
                </label>

                <select
                  id="booking-service"
                  name="service"
                  value={bookingData.service}
                  onChange={handleBookingChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Photography">
                    Photography
                  </option>
                  <option value="Reels Shoot">
                    Reels Shoot
                  </option>
                  <option value="Creative Content">
                    Creative Content
                  </option>
                  <option value="Decoration">
                    Decoration
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="booking-date">
                SHOOT / EVENT DATE
              </label>

              <input
                id="booking-date"
                name="eventDate"
                type="date"
                value={bookingData.eventDate}
                onChange={handleBookingChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="booking-message">
                TELL US ABOUT YOUR SHOOT
              </label>

              <textarea
                id="booking-message"
                name="message"
                rows="5"
                placeholder="Tell us about your event, shoot or creative idea..."
                value={bookingData.message}
                onChange={handleBookingChange}
              />
            </div>

            {bookingStatus.message && (
              <motion.div
                className={`form-status ${bookingStatus.type}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {bookingStatus.type === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}

                <span>{bookingStatus.message}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="primary-button booking-submit"
              disabled={bookingLoading}
            >
              {bookingLoading ? (
                <>
                  <Loader2 className="spinner" size={18} />
                  Sending Request...
                </>
              ) : (
                <>
                  Send Booking Request
                  <ArrowUpRight size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* CONTACT FORM */}

        <motion.div
          className="contact-form-wrapper contact-message-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className="form-heading">
            <span className="eyebrow">GET IN TOUCH</span>

            <h3>
              HAVE A
              <br />
              <em>QUESTION?</em>
            </h3>

            <p>
              Not ready to book? Send us a message and
              we'll be happy to help.
            </p>
          </div>

          <form
            className="booking-form"
            onSubmit={handleContactSubmit}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">
                  FULL NAME *
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={contactData.name}
                  onChange={handleContactChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">
                  EMAIL *
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-phone">
                PHONE
              </label>

              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={contactData.phone}
                onChange={handleContactChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">
                MESSAGE *
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Write your message..."
                value={contactData.message}
                onChange={handleContactChange}
                required
              />
            </div>

            {contactStatus.message && (
              <motion.div
                className={`form-status ${contactStatus.type}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {contactStatus.type === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}

                <span>{contactStatus.message}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="primary-button booking-submit"
              disabled={contactLoading}
            >
              {contactLoading ? (
                <>
                  <Loader2 className="spinner" size={18} />
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowUpRight size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactCTA;