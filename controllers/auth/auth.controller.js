const db = require("../../models")
const { checkOtp, sendOtp } = require("../../service/auth.service")
const { hashPassword } = require("../../utils")
const User = db.User
const bcrypt = require("bcryptjs")

//Route: /v1/api/user/register
// Method: POST
// Access: Private
const registerUser = async (req, res) => {
    try {
        const { name, phone, password, confirm_password } = req.body

    if(!name || !phone || !password || !confirm_password){
        return res.status(400).json({
            message: "Hamma zonalarni to'ldirishingiz majburiy!!!"
        })
    }


    const existUser = await User.findOne({where: {phone}})
    if(existUser){
        return res.status(409).json({
            message: "Bu raqamga akaunt ochilgan!"
        })
    }
    if(password !== confirm_password){
        return res.status(400).json({
            message: "Parollar bir biriga mos emas!"
        })
    }
    if(!req.files){
        const newUser = await User.create({
            name,
            phone,
            password: await hashPassword(password, 10)
        })
        res.status(201).json({
            message: "User successfully created!",
            user: newUser
        })
    }
    else{
        const newUser = await User.create({
            name,
            phone,
            avatar: `${req.protocol}://${req.host}/uploads/${req.file.filename}`,
            password: await hashPassword(password, 10)
        })
        res.status(201).json({
            message: "User successfully created!",
            user: newUser
        })
    }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const login = async (req, res) => {
    try {
        const {phone, password} = req.body

    if(!phone || !password){
        return res.status(400).json({
            message: "Hamma ma'lumotlarni to'ldirishingiz shart!"
        })
    }
    const user = await User.findOne({where: { phone }})

    if(!user){
        return res.status(400).json({
            message: "Bunday foydalanuvchi yo'q"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({
            message: "Parol xato!"
        })
    }

    req.session.user = user
    req.session.user.is_active = true

    if(user.role=="admin"){
        return res.redirect('/v1/api/admin/')
    }
    

    await User.update({
        is_active: true
    },
    {
        where: { id: user.id}
    })

    res.status(200).json({
        message: "Kirish amalga oshirildi!"
    })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const logout = async (req, res) => {
    try {
        await User.update({
            is_active: false
        },
        {
            where: { id: req.session.user.id}
        })
    req.session.destroy((err)=>{
        if(err) throw err;

        return res.status(200).json({ message: "Chiqish amalga oshirildi" })
    })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    registerUser,
    login,
    logout
}