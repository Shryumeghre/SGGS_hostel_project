const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        console.log("Uploading file to Cloudinary:");

        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "hostel_uploads",
        });

        // console.log("Cloudinary Upload Response:", response);

        if (response?.secure_url) {
            // Delete file only if upload was successful
            fs.unlinkSync(localFilePath);
            console.log("Local file deleted:", localFilePath);
            return response;
        } else {
            console.log("Cloudinary upload failed:", response);
            return null;
        }
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

// const deleteFromCloudinary = async (cloudFilePublicId) => {
//     try {
//         const response = await cloudinary.uploader.destroy(cloudFilePublicId);
//         console.log("File deleted from Cloudinary:", response);
//         return response;
//     } catch (error) {
//         console.error("Deletion from Cloudinary failed:", error);
//         return null;
//     }
// };

module.exports = { uploadOnCloudinary };
