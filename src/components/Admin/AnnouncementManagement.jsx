import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Popconfirm,
  Tag,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Axios from "../../utils/axios";

const imageUrl = import.meta.env.VITE_IMAGE_URL;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure month is two digits
  const day = date.getDate().toString().padStart(2, "0"); // Ensure day is two digits
  return `${year}-${month}-${day}`;
};

// Add/Edit Announcement Form
const AnnouncementForm = ({
  visible,
  onCreate,
  onCancel,
  initialValues,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Handle file upload
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      visible={visible}
      title={isEdit ? "Edit Announcement" : "Add New Announcement"}
      okText={isEdit ? "Update" : "Add"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const formData = new FormData();

            // Append form values
            Object.keys(values).forEach((key) => {
              console.log(key, values[key], "Jk");
              formData.append(key, values[key]);
            });

            // Append the file itself
            if (fileList.length) {
              formData.append("announcementImg", fileList[0].originFileObj);
            }

            // Append isApproved: true
            formData.append("isApproved", true);

            form.resetFields();
            onCreate(formData);
            setFileList([]);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...initialValues,
          date: initialValues?.date ? formatDate(initialValues.date) : null,
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select the date" }]}
        >
          <Input type="date" />
        </Form.Item>

        {/* Image upload */}
        <Form.Item label="Image">
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Browse</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Main Announcement Management Component
const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");

  const fetchAnnouncements = async () => {
    try {
      const response = await Axios.get("/announcements");
      console.log(response.data.data, "jkjdf");
      setAnnouncements(response.data.data || []);
      setFilteredAnnouncements(response.data.data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      message.error("Failed to load announcements");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (filterStatus === "approved") {
      setFilteredAnnouncements(
        announcements.filter((announcement) => announcement.isApproved)
      );
    } else if (filterStatus === "unapproved") {
      setFilteredAnnouncements(
        announcements.filter((announcement) => !announcement.isApproved)
      );
    } else {
      setFilteredAnnouncements(announcements);
    }
  }, [announcements, filterStatus]);

  // Handle search
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = announcements.filter((announcement) =>
      ["title", "description"].some((key) =>
        announcement[key].toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredAnnouncements(filtered);
  };

  // Reset filter
  const resetFilter = () => {
    setFilterStatus("all");
    setFilteredAnnouncements(announcements);
  };

  // Table columns configuration
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (isApproved, record) =>
        isApproved ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Popconfirm
            title="Approve this announcement?"
            onConfirm={() => handleApprove(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<CheckOutlined />}>
              Approve
            </Button>
          </Popconfirm>
        ),
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this announcement?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ backgroundColor: "orange", borderColor: "orange" }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Handle approval
  const handleApprove = async (id) => {
    const updatedAnnouncements = announcements.map((announcement) =>
      announcement._id === id
        ? { ...announcement, isApproved: true }
        : announcement
    );
    console.log(id, "jksjdfk");
    try {
      await Axios.put(`/announcements/${id}/approve`);
      message.success("Announcement approved successfully!");
    } catch (e) {
      message.error("Failed to approve announcement");
    }
    setAnnouncements(updatedAnnouncements);
    setFilteredAnnouncements(updatedAnnouncements);
  };

  const onCreate = async (formData) => {
    try {
      const res = await Axios.post("/announcements", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setAnnouncements([...announcements, res.data]);
        setFilteredAnnouncements([...announcements, res.data]);
        message.success("Announcement added successfully!");
        setVisible(false);
      }
    } catch (error) {
      message.error("Error adding announcement");
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/announcements/${id}`);
      message.success("Announcement deleted successfully!");
      const updatedAnnouncements = announcements.filter(
        (announcement) => announcement._id !== id
      );
      setAnnouncements(updatedAnnouncements);
      setFilteredAnnouncements(updatedAnnouncements);
    } catch (err) {
      message.error("Failed to delete announcement");
    }
  };

  const handleEdit = (record) => {
    setSelectedAnnouncement(record);
    setEditVisible(true);
  };

  const handleUpdate = async (formData) => {
    try {
      const res = await Axios.put(
        `/announcements/${selectedAnnouncement._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        const updatedAnnouncements = announcements.map((announcement) =>
          announcement._id === res.data._id ? res.data : announcement
        );
        setAnnouncements(updatedAnnouncements);
        setFilteredAnnouncements(updatedAnnouncements);
        message.success("Announcement updated successfully!");
        setEditVisible(false);
      }
    } catch (error) {
      message.error("Failed to update announcement");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Announcement Management</h3>

      {/* Buttons to filter announcements and search bar */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <Button
            type="default"
            onClick={resetFilter}
            style={filterStatus === "all" ? { fontWeight: "bold" } : {}}
          >
            All Announcements
          </Button>
          <Button
            type="primary"
            onClick={() => setFilterStatus("approved")}
            style={filterStatus === "approved" ? { fontWeight: "bold" } : {}}
          >
            Approved Announcements
          </Button>
          <Button
            type="danger"
            onClick={() => setFilterStatus("unapproved")}
            style={filterStatus === "unapproved" ? { fontWeight: "bold" } : {}}
          >
            Unapproved Announcements
          </Button>
        </div>

        {/* Search bar */}
        <Input.Search
          placeholder="Search announcements by title or description..."
          allowClear
          enterButton
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      {/* Button to add a new announcement */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
        className="mb-4"
      >
        Add Announcement
      </Button>

      {/* Announcement Management Table */}
      <Table
        columns={columns}
        dataSource={filteredAnnouncements}
        rowKey="_id"
      />

      {/* Modal to add/edit announcements */}
      <AnnouncementForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
        initialValues={null}
        isEdit={false}
      />

      {/* Modal to edit announcements */}
      <AnnouncementForm
        visible={editVisible}
        onCreate={handleUpdate}
        onCancel={() => setEditVisible(false)}
        initialValues={selectedAnnouncement}
        isEdit={true}
      />
    </div>
  );
};

export default AnnouncementManagement;
