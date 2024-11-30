require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const dbConnect = require('./config/database');
const apiRoutes = require('./routes/index');
const { testEmailConfig } = require('./utils/emailConfig');

const app = express();
const port = process.env.PORT || 5000;

// Ensure uploads directory exists in the project root, create if not
const uploadsDir = path.join(__dirname, '../images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware Array
const middleware = [
  logger('dev'),
  cors(),
  cookieParser(),
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json(),
];

app.use(middleware);
app.use('/api/images', express.static('images'));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the NAAMIST app.');
});

// Api routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Connect to the database
try {
  dbConnect();
} catch (error) {
  console.error('Database connection error: ', error);
}

testEmailConfig()
  .then(() => {
    console.log('Email configuration test successful');
  })
  .catch(error => {
    console.error('Email configuration test failed:', error);
  });

app.listen(port, () => {
  console.log(`NAAMIST app listening on port ${port}!`);
  console.log(`Running on port: ${port}`);
});
