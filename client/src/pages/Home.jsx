import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import Reels from "../components/Reels";
import Testimonials from "../components/Testimonials";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="site">
      <Navbar />

      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Reels />
        <Testimonials />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}

export default Home;