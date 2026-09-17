import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85"
            alt="RC and RD Frames photography"
          />

          <div className="image-label">
            RC & RD
            <br />
            FRAMES
          </div>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">ABOUT US</span>

          <h2>
            MORE THAN
            <br />
            <em>A CAMERA.</em>
          </h2>

          <p className="about-lead">
            We believe every moment has a story worth remembering.
          </p>

          <p>
            RC & RD Frames is a creative photography and content
            production studio focused on capturing authentic moments,
            beautiful details and stories that feel real.
          </p>

          <p>
            Whether it is a special event, a personal shoot or content
            for your brand, our goal is simple — create visuals that
            you will want to watch and remember again and again.
          </p>

          <a href="#contact" className="text-button">
            Let's Work Together
            <ArrowUpRight size={18} />
          </a>

          <div className="stats">
            <div>
              <strong>100+</strong>
              <span>PROJECTS</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>CLIENTS</span>
            </div>

            <div>
              <strong>200+</strong>
              <span>REELS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;