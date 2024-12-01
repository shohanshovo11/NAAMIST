import { useState, useEffect } from 'react';
import { Table, Button, Upload, Form, Input, Modal, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Axios from '../../utils/axios';

const imgUrl = import.meta.env.VITE_IMAGE_URL;

const HeroSliderManagement = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [form] = Form.useForm();

  const fetchSlides = async () => {
    try {
      const response = await Axios.get('/hero-slider');
      setSlides(response.data);
      console.log(response.data, "response.data");
    } catch (error) {
      message.error('Failed to fetch slides');
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      console.log(values.sliderImage, "values.sliderImage");
      if (values.sliderImage && values.sliderImage[0]) {
        formData.append('sliderImage', values.sliderImage[0].originFileObj);
        console.log(values.sliderImage[0].originFileObj, "values.sliderImage.fileList[0].originFileObj");
      }
      formData.append('title', values.title || '');
      formData.append('description', values.description || '');
      formData.append('order', values.order || 0);

      if (editingSlide) {
        await Axios.put(`/hero-slider/${editingSlide._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success('Slide updated successfully');
      } else {
        await Axios.post('/hero-slider', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success('Slide added successfully');
      }

      setModalVisible(false);
      form.resetFields();
      fetchSlides();
    } catch (error) {
      console.error('Error:', error);
      message.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/hero-slider/${id}`);
      message.success('Slide deleted successfully');
      fetchSlides();
    } catch (error) {
      message.error('Failed to delete slide');
    }
  };

  const columns = [
    {
      title: 'sliderImage',
      dataIndex: 'sliderImage',
      render: (image) => (
        <>
        <img src={`${imgUrl}/slider/${image}`} 
             alt="slider" 
             style={{ width: 100 }} />
             {console.log(image, "hii")}
        </>
      )
    },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Order', dataIndex: 'order' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingSlide(record);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          />
          <Button 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => handleDelete(record._id)}
          />
        </>
      )
    }
  ];

  return (
    <div>
      <Button 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingSlide(null);
          form.resetFields();
          setModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add New Slide
      </Button>

      <Table 
        columns={columns} 
        dataSource={slides}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingSlide ? 'Edit Slide' : 'Add New Slide'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item 
            name="sliderImage" 
            label="Image"
            valuePropName="file"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload.Dragger 
              maxCount={1}
              beforeUpload={() => false}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">
                <PlusOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to upload</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="order" label="Order">
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingSlide ? 'Update' : 'Add'} Slide
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default HeroSliderManagement; 