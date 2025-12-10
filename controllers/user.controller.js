const db = require("../models")
const { hashPassword } = require("../utils")
const User = db.User
const putUser = async (req, res) => {
    try {
        const {email, name, password} = req.body
    if(!email || !name || !password){
        return res.status(400).json({
            message: "Hamma maydonlarni to'ldirishiniz shart!"
        })
    }
    const existUser = await User.findOne({where: {email}})
    if(existUser){
        return res.status(400).json({
            message: "Bu emaildan foydalanilgan"
        })
    }
    if(req.session.user.role !== "admin"){
        const updatedUser = await User.update({
            // avatar :`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
            name, 
            password: await hashPassword(password, 10),
            email
        },
        {
            where: {
                id: req.session.user.id,
            },
            plain: true,
            returning: true
        })

        req.session.user = updatedUser[1]
        req.session.user.is_active = true
        req.session.save((err)=>{
            if(err) throw err;
            return res.status(201).json({
                message: "Successfully updated"
            })
        })
    }
    
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    putUser
}