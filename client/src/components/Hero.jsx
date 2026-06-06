import { motion } from "framer-motion";
import { ArrowDown, Globe, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const roles = [
  "Fullstack Developer",
  "React.js Developer",
  "Node.js Developer",
  "UI/UX Enthusiast",
];

const socialLinks = [
  { icon: Globe, href: "https://github.com/YOUR_USERNAME", label: "GitHub" },
  {
    icon: Mail,
    href: "https://linkedin.com/in/YOUR_USERNAME",
    label: "LinkedIn",
  },

  //   {
  //     icon: Linkedin,
  //     href: "https://linkedin.com/in/YOUR_USERNAME",
  //     label: "LinkedIn",
  //   },
  //   {
  //     icon: Twitter,
  //     href: "https://twitter.com/YOUR_USERNAME",
  //     label: "Twitter",
  //   },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (typing) {
      if (displayed.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] dark:opacity-20 opacity-40" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
        >
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
            Junior Noel
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          className="text-2xl md:text-3xl font-mono font-semibold text-gray-600 dark:text-gray-300 mb-6 h-10"
        >
          <span>{displayed}</span>
          <span className="animate-pulse text-cyan-500">|</span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I build fast, scalable, and beautiful web applications from front to
          back. Passionate about clean code, great UX, and solving real
          problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .querySelector("#projects")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-base hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-cyan-500/25"
          >
            View My Work
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/cv.pdf"
            download
            className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-base hover:border-cyan-500 hover:text-cyan-500 dark:hover:border-cyan-500 dark:hover:text-cyan-500 transition-all duration-200"
          >
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
              aria-label={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600"
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
