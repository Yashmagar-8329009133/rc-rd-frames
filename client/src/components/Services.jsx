import { Camera, Video, Sparkles, PartyPopper, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    icon: Camera,
    title: "Photography",
    description:
      "Authentic and timeless photography that turns your special moments into lasting memories.",
  },
  {
    number: "02",
    icon: Video,
    title: "Reels Shoots",
    description:
      "Cinematic short-form content designed to make your moments stand out on social media.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Creative Content",
    description:
      "Creative visual content for brands, events, creators and businesses.",
  },
  {
    number: "04",
    icon: PartyPopper,
    title: "Decoration",
    description:
      "Beautiful event decoration services are coming soon.",
    comingSoon: true,
  },
];

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHAT WE DO</span>
            <h2>
              SERVICES THAT
              <br />
              <em>CREATE IMPACT.</em>
            </h2>
          </div>

          <p>
            From photographs to short-form films, we create visual
            experiences that people remember.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                className={`service-card ${
                  service.comingSoon ? "coming-soon" : ""
                }`}
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
              >
                <div className="service-top">
                  <span>{service.number}</span>

                  <div className="service-icon">
                    <Icon size={24} />
                  </div>
                </div>

                {service.comingSoon && (
                  <span className="coming-label">COMING SOON</span>
                )}

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                {!service.comingSoon && (
                  <a href="#portfolio" className="service-link">
                    Explore
                    <ArrowUpRight size={17} />
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;