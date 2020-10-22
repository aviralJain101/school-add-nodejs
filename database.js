const Sequelize = require('sequelize');

// const sequelize = new Sequelize('schoolAd-dev','root', 'aviral', { //db name, username, password
//     dialect: 'mysql',
//     host: 'localhost'
// })

const sequelize = new Sequelize('ssRMgAvW0H','ssRMgAvW0H', 'uxgbpiR5iv', {
    dialect: 'mysql',
    host: 'remotemysql.com'
})


module.exports = sequelize;
