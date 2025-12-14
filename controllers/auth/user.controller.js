const db = require("../../models")
const { hashPassword } = require("../../utils")
const User = db.User
const putUser = async (req, res) => {
    try {
        const {phone, name, password} = req.body
    if(!phone || !name || !password){
        return res.status(400).json({
            message: "Hamma maydonlarni to'ldirishiniz shart!"
        })
    }
    const existUser = await User.findOne({where: {phone}})
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
            phone
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
const deleteUser = async (req, res) => {
    try {
        await User.destroy({where: {id: req.session.user.id}})
        req.session.destroy((err)=>{
            if(err) throw err;
            return res.status(200).json({
                message: "Successfully deleted!"
            })
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    putUser,
    deleteUser
}