import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const portfolio = [
  {
    category: "Photography",
    title: "Timeless Moments",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
  },
  {
    category: "Events",
    title: "Celebrations",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=85",
  },
  {
    category: "Photography",
    title: "Portrait Stories",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
  },
  {
    category: "Events",
    title: "Beautiful Beginnings",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1000&q=85",
  },
];

function Portfolio() {
  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container">
        <div className="section-heading portfolio-heading">
          <div>
            <span className="eyebrow">SELECTED WORK</span>
            <h2>
              STORIES WE'VE
              <br />
              <em>CAPTURED.</em>
            </h2>
          </div>

          <a href="#contact" className="outline-button">
            View Full Portfolio
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="portfolio-grid">
          {portfolio.map((item, index) => (
            <motion.div
              className={`portfolio-item portfolio-${index + 1}`}
              key={item.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={item.image} alt={item.title} />

              <div className="portfolio-overlay">
                <span>{item.category}</span>
                <h3>{item.title}</h3>

                <div className="portfolio-arrow">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;