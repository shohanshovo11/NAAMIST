const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Specify the directory where slider images will be stored
const uploadDirectory = path.join(__dirname, '../../images/slider');

// Configure multer for image uploads with folder existence check
const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('Upload directory:', uploadDirectory);
    // Check if the directory exists
    if (!fs.existsSync(uploadDirectory)) {
      console.log('Creating upload directory...');
      // Create the directory if it doesn't exist
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory);
  },
  filename(req, file, cb) {
    // Create a unique filename with timestamp and original extension
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extName = path.extname(file.originalname);
    const filename = `slider-${uniqueSuffix}${extName}`;
    console.log('Generated filename:', filename);
    cb(null, filename);
  },
});

// File filter to only accept image types
const fileFilter = (req, file, cb) => {
  console.log('Received file:', file.originalname);
  console.log('File mimetype:', file.mimetype);
  
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  console.log('File extension valid:', extName);
  console.log('Mimetype valid:', mimeType);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Error: Only images (jpeg, jpg, png, gif, webp) are allowed'));
  }
};

// Configure upload limits
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB max file size
  files: 1 // Maximum number of files
};

const upload = multer({
  storage: storage, 
  fileFilter: fileFilter
});

module.exports = upload;