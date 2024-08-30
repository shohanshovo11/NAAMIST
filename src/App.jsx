import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AlumniDashboard from "./components/Alumni/AlumniDashboard";
import Login from "./components/Common/Login";
import NotFound from "./components/Common/NotFound";
import AuthenticateUser from "./components/Common/AuthenticateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin-dashboard"
        element={
          <AuthenticateUser role="admin">
            <AdminDashboard />
          </AuthenticateUser>
        }
      />
      <Route
        path="/alumni-dashboard"
        element={
          <AuthenticateUser role="alumni">
            <AlumniDashboard />
          </AuthenticateUser>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
