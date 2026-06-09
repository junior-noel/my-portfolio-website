import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../api/services.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";

const iconOptions = [
  "globe",
  "server",
  "smartphone",
  "database",
  "shopping",
  "settings",
];

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchServices = useCallback(async () => {
    try {
      const res = await getServices();
      setServices(res.data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const res = await getServices();
        if (isMounted) setServices(res.data);
      } catch {
        if (isMounted) toast.error("Failed to load services");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void loadServices();

    return () => {
      isMounted = false;
    };
  }, [fetchServices]);

  const openCreate = () => {
    setEditing(null);
    reset({ title: "", description: "", icon: "globe", order: 0 });
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    reset(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editing) {
        await updateService(editing._id, data);
        toast.success("Service updated!");
      } else {
        await createService(data);
        toast.success("Service created!");
      }
      fetchServices();
      closeModal();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      toast.success("Service deleted");
      fetchServices();
    } catch {
      toast.error("Failed to delete service");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Services</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage the services you offer
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
          >
            <Plus size={18} />
            Add Service
          </motion.button>
        </div>

        {/* Services List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-cyan-500" size={32} />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800">
            <p className="text-4xl mb-3">⚙️</p>
            <p className="text-gray-400">
              No services yet. Add your first one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <motion.div
                key={service._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {service.icon}
                    </span>
                    <h3 className="text-base font-bold text-white truncate">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(service)}
                    className="p-2 rounded-lg text-gray-400 hover:text-cyan-500 hover:bg-cyan-500/10 transition-all duration-200"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/70 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                  <h2 className="text-lg font-bold text-white">
                    {editing ? "Edit Service" : "Add Service"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-6 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Title *
                    </label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      placeholder="Web Development"
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm outline-none focus:border-cyan-500 transition-colors duration-200"
                    />
                    {errors.title && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Description *
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      rows={3}
                      placeholder="Describe this service..."
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm outline-none focus:border-cyan-500 transition-colors duration-200 resize-none"
                    />
                    {errors.description && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Icon
                    </label>
                    <select
                      {...register("icon")}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm outline-none focus:border-cyan-500 transition-colors duration-200"
                    >
                      {iconOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Order
                    </label>
                    <input
                      {...register("order")}
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm outline-none focus:border-cyan-500 transition-colors duration-200"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-400 text-sm font-medium hover:text-white hover:border-gray-600 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200 disabled:opacity-60"
                    >
                      {submitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : editing ? (
                        "Update"
                      ) : (
                        "Create"
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminServices;

// const AdminServices = () => {
//   return <div className="text-white">Admin Services — Coming Soon</div>;
// };
// export default AdminServices;
