const db = require('../models')
const User = db.User
const { hashPassword } = require("../utils")
const fs = require("fs")
const path = require("path")
const envPath = path.join(__dirname, "../.env")

const adminRegister = async () => {
    try {
        const admin = await User.findOne({ where: { role: "admin" }})
        if(!admin){
            await User.create({
                name: process.env.ADMIN_USERNAME,
                email: process.env.ADMIN_EMAIL,
                password: await hashPassword(process.env.ADMIN_PASSWORD, 10),
                role: "admin",
                is_active: false
            })
            return
        }
    } catch (error) {
        res.status(500).json({ error: "Xatolik yuz berdi" });
    }

}

const updateAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existUser = await User.findOne({where: {email}})

        if(existUser){
            return res.status(401).json({
                message: "Bu emailga akaunt ochilgan"
            })
        }

        const updatedDataAdmin = `
PORT=3400

# Database
DATABASE_URL=postgres://postgres:mardon03@localhost:5432/music_player

# Session
SECRET_SESSION='secret my session'

# Admin 
ADMIN_USERNAME="${name}"
ADMIN_EMAIL="${email}"
ADMIN_PASSWORD="${password}"
        `
        await fs.writeFileSync(envPath, updatedDataAdmin, "utf-8");

        const updatedData = await User.update(
            {
                name: name,
                email: email,
                password: await hashPassword(password, 10),
            },
            {
                where: {
                    role: "admin"
                },
                returning: true,
                raw: true,
                plain: true
            }
        )
        req.session.user = updatedData[1]
        req.session.user.is_active = true
        
        req.session.save((err)=>{
            if(err) throw err;
            return res.status(200).json({ message: "Admin yangilandi" });
        })
    } catch (error) {
        res.status(500).json({ error: "Xatolik yuz berdi" });
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
    updateAdmin,
    getAdminPage
}