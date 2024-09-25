import { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Space,
  message,
  Dropdown,
  Menu,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Axios from "../../utils/axios";

const baseUrl = import.meta.env.VITE_IMAGE_URL;

// Toolbar Configuration for Quill
const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"], // Add image button here
      [{ align: [] }], // Alignment options: left, center, right, justify
      ["clean"],
    ],
    handlers: {
      image: () => {
        document.getElementById("imageUpload").click();
      },
    },
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
  "align", // Enable alignment
];

// Function to truncate description
const truncateDescription = (description, maxLength = 100) => {
  return description?.length > maxLength
    ? `${description.substring(0, maxLength)}...`
    : description;
};

// Event Management Component
const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc"); // Sort order state
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef(null); // Reference to Quill editor
  const [cardImageUrl, setCardImageUrl] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await Axios("/event");
        setEvents(res.data.events);
      } catch (e) {
        console.log("Something went wrong!", e);
        message.error("Something went wrong!");
      }
    };
    fetchEvents();
  }, []);

  // Function to show modal for creating or editing an event
  const showModal = (event = null) => {
    setIsModalVisible(true);
    console.log(event, "ksl");
    setTimeout(() => {
      setEditingEvent(event);
      if (event) {
        // Format eventDate to 'YYYY-MM-DD'
        const formattedDate = event.eventDate
          ? event.eventDate.split("T")[0]
          : null;

        // Set the form values, including the formatted date
        form.setFieldsValue({
          ...event,
          eventDate: formattedDate, // Set the formatted date
        });

        setEditorContent(event.eventContent || "");
        setCardImageUrl(event.cardImage || ""); // Set existing cardImage URL if editing
      } else {
        form.resetFields();
        setEditorContent("");
        setCardImageUrl(""); // Clear cardImage URL for new event
      }
    }, 100); // Small delay to ensure the modal is fully rendered
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEvent(null);
    form.resetFields();
    setCardImageUrl("");
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();

      // Check if cardImageUrl exists (ensure image is uploaded)
      if (!cardImageUrl) {
        message.error("Please upload a card image.");
        return;
      }
      console.log(editorContent, "kkxks");
      // Create the new event object, including cardImage URL
      const newEvent = {
        ...values,
        eventContent: editorContent,
        cardImage: cardImageUrl, // Ensure cardImageUrl is included in submission
      };
      let res;
      if (editingEvent) {
        // Edit existing event
        res = await Axios.put(`/event/${editingEvent._id}`, newEvent);
        const updatedEvents = events.map((event) =>
          event._id === editingEvent._id ? res.data : event
        );
        setEvents(updatedEvents);
        message.success("Event updated successfully!");
      } else {
        // Create a new event
        res = await Axios.post("/event", newEvent);
        setEvents([...events, res.data]);
        message.success("Event created successfully!");
      }

      // Close the modal and reset the form
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      // Handle errors from validation or Axios requests
      message.error(
        "Please fill all the required fields or check for server errors."
      );
      console.error("Submission error:", error);
    }
  };

  // Handle image upload and insert image URL into Quill editor
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("img", file); // Adjust based on backend

    try {
      const response = await Axios.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.imageUrl;
      // Get the Quill editor instance from the ref
      const quill = quillRef.current.getEditor(); // Get Quill instance

      // Insert the image URL into the editor at the current selection
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", `${baseUrl}/${imageUrl}`);
    } catch (error) {
      message.error("Failed to upload image.");
      console.error(error);
    }
  };

  // Handle card image upload and get the URL
  const handleCardImageUpload = async ({ file }) => {
    try {
      const formData = new FormData();
      formData.append("img", file);

      // Upload image to server
      const response = await Axios.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Get the image URL from response and set it
      const imageUrl = response.data.imageUrl;
      setCardImageUrl(`${baseUrl}/${imageUrl}`); // Store the uploaded image URL
      message.success("Image uploaded successfully!");
    } catch (error) {
      message.error("Failed to upload image.");
      console.error(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      // Show confirmation message
      const confirm = window.confirm(
        "Are you sure you want to delete this event?"
      );
      if (!confirm) return;

      // Call Axios to delete the event
      await Axios.delete(`/event/${_id}`);

      // Remove the deleted event from the state
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== _id)
      );

      message.success("Event deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete the event.");
    }
  };

  // Sort events based on eventDate and sortOrder
  const sortedEvents = events?.sort((a, b) => {
    const dateA = new Date(a.eventDate);
    const dateB = new Date(b.eventDate);

    if (sortOrder === "asc") {
      return dateA - dateB;
    }
    return dateB - dateA;
  });

  // Handle sorting toggle
  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Table columns for displaying event list
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => truncateDescription(description), // Shorten description for display
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

      {/* Sorting Button */}
      <Button
        type="default"
        icon={
          sortOrder === "asc" ? (
            <SortAscendingOutlined />
          ) : (
            <SortDescendingOutlined />
          )
        }
        onClick={handleSortToggle}
        className="mb-4 ml-4"
      >
        {sortOrder === "asc" ? "Sort by Oldest" : "Sort by Newest"}
      </Button>

      {/* Event Table */}
      <Table columns={columns} dataSource={sortedEvents} rowKey="_id" />

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
              key={editingEvent ? editingEvent._id : "new"}
              ref={quillRef} // Attach ref to Quill
              value={editorContent}
              onChange={setEditorContent}
              modules={modules}
              formats={formats}
              placeholder="Enter detailed event content"
            />
          </Form.Item>

          <Form.Item label="Card Image">
            <Upload
              name="cardImage"
              listType="picture"
              showUploadList={false}
              customRequest={handleCardImageUpload} // Directly call the upload handler
            >
              <Button>Upload Card Image</Button>
            </Upload>
            {cardImageUrl && (
              <img
                src={cardImageUrl}
                alt="Card"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </Form.Item>

          {/* Hidden upload input for images */}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default EventManagement;
