const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Import Cloudinary configuration
const cloudinary = require('./cloudinary.config'); // Ensure Cloudinary is configured properly
// Define Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "hostel-documents", // Folder in Cloudinary
      allowed_formats: ["jpg", "jpeg", "png", "pdf"], // Allowed file types
    },
  });
  
const upload = multer({ storage });
console.log("Multer after is running");
module.exports = upload;
