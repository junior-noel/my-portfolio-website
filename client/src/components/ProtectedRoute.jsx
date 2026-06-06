import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return admin ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
