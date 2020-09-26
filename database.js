const Sequelize = require('sequelize');

const sequelize = new Sequelize('schoolAd-dev','root', 'aviral', {
    dialect: 'mysql',
    host: 'localhost'
})


module.exports = sequelize;
