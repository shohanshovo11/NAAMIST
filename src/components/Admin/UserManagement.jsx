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
// Add/Edit Alumni Form
const AlumniForm = ({ visible, onCreate, onCancel, initialValues, isEdit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Handle file upload
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      visible={visible}
      title={isEdit ? "Edit Alumni" : "Add New Alumni"}
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
              formData.append(key, values[key]);
            });

            // Append the file itself, not the blob URL
            if (fileList.length) {
              formData.append("profilePic", fileList[0].originFileObj);
            }

            form.resetFields();
            onCreate(formData); // Pass FormData to the parent component
            setFileList([]);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter the alumni's name" },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter the alumni's email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile"
          rules={[
            { required: true, message: "Please enter the mobile number" },
            {
              pattern: /^01\d{9}$/,
              message: "Please enter a valid mobile number",
            },
          ]}
        >
          <Input placeholder="Enter mobile number" />
        </Form.Item>

        <Form.Item
          name="enrollmentYear"
          label="Enrollment Year"
          rules={[
            { required: true, message: "Please enter the enrollment year" },
          ]}
        >
          <Input placeholder="Enter enrollment year" type="number" />
        </Form.Item>

        <Form.Item
          name="completionYear"
          label="Completion Year"
          rules={[
            { required: true, message: "Please enter the completion year" },
          ]}
        >
          <Input placeholder="Enter completion year" type="number" />
        </Form.Item>

        <Form.Item
          name="studentID"
          label="Student ID"
          rules={[{ required: true, message: "Please enter the student ID" }]}
        >
          <Input placeholder="Enter student ID" type="number" />
        </Form.Item>

        <Form.Item
          name="batch"
          label="Batch"
          rules={[{ required: true, message: "Please enter the batch" }]}
        >
          <Input placeholder="Enter batch" type="number" />
        </Form.Item>

        <Form.Item name="workplace" label="Workplace">
          <Input placeholder="Enter workplace (optional)" />
        </Form.Item>

        <Form.Item name="designation" label="Designation">
          <Input placeholder="Enter designation (optional)" />
        </Form.Item>

        {/* New password field */}
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: !isEdit, message: "Please enter the password" },
            { min: 6, message: "Password must be at least 6 characters long" },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        {/* Profile picture upload */}
        <Form.Item label="Profile Picture">
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

// Main Alumni Management Component
const AlumniManagement = () => {
  const [alumniData, setAlumniData] = useState();
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [filteredAlumni, setFilteredAlumni] = useState(alumniData); // State for filtered data
  const [filterStatus, setFilterStatus] = useState("all"); // State for tracking selected filter
  const [searchText, setSearchText] = useState(""); // Search text state

  const fetchAlumniData = async () => {
    try {
      const response = await Axios.get("/alumni"); // Adjust the endpoint to match your backend
      console.log(response, "jjl");
      setAlumniData(response.data); // Set the fetched data
      setFilteredAlumni(response.data); // Initialize filtered data with fetched data
    } catch (error) {
      console.error("Error fetching alumni data:", error);
      message.error("Failed to load alumni data");
    }
  };

  // Fetch alumni data when the component mounts
  useEffect(() => {
    fetchAlumniData();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    if (filterStatus === "approved") {
      setFilteredAlumni(
        alumniData.filter((alumni) => alumni.isAuthorized === true)
      );
    } else if (filterStatus === "unapproved") {
      setFilteredAlumni(
        alumniData.filter((alumni) => alumni.isAuthorized === false)
      );
    } else {
      setFilteredAlumni(alumniData);
    }
  }, [alumniData, filterStatus]);

  // Extract unique values for filters
  const getUniqueValues = (key) => {
    return [...new Set(alumniData?.map((item) => item[key]))]?.map((value) => ({
      text: String(value),
      value: value,
    }));
  };

  // Filters alumni by approval status
  const filterAlumniByApproval = (status) => {
    setFilterStatus(status);
    if (status === "approved") {
      setFilteredAlumni(
        alumniData.filter((alumni) => alumni.isAuthorized === true)
      );
    } else if (status === "unapproved") {
      setFilteredAlumni(
        alumniData.filter((alumni) => alumni.isAuthorized === false)
      );
    } else {
      setFilteredAlumni(alumniData);
    }
  };

  // Reset filter to show all alumni
  const resetFilter = () => {
    setFilterStatus("all");
    setFilteredAlumni(alumniData);
  };

  // Handle search
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = alumniData.filter((alumni) =>
      ["name", "email", "mobile"].some((key) =>
        alumni[key].toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredAlumni(filtered);
  };

  // Table columns configuration with filters
  const columns = [
    {
      title: "Profile Picture",
      dataIndex: "profilePic",
      key: "profilePic",
      render: (profilePic) =>
        profilePic ? (
          <img
            src={`${imageUrl}/${profilePic}`}
            alt="Profile"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        ) : (
          "No Picture"
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Student ID",
      dataIndex: "studentID",
      key: "studentID",
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
      filters: getUniqueValues("batch"),
      onFilter: (value, record) => record.batch === value,
    },
    {
      title: "Workplace",
      dataIndex: "workplace",
      key: "workplace",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      filters: getUniqueValues("designation"),
      onFilter: (value, record) => record.designation === value,
    },
    {
      title: "Authorized",
      dataIndex: "isAuthorized",
      key: "isAuthorized",
      render: (isAuthorized, record) =>
        isAuthorized ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Popconfirm
            title="Are you sure to approve this alumni?"
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
            style={{ marginRight: "8px" }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this alumni?"
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

  const onCreate = async (formData) => {
    try {
      // Append isAuthorized field to formData
      formData.append("isAuthorized", true);

      const res = await Axios.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        const newAlumni = res.data.alumni;
        const updatedAlumniData = [
          ...alumniData,
          { ...newAlumni, key: newAlumni._id },
        ];

        setAlumniData(updatedAlumniData);
        setFilteredAlumni(updatedAlumniData);

        // Show success message that disappears after 2 seconds
        message.success("Alumni added successfully!", 2);
        setVisible(false);
      }
    } catch (error) {
      // Show error message that disappears after 2 seconds
      message.error("Error adding alumni", 2);
    }
  };

  const handleApprove = async (id) => {
    const updatedAlumniData = alumniData.map((alumni) =>
      alumni._id === id ? { ...alumni, isAuthorized: true } : alumni
    );
    try {
      const res = await Axios.post(`/alumni//approve/${id}`);
      if (res.status === 200) {
        console.log("User approved successfully");
        message.success("Alumni approved successfully!", 2);
      }
    } catch (e) {
      message.error("Sorry! Could not approve", 2);
      return;
    }
    setAlumniData(updatedAlumniData);
    setFilteredAlumni(updatedAlumniData);
    filterAlumniByApproval(filterStatus);
  };

  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(`/alumni/delete/${id}`);
      if (res.status === 200) {
        message.success("Alumni deleted successfully!", 2);
      } else {
        message.error("Error Occurred!");
        return;
      }
    } catch (err) {
      message.error("Alumni not deleted");
      return;
    }
    const updatedAlumniData = alumniData.filter((alumni) => alumni._id !== id);
    setAlumniData(updatedAlumniData);
    setFilteredAlumni(updatedAlumniData);
  };

  // Handle editing alumni
  const handleEdit = (record) => {
    setSelectedAlumni(record);
    setEditVisible(true);
  };

  // Update alumni information
  const handleUpdate = async (formData) => {
    try {
      // Log all key-value pairs in FormData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      // Send the updated data to the backend
      const res = await Axios.put(
        `/alumni/update/${selectedAlumni._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (res.status === 200) {
        const updatedAlumni = res.data;
        console.log(updatedAlumni, "Updated Alumni");
  
        // Ensure you're creating a new array reference to trigger React re-render
        const updatedData = alumniData.map((alumni) =>
          alumni._id === updatedAlumni._id ? updatedAlumni : alumni
        );
  
        // Use spread operator to create a new array
        setAlumniData([...updatedData]);
        setFilteredAlumni([...updatedData]);
  
        message.success("Alumni updated successfully!");
        setEditVisible(false); // Close the edit modal
      } else {
        message.error("Error updating alumni.");
      }
    } catch (error) {
      message.error("Failed to update alumni.");
      console.error(error); // Log the error for debugging
    }
  };
  

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Alumni Management</h2>

      {/* Buttons to filter alumni and search bar */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <Button
            type="default"
            onClick={resetFilter}
            style={filterStatus === "all" ? { fontWeight: "bold" } : {}}
          >
            All Alumni
          </Button>
          <Button
            type="primary"
            onClick={() => filterAlumniByApproval("approved")}
            style={
              filterStatus === "approved"
                ? { fontWeight: "bold", marginLeft: "10px" }
                : { marginLeft: "10px" }
            }
          >
            Approved Alumni
          </Button>
          <Button
            type="danger"
            onClick={() => filterAlumniByApproval("unapproved")}
            style={
              filterStatus === "unapproved"
                ? { fontWeight: "bold", marginLeft: "10px" }
                : { marginLeft: "10px" }
            }
          >
            Unapproved Alumni
          </Button>
        </div>

        {/* Search bar */}
        <Input.Search
          placeholder="Search alumni by name, email, mobile..."
          allowClear
          enterButton
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      {/* Button to add a new alumni */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
        className="mb-4"
      >
        Add Alumni
      </Button>

      {/* Alumni Management Table */}
      <Table columns={columns} dataSource={filteredAlumni} rowKey="_id" />

      {/* Modal to add/edit alumni */}
      <AlumniForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
        initialValues={null}
        isEdit={false}
      />

      {/* Modal to edit alumni */}
      <AlumniForm
        visible={editVisible}
        onCreate={handleUpdate}
        onCancel={() => setEditVisible(false)}
        initialValues={selectedAlumni}
        isEdit={true}
      />
    </div>
  );
};

export default AlumniManagement;
