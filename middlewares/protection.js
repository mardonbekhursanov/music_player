const protect = (req, res, next)=>{
    if(!req.session.user?.is_active){
        return res.status(404).json({
            message: "Avval kirishni amalga oshiring!"
        })
    }
    next()
}
const guest = (req, res, next)=>{
    if(req.session.user?.is_active){
        return res.status(404).json({
            message: "Kirishni amalga oshirib bo'lgansiz?"
        })
    }
    next()
}
module.exports = {
    protect, guest
}