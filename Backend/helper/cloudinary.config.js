require('dotenv').config();
let cloudinary;
console.log("cloudinary config is running");
if (typeof window === 'undefined') {
  cloudinary = require('cloudinary').v2;

  // Ensure required environment variables are set
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error(
      'Missing required Cloudinary environment variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.'
    );
  }

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// console.log("cloudinary config is running");console.log('Cloudinary configuration started.');
// console.log('Cloudinary environment variables:', process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);
// console.log('Cloudinary configuration completed.');
// console.log('Cloudinary instance:', cloudinary);
module.exports = cloudinary;
