import {
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              RC <span>&</span> RD
              <small>FRAMES</small>
            </a>

            <p>
              Capturing moments.
              <br />
              Creating stories.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <span>EXPLORE</span>

              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#reels">Reels</a>
            </div>

            <div>
              <span>CONNECT</span>

              <a href="#contact">Contact</a>

              <a href="#contact">
                Instagram
                <ArrowUpRight size={14} />
              </a>

              <a href="#contact">
                WhatsApp
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} RC & RD Frames. All rights reserved.
          </span>

          <span>Photography • Reels • Creative Content</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;