const express = require('express')

const Form = require('../models/form');
const authSchool = require('../middleware/auth_school');
const School = require('../models/school');

const router = new express.Router();

//form create
router.post('/school/form',authSchool.schoolAuth,async(req,res)=>{
    const school = req.school;
    try{
        //console.log(req.body.formData); 
        //const formData = JSON.stringify(req.body.formData.toString());
        const newForm = await school.createForm(req.body);
        res.send(newForm);
    }catch(e){
        res.status(440).send(e);
    }
});

//update form
router.patch('/school/form/:id',authSchool.schoolAuth,async(req,res)=>{
    const school = req.school;
    try{
        const newForm = await Form.update(req.body,{
            where: {schoolId: school.id, id: req.params.id}
        });
        res.send(newForm);
    }catch(e){
        res.status(440).send(e);
    }
});


module.exports = router;