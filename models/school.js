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
    accountNumber: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    ifscCode: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    accountName: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    bankLocation: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    approval: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
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