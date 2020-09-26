const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/user');

//middleware function
const userAuth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        //console.log(token);
        const decoded = jwt.verify(token,'wave');
        //console.log(decoded.pk); 
        const user = await User.findByPk(decoded.pk);
        //console.log(user);
        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }catch(e){
        res.status(401).send('authenticate first')
    }
}

//general function
const findByCredentials = async(email,password)=>{
    try{
        const user = await User.findOne({where: {email : email}});
        if(!user){
            throw new Error('Please Register first');
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new Error('Please enter valid credentials');
        }
        return user;
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    findByCredentials,
    userAuth
};