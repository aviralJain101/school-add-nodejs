const Sequelize = require('sequelize');

// const sequelize = new Sequelize('schoolAd-dev','root', 'aviral', {
//     dialect: 'mysql',
//     host: 'localhost'
// })

const sequelize = new Sequelize('tm9VQ34BjO','tm9VQ34BjO', 'xIWrpV8Q9r', {
    dialect: 'mysql',
    host: 'remotemysql.com'
})


module.exports = sequelize;
