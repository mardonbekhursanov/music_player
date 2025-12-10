const route = require("express").Router()
const  { 
    updateAdmin, 
    getAdminPage, 
} = require("../controllers") 

const isAdmin = require("../middlewares/isadmin")

const { protect, guest } = require("../middlewares/protection")

route.put("/update/superuser", protect, isAdmin, updateAdmin)
route.get("/", protect, isAdmin, getAdminPage)



module.exports = route