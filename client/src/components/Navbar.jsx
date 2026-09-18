import { useState } from "react";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Reels", href: "#reels" },
    { name: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <a href="#home" className="logo">
        <span>RC</span>
        <span className="logo-divider">&</span>
        <span>RD</span>
        <small>FRAMES</small>
      </a>

      <nav className="desktop-nav">
        {links.map((link) => (
          <a key={link.name} href={link.href}>
            {link.name}
          </a>
        ))}

        {/* Admin Login */}
        <a
          href="/admin/login"
          className="admin-nav-link"
          title="Admin Login"
        >
          <ShieldCheck size={15} />
          Admin
        </a>
      </nav>

      <a href="#contact" className="nav-cta">
        Book a Shoot
        <ArrowUpRight size={17} />
      </a>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Admin Login */}
            <a
              href="/admin/login"
              className="mobile-admin"
              onClick={closeMenu}
            >
              <ShieldCheck size={18} />
              Admin Login
            </a>

            <a
              href="#contact"
              className="mobile-book"
              onClick={closeMenu}
            >
              Book a Shoot
              <ArrowUpRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;