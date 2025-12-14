module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define('song', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "https://s3u.tmimgcdn.com/u78405566/413cf5f2e65a6b39249557b2a040f376.gif"
        },
        views: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        artist: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Song
}