import { Play, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const reels = [
  {
    title: "Wedding Stories",
    category: "EVENT REEL",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "A Day To Remember",
    category: "COUPLE REEL",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Moments In Motion",
    category: "CREATIVE REEL",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=85",
  },
];

function Reels() {
  return (
    <section className="section reels-section" id="reels">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">IN MOTION</span>
            <h2>
              MOMENTS THAT
              <br />
              <em>MOVE.</em>
            </h2>
          </div>

          <p>
            Short-form stories created to capture attention,
            emotion and everything in between.
          </p>
        </div>

        <div className="reels-grid">
          {reels.map((reel, index) => (
            <motion.div
              className="reel-card"
              key={reel.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
            >
              <img src={reel.image} alt={reel.title} />

              <div className="reel-overlay"></div>

              <div className="reel-play">
                <Play size={20} fill="currentColor" />
              </div>

              <div className="reel-info">
                <span>{reel.category}</span>
                <h3>{reel.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="reels-cta">
          <a href="#contact" className="outline-button">
            Watch More Reels
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Reels;