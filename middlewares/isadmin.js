const isAdmin = (req, res, next) => {
    if(req.session.user?.role === "admin"){
        return next()
    }
    return res.status(403).json({ message: "Siz admin emassiz" })
}
module.exports = isAdmin