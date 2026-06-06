import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { getServices } from "../api/services.js";
import {
  Globe,
  Server,
  Smartphone,
  Database,
  ShoppingCart,
  Settings,
  Loader2,
} from "lucide-react";

// Fallback icon map for services from DB
const iconMap = {
  globe: Globe,
  server: Server,
  smartphone: Smartphone,
  database: Database,
  shopping: ShoppingCart,
  settings: Settings,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((res) => setServices(res.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  // Fallback services shown while DB is empty
  const fallbackServices = [
    {
      _id: "1",
      icon: "globe",
      title: "Web Development",
      description:
        "Building fast, responsive and modern web applications using React.js, Node.js and the latest web technologies.",
    },
    {
      _id: "2",
      icon: "server",
      title: "Backend & API Development",
      description:
        "Designing scalable REST APIs, database architecture and server-side logic with Node.js and MongoDB.",
    },
    {
      _id: "3",
      icon: "smartphone",
      title: "Responsive UI Design",
      description:
        "Crafting pixel-perfect, mobile-first interfaces that look great on every screen size and device.",
    },
    {
      _id: "4",
      icon: "database",
      title: "Database Design",
      description:
        "Structuring efficient MongoDB schemas and managing data with best practices for performance and scalability.",
    },
    {
      _id: "5",
      icon: "shopping",
      title: "E-Commerce Solutions",
      description:
        "Building complete online stores with product management, cart functionality and payment integration.",
    },
    {
      _id: "6",
      icon: "settings",
      title: "Maintenance & Support",
      description:
        "Providing ongoing support, performance optimization and feature updates for existing web applications.",
    },
  ];

  const displayedServices = services.length > 0 ? services : fallbackServices;

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 bg-white dark:bg-gray-950"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-mono text-cyan-500 mb-3">
             {/* my services */}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Services
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Here's what I can do for you — from idea to fully deployed product.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-cyan-500" size={36} />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedServices.map((service, index) => {
              const Icon = iconMap[service.icon] || Settings;
              return (
                <motion.div
                  key={service._id}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  {/* Gradient top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    <Icon size={22} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Number */}
                  <span className="absolute bottom-4 right-5 text-4xl font-bold text-gray-100 dark:text-gray-800 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
