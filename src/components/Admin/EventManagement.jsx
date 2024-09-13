import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Space,
  message,
  Upload,
} from "antd";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

// Dummy data for events
const initialEvents = [
  {
    _id: "1",
    imageUrl: "/images/events/1/1.jpg",
    title: "Fund Raising Campaign for Flood Relief",
    description:
      "Join us in supporting the urgent fundraising campaign for flood relief in Bangladesh.",
    eventDate: "2024-10-05T09:00:00Z",
    eventContent: "<p>Flood relief campaign details...</p>",
  },
  {
    _id: "1",
    imageUrl: "/images/events/1/1.jpg",
    title: "Fund Raising Campaign for Flood Relief",
    description:
      "Join us in supporting the urgent fundraising campaign for flood relief in Bangladesh.",
    eventDate: "2024-10-05T09:00:00Z",
    eventContent: "<p>Flood relief campaign details...</p>",
  },
  {
    _id: "1",
    imageUrl: "/images/events/1/1.jpg",
    title: "Fund Raising Campaign for Flood Relief",
    description:
      "Join us in supporting the urgent fundraising campaign for flood relief in Bangladesh.",
    eventDate: "2024-10-05T09:00:00Z",
    eventContent: "<p>Flood relief campaign details...</p>",
  },
  {
    _id: "1",
    imageUrl: "/images/events/1/1.jpg",
    title: "Fund Raising Campaign for Flood Relief",
    description:
      "Join us in supporting the urgent fundraising campaign for flood relief in Bangladesh.",
    eventDate: "2024-10-05T09:00:00Z",
    eventContent: "<p>Flood relief campaign details...</p>",
  },
];

// Toolbar Configuration for Quill
const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"], // Add image button here
      ["clean"],
    ],
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

// Event Management Component
const EventManagement = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  // Function to show modal for creating or editing an event
  const showModal = (event = null) => {
    setIsModalVisible(true);
    setEditingEvent(event);
    if (event) {
      form.setFieldsValue(event);
      setEditorContent(event.eventContent || "");
    } else {
      form.resetFields();
      setEditorContent("");
    }
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEvent(null);
    form.resetFields();
    setSelectedImages([]);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log(editorContent, "ssr");
    form
      .validateFields()
      .then((values) => {
        const newEvent = {
          ...values,
          eventContent: editorContent,
          _id: editingEvent ? editingEvent._id : `${events.length + 1}`,
        };

        if (editingEvent) {
          // Edit event
          const updatedEvents = events.map((event) =>
            event._id === editingEvent._id ? newEvent : event
          );
          setEvents(updatedEvents);
          message.success("Event updated successfully!");
        } else {
          // Create event
          setEvents([...events, newEvent]);
          message.success("Event created successfully!");
        }

        setIsModalVisible(false);
        form.resetFields();
        setSelectedImages([]);
      })
      .catch(() => {
        message.error("Please fill all the required fields.");
      });
  };

  // Handle delete event
  const handleDelete = (eventId) => {
    const updatedEvents = events.filter((event) => event._id !== eventId);
    setEvents(updatedEvents);
    message.success("Event deleted successfully!");
  };

  // Insert selected images into the editor
  const insertImagesToEditor = () => {
    const quill = Quill.find(document.querySelector(".ql-editor"));
    selectedImages.forEach((image) => {
      const reader = new FileReader();
      reader.onload = () => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", reader.result);
      };
      reader.readAsDataURL(image);
    });
  };

  // Handle image file selection
  const handleImageUpload = ({ fileList }) => {
    setSelectedImages(fileList.map((file) => file.originFileObj));
    console.log(fileList, " shhsr");
  };

  // Table columns for event list
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "eventDate",
      key: "eventDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Management</h2>

      {/* Button to create a new event */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        className="mb-4"
      >
        Create Event
      </Button>

      {/* Event Table */}
      <Table columns={columns} dataSource={events} rowKey="_id" />

      {/* Modal for creating/editing events */}
      <Modal
        title={editingEvent ? "Edit Event" : "Create Event"}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={editingEvent ? "Update" : "Create"}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="insert"
            type="primary"
            onClick={insertImagesToEditor}
            icon={<UploadOutlined />}
          >
            Insert Images
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {editingEvent ? "Update" : "Create"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true, message: "Please enter event title" }]}
          >
            <Input placeholder="Enter event title" />
          </Form.Item>

          <Form.Item
            name="eventDate"
            label="Event Date"
            rules={[{ required: true, message: "Please enter event date" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Event Description"
            rules={[
              { required: true, message: "Please enter event description" },
            ]}
          >
            <Input.TextArea placeholder="Enter event description" />
          </Form.Item>

          <Form.Item label="Event Content">
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              placeholder="Enter detailed event content"
              modules={modules}
              formats={formats}
            />
          </Form.Item>

          {/* Upload multiple images */}
          <Form.Item label="Upload Images">
            <Upload
              multiple
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleImageUpload}
            >
              <Button icon={<UploadOutlined />}>Select Images</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventManagement;
