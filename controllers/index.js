// Admin
const { 
    adminRegister, 
    updateAdmin,
    getAdminPage,
 } = require("./admin.controller");
 //Auth
const { 
    registerUser,
    login,
    logout,
 } = require('./auth.controller')

// User
const {
    putUser
} = require("./user.controller")



//Export
module.exports = {
    adminRegister,
    updateAdmin,
    registerUser,
    getAdminPage,
    login,
    logout,
    putUser
}