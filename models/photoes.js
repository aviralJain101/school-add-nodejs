const Sequelize = require('sequelize');

const sequelize = require('../database');

const Photo = sequelize.define('photo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    by: {
        type: Sequelize.INTEGER, //0 by school and 1 by user for a form
        allowNull: false
    },
    userName: Sequelize.STRING,
    schoolName: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    schoolId: Sequelize.INTEGER,
    formId: Sequelize.INTEGER,
    photoUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Photo;