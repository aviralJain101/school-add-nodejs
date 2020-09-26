const Sequelize = require('sequelize');

const sequelize = require('../database');

const FilledForm = sequelize.define('filledForm',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    formData : {
        type: Sequelize.JSON,
    },
    feePaid: {
        type: Sequelize.STRING,
        defaultValue: "0",
    },
    approval: {
        type: Sequelize.INTEGER,
        defaultValue: 0  //-1 if discarded  0 pending  1 approved
    }
});

module.exports = FilledForm;