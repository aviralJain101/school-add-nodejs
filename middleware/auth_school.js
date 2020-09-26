const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const School = require('../models/school');

//middleware function
const schoolAuth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        //console.log(token);
        const decoded = jwt.verify(token,'wave');
        //console.log(decoded.pk); 
        const school = await School.findByPk(decoded.pk);
        //console.log(school);
        if(!school){
            throw new Error();
        }
        req.token = token;
        req.school = school;
        next();
    }catch(e){
        res.status(401).send('authenticate first')
    }
}

//general function
const findByCredentials = async(email,password)=>{
    try{
        const school = await School.findOne({where: {email : email}});
        if(!school){
            throw new Error('Please Register first');
        }
        const isMatch = await bcrypt.compare(password,school.password);
        if(!isMatch){
            throw new Error('Please enter valid credentials');
        }
        return school;
    }catch(e){
        throw e;
    }
}

module.exports = {
    findByCredentials,
    schoolAuth
};