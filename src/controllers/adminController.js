const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Check if the 'images' folder exists, if not, create it
const ensureImagesFolderExists = () => {
  const uploadDir = path.join(__dirname, '../../images');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

// Multer setup to save images to the 'images' folder
const storage = multer.diskStorage({
  destination(req, file, cb) {
    ensureImagesFolderExists(); // Ensure folder exists before saving
    cb(null, 'images'); // Save to the 'images' folder
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Middleware for handling image uploads
const upload = multer({ storage }).single('img');

// Upload image controller
const uploadImage = async (req, res) => {
  // Ensure 'images' folder exists
  ensureImagesFolderExists();

  // Proceed with upload
  upload(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Failed to upload image.' });
    }

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Get the URL of the uploaded image
    const imageUrl = `${req.file.filename}`;

    // Return the image URL
    res.status(200).json({ imageUrl });
  });
};

module.exports = {
  uploadImage,
};
