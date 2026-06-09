import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { getProjects } from "../../api/projects.js";
import { getServices } from "../../api/services.js";
import { getMessages } from "../../api/messages.js";
import { FolderKanban, Settings, MessageSquare, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
    unread: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, servicesRes, messagesRes] = await Promise.all([
          getProjects(),
          getServices(),
          getMessages(),
        ]);
        const messages = messagesRes.data;
        setStats({
          projects: projectsRes.data.length,
          services: servicesRes.data.length,
          messages: messages.length,
          unread: messages.filter((m) => !m.read).length,
        });
        setRecentMessages(messages.slice(0, 5));
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      link: "/admin/projects",
    },
    {
      label: "Total Services",
      value: stats.services,
      icon: Settings,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      link: "/admin/services",
    },
    {
      label: "Total Messages",
      value: stats.messages,
      icon: MessageSquare,
      color: "text-green-500",
      bg: "bg-green-500/10",
      link: "/admin/messages",
    },
    {
      label: "Unread Messages",
      value: stats.unread,
      icon: Mail,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      link: "/admin/messages",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back! Here's an overview of your portfolio.
          </p>
        </div>

        {/* Stat Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statCards.map(({ label, value, icon: Icon, color, bg, link }) => (
            <motion.div key={label} variants={cardVariants}>
              <Link
                to={link}
                className="block p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color}`}
                  >
                    <Icon size={20} />
                  </div>
                  <span className={`text-3xl font-bold ${color}`}>
                    {loading ? "..." : value}
                  </span>
                </div>
                <p className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                  {label}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Messages</h2>
            <Link
              to="/admin/messages"
              className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors duration-200"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : recentMessages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare size={32} className="text-gray-700 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No messages yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50"
                >
                  <div className="w-9 h-9 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 text-sm font-bold">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white truncate">
                        {msg.name}
                      </p>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

// const AdminDashboard = () => {
//   return <div className="text-white">Admin Dashboard — Coming Soon</div>;
// };
// export default AdminDashboard;
