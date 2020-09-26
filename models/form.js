const Sequelize = require('sequelize');

const sequelize = require('../database');

const Form = sequelize.define('form',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    schoolName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    class: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    initialCharge: {
        type: Sequelize.STRING,
        defaultValue: "1000 Rs",
    },
    formData : {
        type: Sequelize.JSON,
    },
    availableSeats: Sequelize.INTEGER,
})

module.exports = Form;