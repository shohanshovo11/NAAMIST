require('dotenv').config();

const express = require('express');

const app = express();
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/database');
const apiRoutes = require('./routes/index');

const port = process.env.PORT || 5000;

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

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the NAAMIST app.');
});

// Api routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  // Add 'next' as the fourth parameter
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Connect to the database
try {
  dbConnect();
} catch (error) {
  console.error('Database connection error: ', error);
}

app.listen(port, () => {
  console.log(`NAAMIST app listening on port ${port}!`);
  console.log(`Running on port: ${port}`);
});
