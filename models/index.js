const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
})

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize
db.Session = require("./session.model")(sequelize, Sequelize)
db.User = require("./user.model")(sequelize, Sequelize)

module.exports = db