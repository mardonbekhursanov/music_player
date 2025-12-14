const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
        require: true,
        rejectUnauthorized: false,
        },
    },
})

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize
db.Session = require("./session.model")(sequelize, Sequelize)
db.User = require("./user.model")(sequelize, Sequelize)
db.Song = require("./songs.model")(sequelize, Sequelize)
db.Playlist = require("./playlist.model")(sequelize, Sequelize)

db.User.hasMany(db.Song, {
    as: "songs",
    onDelete: "CASCADE",
    constraints: true
})
db.User.hasMany(db.Playlist, {
    as: "playlist",
    onDelete: "CASCADE",
    constraints: true
})
db.Playlist.belongsToMany(db.Song, { through: "PlaylistSongs", as: "songs" });
db.Song.belongsToMany(db.Playlist, { through: "PlaylistSongs", as: "playlists" });

db.Song.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user"
})
db.Playlist.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user"
})
module.exports = db