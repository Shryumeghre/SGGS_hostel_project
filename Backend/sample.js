const cloudinary = require('../Backend/helper/cloudinary.config');

cloudinary.uploader.upload('C:/Users/shryu/Desktop/Donorplus_for_OTPtrial - Copy/Organ-Donation-System-DonarPlus/app/image.jpg', {
  folder: 'SGGS_hostel_project',
}, (error, result) => {
  if (error) {
    console.error('Cloudinary Upload Error:', error);
  } else {
    console.log('Cloudinary Upload Result:', result);
  }
});