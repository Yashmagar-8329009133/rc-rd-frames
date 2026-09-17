import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85"
          alt="Photography"
        />
      </div>

      <div className="hero-overlay"></div>

      <div className="hero-content container">
        <motion.div
          className="hero-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span></span>
          PHOTOGRAPHY • REELS • CREATIVE CONTENT
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          WE CAPTURE
          <br />
          <em>YOUR MOMENTS.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Turning real moments into timeless frames,
          stories and unforgettable visual experiences.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <a href="#portfolio" className="primary-button">
            Explore Our Work
            <ArrowUpRight size={18} />
          </a>

          <a href="#contact" className="secondary-button">
            Book a Shoot
          </a>
        </motion.div>
      </div>

      <div className="hero-bottom">
        <div className="hero-scroll">
          <ArrowDown size={17} />
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="hero-play">
          <Play size={14} fill="currentColor" />
          <span>WATCH SHOWREEL</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;