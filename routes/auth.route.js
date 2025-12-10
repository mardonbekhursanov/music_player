const route = require("express").Router()

const  { registerUser, login, logout } = require("../controllers")

const { protect, guest } = require("../middlewares/protection")
const upload = require("../utils/fileUpload")

route.post("/register",
    upload.single("image_url"),
    registerUser)

route.post("/login", guest, login)
route.get('/logout', protect, logout)
    
module.exports = route