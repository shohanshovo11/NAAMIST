import { useState, useEffect } from 'react';
import { Form, Input, Button, message, Modal, Card, Space } from 'antd';
import Axios from '../../utils/axios';

const { TextArea } = Input;

function QuoteManagement() {
  const [quotes, setQuotes] = useState([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingQuote, setEditingQuote] = useState(null);

  // Fetch quotes
  const fetchQuotes = async () => {
    try {
      const response = await Axios.get('/quotes');
      setQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      message.error('Failed to fetch quotes');
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // Add new quote
  const handleAddQuote = async (values) => {
    try {
      await Axios.post('/quotes', values);
      form.resetFields();
      fetchQuotes();
      message.success('Quote added successfully');
    } catch (error) {
      console.error('Error adding quote:', error);
      message.error('Failed to add quote');
    }
  };

  // Update quote
  const handleUpdateQuote = async (values) => {
    try {
      await Axios.put(`/quotes/${editingQuote._id}`, values);
      setEditingQuote(null);
      fetchQuotes();
      message.success('Quote updated successfully');
    } catch (error) {
      console.error('Error updating quote:', error);
      message.error('Failed to update quote');
    }
  };

  // Delete quote
  const handleDeleteQuote = (quote) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this quote?',
      content: `"${quote.text}" - ${quote.author}`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await Axios.delete(`/quotes/${quote._id}`);
          fetchQuotes();
          message.success('Quote deleted successfully');
        } catch (error) {
          console.error('Error deleting quote:', error);
          message.error('Failed to delete quote');
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Quote Management</h2>

      {/* Add New Quote Form */}
      <Card title="Add New Quote">
        <Form
          form={form}
          onFinish={handleAddQuote}
          layout="vertical"
        >
          <Form.Item
            name="text"
            label="Quote Text"
            rules={[{ required: true, message: 'Please enter the quote text' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please enter the author' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Quote
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Edit Quote Modal */}
      <Modal
        title="Edit Quote"
        open={!!editingQuote}
        footer={null}
        onCancel={() => setEditingQuote(null)}
      >
        <Form
          form={editForm}
          onFinish={handleUpdateQuote}
          layout="vertical"
          initialValues={editingQuote}
        >
          <Form.Item
            name="text"
            label="Quote Text"
            rules={[{ required: true, message: 'Please enter the quote text' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please enter the author' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update Quote
              </Button>
              <Button onClick={() => setEditingQuote(null)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Quotes List */}
      <Card title="All Quotes">
        <div className="space-y-4">
          {quotes.map((quote) => (
            <Card
              key={quote._id}
              className="bg-gray-50"
              actions={[
                <Button 
                  type="link" 
                  onClick={() => {
                    setEditingQuote(quote);
                    editForm.setFieldsValue(quote);
                  }}
                >
                  Edit
                </Button>,
                <Button 
                  type="link" 
                  danger 
                  onClick={() => handleDeleteQuote(quote)}
                >
                  Delete
                </Button>
              ]}
            >
              <p className="text-lg mb-2">{quote.text}</p>
              <p className="text-gray-600 italic">- {quote.author}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default QuoteManagement; 