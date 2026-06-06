import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Code2, Server, Palette } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "Technologies Used", value: "15+" },
  { label: "Years Learning", value: "3+" },
  { label: "Cups of Coffee", value: "∞" },
];

const highlights = [
  {
    icon: Code2,
    title: "Frontend",
    desc: "Building responsive, animated UIs with React.js and Tailwind CSS",
  },
  {
    icon: Server,
    title: "Backend",
    desc: "Designing scalable REST APIs with Node.js, Express and MongoDB",
  },
  {
    icon: Palette,
    title: "Design",
    desc: "Crafting clean, user-friendly interfaces with attention to detail",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-sm font-mono text-cyan-500 mb-3"
          >
            // about me
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Who I Am
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Left — Image */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center"
          >
            {/* Decorative border */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-cyan-500/30" />
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-purple-500/30" />

            {/* Photo */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-gray-200 dark:border-gray-700">
              {/* Replace src with your actual photo */}
              <img
                src="/profile.jpg"
                alt="Junior Noel"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback if no photo */}
              <div className="hidden w-full h-full items-center justify-center text-7xl">
                👨‍💻
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Currently building
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                This Portfolio 🚀
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Fullstack Developer based in{" "}
              <span className="text-cyan-500">Cameroon 🇨🇲</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              I'm a passionate fullstack developer who loves turning ideas into
              real, impactful web applications. I enjoy working across the
              entire stack — from crafting pixel-perfect UIs to designing robust
              backend systems.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              When I'm not coding, I'm learning new technologies, contributing
              to open source, or exploring creative solutions to everyday
              problems. I believe great software is not just functional — it's a
              pleasure to use.
            </p>

            {/* Highlights */}
            <div className="space-y-3 pt-2">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV */}
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-cyan-500/25"
            >
              <Download size={16} />
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map(({ label, value }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-1">
                {value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
