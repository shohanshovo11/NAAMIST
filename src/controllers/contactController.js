const Contact = require('../models/contact');
const { sendEmail } = require('../utils/emailConfig');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      email,
      message
    });
    await contact.save();

    // Send email to admin
    const emailContent = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Message: ${message}
      
      Submitted on: ${new Date().toLocaleString()}
    `;

    await sendEmail({
      to: process.env.ADMIN_EMAIL, // Add ADMIN_EMAIL to your .env file
      subject: 'Feedback form - NAAMIST',
      text: emailContent,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form'
    });
  }
}; 