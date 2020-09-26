const express = require('express')

const User = require('../models/user');
const authUser = require('../middleware/auth_user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/user/register',async(req,res)=>{
    try{
        const user = await User.create(req.body);
        const token = auth.generateAuthToken(user);
        res.status(201).send({token});
    }catch(e){
        res.status(400).send(e);
    }
})

router.post('/user/login',async(req,res)=>{
    try{
        const user = await authUser.findByCredentials(req.body.email, req.body.password);
        const token = auth.generateAuthToken(user);
        console.log(token)
        res.send({token});
    }catch(e){
        res.status(400).send(e);
    }
})

//update user details
router.patch('/user/profile', authUser.userAuth, async(req,res)=>{
    const allowedUpdates = ['name','phone','state','city'];
    const updates = Object.keys(req.body);
    const isValid = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValid){
        return res.status(400).send('Invalid update');
    }
    const user = req.user;
    try{
        const updatedUser = await User.update(req.body,{
            where: {
                id: user.id
            }
        });
        res.send(updatedUser);
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;