
import { Play, Pause, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const reels = [
  {
    title: "Vata Poranima",
    category: "WEDDING REEL",
    video: "/reels/vataporanima.mp4",
  },
];

function Reels() {
  return (
    <section className="section reels-section" id="reels">
      <div className="container">

        {/* Heading */}
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

        {/* Reel Grid */}
        <div className="reels-grid">
          {reels.map((reel, index) => (
            <ReelCard
              key={reel.title}
              reel={reel}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
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

function ReelCard({ reel, index }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async (event) => {
    event.stopPropagation();

    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Unable to play video:", error);
    }
  };

  return (
    <motion.div
      className="reel-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      whileHover={{ y: -8 }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.video}
        className="reel-video"
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Overlay */}
      <div className="reel-overlay" />

      {/* Play Button */}
      <button
        type="button"
        className="reel-play"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause reel" : "Play reel"}
      >
        {isPlaying ? (
          <Pause size={22} />
        ) : (
          <Play size={22} fill="currentColor" />
        )}
      </button>

      {/* Information */}
      <div className="reel-info">
        <span>{reel.category}</span>
        <h3>{reel.title}</h3>
      </div>
    </motion.div>
  );
}

export default Reels;