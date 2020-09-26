const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../database');

const School = sequelize.define('school',{
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
    // instanceMethods: {
    //     validPassword: (password) => {
    //         return bcrypt.compareSync(password,this.password);
    //     }
    // }
})

// const hashPassword = async(password)=>{
//     try{
//         const hashedPassword = await bcrypt.hash(password,10);
//         return hashedPassword;
//     }catch(e){
//         console.log(e);
//     }
// }

module.exports = School;