import { Helmet } from "react-helmet-async";
import HeroSection from "../Common/HeroSection";
import { message } from 'antd';
import axios from '../../utils/axios';
import { useState } from 'react';

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/contact/submit', formData);
      console.log(response.data);
      if (response.data.success) {
        message.success('Thank you for your message. We will get back to you soon!');
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      if(error?.response?.data?.errors?.[0]){
        message.error(error?.response?.data?.errors?.[0]?.msg);
        return;
      }
      console.error('Contact form error:', error);
      message.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - NAAMIST</title>
        <meta
          name="description"
          content="Get in touch with the NAME Alumni Association of MIST. Fill out the feedback form or find our location on the map."
        />
        <meta
          name="keywords"
          content="contact NAAMIST, contact NAME Alumni, MIST contact, alumni association contact, NAME MIST"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Contact Us - NAAMIST" />
        <meta
          property="og:description"
          content="Reach out to the NAME Alumni Association of MIST for any inquiries or feedback. Find our location or send us a message."
        />
        <meta
          property="og:image"
          content="https://plus.unsplash.com/premium_photo-1675842663249-a8b70103dbaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <meta property="og:url" content="/contact-us" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - NAAMIST" />
        <meta
          name="twitter:description"
          content="Send feedback or inquiries to the NAME Alumni Association of MIST. Find our location or leave a message."
        />
        <meta
          name="twitter:image"
          content="https://plus.unsplash.com/premium_photo-1675842663249-a8b70103dbaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        {/* Canonical Link */}
        <link rel="canonical" href="/contact-us" />
      </Helmet>
      <HeroSection
        title={"Contact Us"}
        imageUrl={
          "https://plus.unsplash.com/premium_photo-1675842663249-a8b70103dbaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <div className="max-w-screen-lg mx-auto p-6 mt-8">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Feedback Form */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Feedback Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary text-white py-2 rounded-md hover:bg-black transition duration-200 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Sending...' : 'Send Feedback'}
              </button>
            </form>
          </div>

          {/* Location Iframe */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Our Location
            </h2>
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1MZKGYqnztQJPknILOFjTvwvYoPQ&ehbc=2E312F"
              width="100%"
              height="380"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
