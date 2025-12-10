const express = require("express")
const app = express()
require("dotenv").config()
const pool = require('./config')
const db = require("./models")
const { adminRegister } = require('./controllers')

//CORS
const cors = require("cors")
app.use(cors({
    origin: "*",
    credentials: true
}))
require('colors')
const session = require("express-session")
const pgStore = require("connect-pg-simple")(session)
const path = require("path")

// Middlewares
app.use(session({
    store: new pgStore({
        tableName: "user_session",
        pool
    }),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use("/v1/api/admin", require("./routes/admin.route"))
app.use("/v1/api/auth/", require("./routes/auth.route"))
app.use("/v1/api/user/", require("./routes/user.route"))

app.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "Music Player Backend",
        ok: true
    })
})
app.use((req, res, next)=>{
    res.status(403).json({
        message: "NOT FOUND!"
    })
})

// Start
const PORT = process.env.PORT
const start = async () => {
    try {
        await db.sequelize.authenticate()
        console.log("\nSuccessfully database connected ✅".green);
        
    } catch (error) {
        console.log("Database not connected ❌");
        
    }
    await db.sequelize.sync({force: true})

    await adminRegister()
    app.listen(PORT, (err)=>{
    console.log(`\nServer is running on http://localhost:${PORT}`.cyan.bold, "-- Serverning localhosti".gray);
    })
}
start()