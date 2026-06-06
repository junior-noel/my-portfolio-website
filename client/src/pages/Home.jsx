import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";

const Home = () => {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
    </main>
  );
};

export default Home;
