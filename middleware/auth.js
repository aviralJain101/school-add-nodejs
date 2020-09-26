const jwt = require('jsonwebtoken')

const generateAuthToken = (user)=>{
    const token = jwt.sign({pk:user.id},'wave');
    return token;
}

module.exports = {
    generateAuthToken
}