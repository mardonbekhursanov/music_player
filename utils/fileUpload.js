const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb)=>{
        return cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: { fieldSize: 1000000},
    fileFilter: (req, file, cb)=>{
        const filetypes = /jpg|png|svg|jpeg|wepb|heic/
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = filetypes.test(file.mimetype)

        if(extname && mimetype){
            return cb(null, true)
        }
        else{
            return cb("Error: You can only upload image file!")
        }
    }
})

module.exports = upload