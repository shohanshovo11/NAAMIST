import { useState } from "react";
import { Layout, Menu, Modal } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  PictureOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import UserManagement from "./UserManagement";
import EventManagement from "./EventManagement";
import AnnouncementManagement from "./AnnouncementManagement";
import HeroSliderManagement from "./HeroSliderManagement";
import QuoteManagement from "./QuoteManagement";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const { Sider, Content, Header } = Layout;

const LogoutContent = ({ setSelectedKey }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
    navigate("/admin/login");
  };

  const handleCancel = () => {
    console.log("cancel");
    setIsModalVisible(false);
    setSelectedKey("users");
  };

  return (
    <Modal
      title="Confirm Logout"
      visible={isModalVisible}
      onOk={handleLogout}
      onCancel={handleCancel}
      okText="Yes, Logout"
      cancelText="Cancel"
    >
      <div className="text-lg font-semibold">
        Are you sure you want to log out?
      </div>
    </Modal>
  );
};

const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("users");

  const menuItems = [
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
      key: "announcements",
      label: "Announcements",
      icon: <SettingOutlined />,
      content: <AnnouncementManagement />,
    },
    {
      key: "hero-slider",
      label: "Hero Slider",
      icon: <PictureOutlined />,
      content: <HeroSliderManagement />,
    },
    {
      key: "quotes",
      label: "Quotes",
      icon: <MessageOutlined />,
      content: <QuoteManagement />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      content: <LogoutContent setSelectedKey={setSelectedKey} />,
    },
  ];

  const renderContent = () => {
    const currentMenuItem = menuItems.find((item) => item.key === selectedKey);
    return currentMenuItem ? currentMenuItem.content : <UserManagement />;
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
          defaultSelectedKeys={["users"]}
          mode="inline"
          selectedKeys={[selectedKey]}
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
