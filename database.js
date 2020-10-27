const Sequelize = require('sequelize');

// const sequelize = new Sequelize('schoolAd-dev','root', 'aviral', { //db name, username, password
//     dialect: 'mysql',
//     host: 'localhost'
// })

const sequelize = new Sequelize('UqKiqsCK8C','UqKiqsCK8C', 'L5MX0w3fcW', {
    dialect: 'mysql',
    host: 'remotemysql.com'
})


module.exports = sequelize;
