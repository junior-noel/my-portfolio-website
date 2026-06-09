import Navbar from "../../components/Navbar.jsx";
import Hero from "../../components/Hero.jsx";
import About from "../../components/About.jsx";
import Services from "../../components/Services.jsx";
import TechStack from "../../components/TechStack.jsx";
import Projects from "../../components/Projects.jsx";
import Contact from "../../components/Contact.jsx";
import Footer from "../../components/Footer.jsx";

const Home = () => {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
