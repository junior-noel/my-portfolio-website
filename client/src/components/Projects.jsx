import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { getProjects } from "../api/projects.js";
import { Globe, Loader, Code2 } from "lucide-react";

const fallbackProjects = [
  // {
  //   _id: "1",
  //   title: "E-Commerce Platform",
  //   description:
  //     "A fullstack e-commerce app with product management, cart, and payment integration built with React and Node.js.",
  //   image: "",
  //   tags: ["React", "Node.js", "MongoDB", "Tailwind"],
  //   liveUrl: "#",
  //   repoUrl: "#",
  //   featured: true,
  // },
  // {
  //   _id: "2",
  //   title: "Task Management App",
  //   description:
  //     "A productivity app with drag-and-drop task boards, real-time updates and team collaboration features.",
  //   image: "",
  //   tags: ["React", "Express", "Socket.io", "MongoDB"],
  //   liveUrl: "#",
  //   repoUrl: "#",
  //   featured: false,
  // },
  // {
  //   _id: "3",
  //   title: "Portfolio Website",
  //   description:
  //     "A fullstack personal portfolio with custom CMS admin dashboard, contact form and smooth animations.",
  //   image: "",
  //   tags: ["React", "Node.js", "Tailwind", "Framer Motion"],
  //   liveUrl: "#",
  //   repoUrl: "#",
  //   featured: true,
  // },
  // {
  //   _id: "4",
  //   title: "REST API Boilerplate",
  //   description:
  //     "A production-ready Node.js REST API boilerplate with JWT auth, rate limiting and MongoDB integration.",
  //   image: "",
  //   tags: ["Node.js", "Express", "MongoDB", "JWT"],
  //   liveUrl: "#",
  //   repoUrl: "#",
  //   featured: false,
  // },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const displayedProjects = projects.length > 0 ? projects : fallbackProjects;

  const filtered =
    activeTag === "All"
      ? displayedProjects
      : displayedProjects.filter((p) => p.tags.includes(activeTag));

  const visibleProjects = showAll ? filtered : filtered.slice(0, 2);

  // Get all unique tags from projects
  const tags = ["All", ...new Set(displayedProjects.flatMap((p) => p.tags))];

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 bg-white dark:bg-gray-950"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-mono text-cyan-500 mb-3">
             {/* what i've built */}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            A selection of things I've built — from fullstack apps to APIs and
            everything in between.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTag === tag
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-cyan-500" size={36} />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {visibleProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-52 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-gray-100 dark:to-gray-800 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl opacity-30">🖥️</span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500 text-white">
                      Featured
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-3">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-white text-gray-900 hover:bg-cyan-500 hover:text-white transition-colors duration-200"
                      >
                        <Globe size={18} />
                      </motion.a>
                    )}
                    {project.repoUrl && project.repoUrl !== "#" && (
                      <motion.a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-white text-gray-900 hover:bg-cyan-500 hover:text-white transition-colors duration-200"
                      >
                        <Code2 size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-500 border border-cyan-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-400 dark:text-gray-600"
          >
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-medium">
              No projects found for this tag
            </p>
          </motion.div>
        )}

        {/* Show More / Show Less Button */}
        {!loading && filtered.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-cyan-500/50 text-cyan-500 font-semibold text-sm hover:bg-cyan-500 hover:text-white transition-all duration-300"
            >
              {showAll
                ? "Show Less ↑"
                : `View All Projects (${filtered.length}) ↓`}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
