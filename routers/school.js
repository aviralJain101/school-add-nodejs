const express = require('express')

const School = require('../models/school');
const auth = require('../middleware/auth');
const authSchool = require('../middleware/auth_school');

const router = new express.Router();

//authentication 
router.post('/school/register',async(req,res)=>{
    try{
        const school = await School.create(req.body);
        const token = auth.generateAuthToken(school);
        const approval = school.approval;
        res.status(201).send({token, approval});
    }catch(e){
        res.status(400).send(e);
    }
})

router.post('/school/login',async(req,res)=>{
    try{
        const school = await authSchool.findByCredentials(req.body.email, req.body.password);
        const token = auth.generateAuthToken(school);
        const approval = school.approval;
        res.status(201).send({token, approval});
    }catch(e){
        res.status(400).send(e);
    }
})


module.exports = router;