import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import UserManagement from "./UserManagement";
import EventManagement from "./EventManagement";

const { Sider, Content, Header } = Layout;

// Content Components
const DashboardContent = () => (
  <div className="text-lg font-semibold">
    Dashboard Content - Scrollable. You can add a lot of content here to see the
    effect.
    <div style={{ height: "1500px" }}>
      <p>Extra content for testing scrolling behavior.</p>
    </div>
  </div>
);
const LogoutContent = () => (
  <div className="text-lg font-semibold">Logging out...</div>
);

// Refactored AdminDashboard
const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");

  // Menu items configuration
  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      content: <DashboardContent />,
    },
    {
      key: "users",
      label: "Users",
      icon: <UserOutlined />,
      content: <UserManagement />,
    },
    {
      key: "events",
      label: "Events",
      icon: <SettingOutlined />,
      content: <EventManagement />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      content: <LogoutContent />,
    },
  ];

  const renderContent = () => {
    const currentMenuItem = menuItems.find((item) => item.key === selectedKey);
    return currentMenuItem ? currentMenuItem.content : <DashboardContent />;
  };

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar - Fixed Position */}
      <Sider
        width={200}
        style={{ height: "100vh", position: "fixed", left: 0, top: 0 }}
        className="bg-gray-900"
      >
        <div className="h-12 m-4 bg-gray-700 rounded-lg" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          onClick={(e) => setSelectedKey(e.key)}
          className="bg-gray-900"
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Main layout - padding added to account for the fixed sidebar */}
      <Layout style={{ marginLeft: 200 }}>
        <Header className="bg-white p-4 shadow-md">
          <div className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </div>
        </Header>

        {/* Scrollable content area */}
        <Content
          className="m-4 p-6 bg-white rounded-lg shadow-md"
          style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
