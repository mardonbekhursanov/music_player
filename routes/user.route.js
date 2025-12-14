const route = require("express").Router()

const  { putUser, deleteUser } = require("../controllers")

const { protect, guest } = require("../middlewares/protection")
const upload = require("../utils/fileUpload")

route.put("/update", 
    protect,
    upload.single("image_url"),
    putUser)
route.delete("/delete", protect, deleteUser)
module.exports = route