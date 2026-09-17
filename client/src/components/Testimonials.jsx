import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "The team made us feel completely comfortable and captured moments we didn't even notice. The final photos were beautiful.",
    name: "Client Name",
    type: "Photography Client",
  },
  {
    text: "Our reels turned out amazing. The editing, creativity and overall experience were exactly what we wanted.",
    name: "Client Name",
    type: "Reels Client",
  },
  {
    text: "Professional, creative and easy to work with. Every frame felt natural and beautifully captured.",
    name: "Client Name",
    type: "Event Client",
  },
];

function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="testimonials-title">
          <span className="eyebrow">CLIENT LOVE</span>

          <h2>
            STORIES FROM
            <br />
            <em>OUR CLIENTS.</em>
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <motion.article
              className="testimonial-card"
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} fill="currentColor" />
                ))}
              </div>

              <p>"{item.text}"</p>

              <div>
                <strong>{item.name}</strong>
                <span>{item.type}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;