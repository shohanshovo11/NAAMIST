import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Dashboard from "./components/Alumni/Dashboard";
import NotFound from "./components/Common/NotFound";
import AuthenticateUser from "./components/Common/AuthenticateUser";
import Login from "./components/Alumni/Login";
import AdminLogin from "./components/Admin/AdminLogin";
import Layout from "./components/Common/Layout";
import Members from "./components/Common/Members";
import Events from "./components/Events/Events";
import EventExpanded from "./components/Events/EventExpanded";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Announcements from "./components/Announcements/Announcements";
import AnnouncementDetail from "./components/Announcements/AnnouncementDetail";
import PostAnnouncement from "./components/Announcements/PostAnnouncement";

function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/authentication" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/members"
          element={
            <Layout>
              <Members />
            </Layout>
          }
        />
        <Route
          path="/announcements"
          element={
            <Layout>
              <Announcements />
            </Layout>
          }
        />

        <Route
          path="/announcement/:id"
          element={
            <Layout>
              <AnnouncementDetail />
            </Layout>
          }
        />
        <Route
          path="/post-announcement"
          element={
            <Layout>
              <PostAnnouncement />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <Events />
            </Layout>
          }
        />
        <Route
          path="/about-us"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/event/:id"
          element={
            <Layout>
              <EventExpanded />
            </Layout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AuthenticateUser role="admin">
              <AdminDashboard />
            </AuthenticateUser>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
