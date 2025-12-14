const db = require('../../models')
const User = db.User
const { hashPassword } = require("../../utils")

const adminRegister = async () => {
    try {
        const admin = await User.findOne({ where: { role: "admin" }})
        if(!admin){
            await User.create({
                name: process.env.ADMIN_USERNAME,
                phone: process.env.ADMIN_PHONE,
                password: await hashPassword(process.env.ADMIN_PASSWORD, 10),
                role: "admin",
                is_active: false
            })
            return
        }
    } catch (error) {
        console.log(error.message);
        
    }

}
const getAdminPage = async (req, res) => {
    try {
        const users = await User.findAll({
            raw: true,
            nest: true
        })
        return res.status(200).json({
            message: "Barcha Userlarni ma'lumotlari",
            users: users
        })
    } catch (error) {
        return res.status(500).json({ error: "Xatolik yuz berdi" });
    }
}
module.exports = {
    adminRegister,
    getAdminPage
}