const Sequelize = require('sequelize');

const sequelize = require('../database');

const Schooldetail = sequelize.define('schooldetail',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    fees: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNo: Sequelize.STRING,
    telegram: Sequelize.STRING,
    website: Sequelize.STRING,
    board: {
        type: Sequelize.STRING,
        defaultValue: "CBSE",
    },
    standard: {
        type: Sequelize.STRING,
        defaultValue: "SR. Sec."
    },
    medium: {
        type: Sequelize.STRING,
        defaultValue: "English",
    }
});

module.exports = Schooldetail;