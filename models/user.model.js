module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "user"
        }
    }, {
        timestamps: true
    });

    return User;
};