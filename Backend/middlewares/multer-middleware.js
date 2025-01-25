const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/temp"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileExtension = file.originalname.split('.').pop();  // get file extension
        cb(null, `${uniqueSuffix}-${req.body.name}.${fileExtension}`);
    }
});

const upload = multer({ 
    storage, 
});

module.exports = upload;
