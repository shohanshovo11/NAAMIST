import { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "../../utils/axios";

export default function PostAnnouncement() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Use the form instance

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("date", values.date.toISOString());
      formData.append("link", values.link);
      formData.append("isApproved", false);
      if (
        values.image !== undefined &&
        values?.image[0] &&
        values?.image[0]?.originFileObj
      ) {
        formData.append("announcementImg", values.image[0].originFileObj);
      }
      await Axios.post("/announcements", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Announcement posted successfully!");
      form.resetFields(); // Reset form fields after successful submission
    } catch (error) {
      console.error("Error posting announcement:", error);
      message.error("Failed to post announcement.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-center mb-6 text-2xl font-semibold">
        Post Announcement
      </h2>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Form
            form={form} // Attach form instance to the Form component
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              isApproved: false,
            }}
            className="space-y-4"
          >
            {/* Title */}
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input
                placeholder="Enter the announcement title"
                size="large"
                className="rounded-md"
              />
            </Form.Item>

            {/* Description */}
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter the description"
                size="large"
                className="rounded-md"
              />
            </Form.Item>

            {/* Date */}
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select the date!" }]}
            >
              <DatePicker className="w-full rounded-md" size="large" />
            </Form.Item>

            {/* Image */}
            <Form.Item
              label="Image"
              name="image"
              valuePropName="file"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              extra="Upload an image for the announcement"
            >
              <Upload name="image" listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />} size="large">
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className="rounded-md"
              >
                Post Announcement
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
