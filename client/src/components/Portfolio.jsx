import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const portfolio = [
  {
    category: "Wedding Photography",
    title: "Wedding Moments",
    image: "/works/photography/wed1.jpeg",
  },
  {
    category: "Wedding Photography",
    title: "Beautiful Celebration",
    image: "/works/photography/wed2.jpeg",
  },
  {
    category: "Wedding Photography",
    title: "Forever Together",
    image: "/works/photography/wed3.jpeg",
  },
  {
    category: "Wedding Photography",
    title: "Love & Celebration",
    image: "/works/photography/wed4.jpeg",
  },
  {
    category: "Wedding Photography",
    title: "Timeless Memories",
    image: "/works/photography/wed5.jpeg",
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
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
              />

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