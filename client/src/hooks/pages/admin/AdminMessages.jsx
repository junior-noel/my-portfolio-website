import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { getMessages, markAsRead, deleteMessage } from "../../api/messages.js";
import toast from "react-hot-toast";
import { Trash2, Mail, MailOpen, Loader2, X } from "lucide-react";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await getMessages();
      setMessages(res.data);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      try {
        const res = await getMessages();
        if (isMounted) setMessages(res.data);
      } catch {
        if (isMounted) toast.error("Failed to load messages");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void loadMessages();

    return () => {
      isMounted = false;
    };
  }, [fetchMessages]);

  const handleOpen = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      try {
        await markAsRead(msg._id);
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m)),
        );
      } catch {
        // silently fail
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      toast.success("Message deleted");
      if (selected?._id === id) setSelected(null);
      fetchMessages();
    } catch {
      toast.error("Failed to delete message");
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500 text-white">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Contact form submissions from your portfolio
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-cyan-500" size={32} />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-400">No messages yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Messages List */}
            <div className="space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleOpen(msg)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    selected?._id === msg._id
                      ? "border-cyan-500/50 bg-cyan-500/5"
                      : "border-gray-800 bg-gray-900 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 font-bold text-sm">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-white truncate">
                          {msg.name}
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          {!msg.read ? (
                            <Mail size={14} className="text-cyan-500" />
                          ) : (
                            <MailOpen size={14} className="text-gray-600" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(msg._id);
                            }}
                            className="p-1 rounded text-gray-600 hover:text-red-400 transition-colors duration-200"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {msg.subject}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Detail */}
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit sticky top-6"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {selected.name}
                      </h3>
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors duration-200"
                      >
                        {selected.email}
                      </a>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                        Subject
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {selected.subject}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                        Message
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {selected.message}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                        Received
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(selected.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                      className="flex-1 text-center px-4 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
                    >
                      Reply via Email
                    </a>
                    <button
                      onClick={() => handleDelete(selected._id)}
                      className="px-4 py-2.5 rounded-xl border border-red-400/30 text-red-400 text-sm font-medium hover:bg-red-400/10 transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden lg:flex items-center justify-center bg-gray-900 border border-gray-800 border-dashed rounded-2xl p-12 text-center"
                >
                  <div>
                    <MailOpen
                      size={40}
                      className="text-gray-700 mx-auto mb-3"
                    />
                    <p className="text-gray-500 text-sm">
                      Select a message to read it
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;

// const AdminMessages = () => {
//   return <div className="text-white">Admin Messages — Coming Soon</div>;
// };
// export default AdminMessages;
