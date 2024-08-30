import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Dashboard from "./components/Alumni/Dashboard";
import NotFound from "./components/Common/NotFound";
import AuthenticateUser from "./components/Common/AuthenticateUser";
import Login from "./components/Alumni/Login";
import AdminLogin from "./components/Admin/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AuthenticateUser role="admin">
            <AdminDashboard />
          </AuthenticateUser>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthenticateUser role="alumni">
            <Dashboard />
          </AuthenticateUser>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
