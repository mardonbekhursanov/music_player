const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fieldSize: 1000000 },
    fileFilter: (req, file, cb) => {

        // Ruxsat berilgan extensionlar
        const extAllowed = /jpg|jpeg|png|svg|webp|heic|mp3|aac|wav/;

        // Ruxsat berilgan MIME typelar
        const mimeAllowed = /image\/(jpg|jpeg|png|svg\+xml|webp|heic)|audio\/(mpeg|aac|wav)/;

        const extname = extAllowed.test(path.extname(file.originalname).toLowerCase());
        const mimetype = mimeAllowed.test(file.mimetype.toLowerCase());

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            return cb("Error: You can only upload valid image or music files!");
        }
    }
});

module.exports = upload;
