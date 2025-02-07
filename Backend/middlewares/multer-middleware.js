const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../public/temp");
        console.log("Saving file to:", uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileExtension = path.extname(file.originalname).slice(1) || "unknown";  
        const name = req.body.name || "default";  
        const filename = `${uniqueSuffix}-${name}.${fileExtension}`;
        console.log("Generated Filename:", filename);
        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;
