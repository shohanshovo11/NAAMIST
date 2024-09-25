const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Specify the directory where images will be stored
const uploadDirectory = path.join(__dirname, '../../images/announcements');

// Configure multer for image uploads with folder existence check
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Check if the directory exists
    if (!fs.existsSync(uploadDirectory)) {
      // Create the directory if it doesn't exist
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory); // Set the directory for storing files
  },
  filename(req, file, cb) {
    // Create a unique filename with a timestamp and original extension
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extName = path.extname(file.originalname);
    cb(null, `announcement-${uniqueSuffix}${extName}`);
  },
});

// File filter to only accept image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb('Error: Only images are allowed');
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
