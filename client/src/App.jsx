import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

// Pages
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProjects from "./pages/admin/AdminProjects.jsx";
import AdminServices from "./pages/admin/AdminServices.jsx";
import AdminMessages from "./pages/admin/AdminMessages.jsx";

// Components
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <AdminMessages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
