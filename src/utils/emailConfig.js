const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Generic email sending function
const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: '"NAAMIST Support" <naamist240@gmail.com>',
    to,
    subject,
    text,
    html: html || text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: '"NAAMIST Support" <naamist240@gmail.com>',
    to: email,
    subject: 'Password Reset OTP - NAAMIST',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>You have requested to reset your password for your NAAMIST account.</p>
        <div style="background-color: #f4f4f4; padding: 15px; margin: 20px 0; text-align: center; border-radius: 5px;">
          <h3 style="margin: 0;">Your OTP is: <strong style="color: #4a90e2;">${otp}</strong></h3>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated email from NAAMIST. Please do not reply to this email.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Test the email configuration
const testEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('SMTP connection established successfully');
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
};

module.exports = { 
  sendEmail,
  sendOTPEmail,
  testEmailConfig 
}; 