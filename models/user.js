const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../database');

const User = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: Sequelize.STRING,
    name: Sequelize.STRING,
    state: Sequelize.STRING,
    city: Sequelize.STRING,
},{
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    },
})

module.exports = User;