const express = require('express')

const FilledForm = require('../models/filled_form');
const School = require('../models/school');
const User = require('../models/user');
const authUser = require('../middleware/auth_user');
const authSchool = require('../middleware/auth_school');
const Form = require('../models/form');

const router = new express.Router();

//create a filled form
router.post('/filledForm/:id', authUser.userAuth, async(req,res)=>{
    const user = req.user;
    const _id=req.params.id //form id
    try{
        const form = await Form.findByPk(_id);
        if(!form){
            throw new Error('404 Form not found');
        }
        const filledForm = await user.createFilledForm({
            formData: req.body.formData,
            feePaid: req.body.feePaid,
            formId: _id,
            schoolId: form.schoolId,
            schoolName: req.body.schoolName,
            clas: req.body.clas, 
        })
        res.send(filledForm);
    }catch(e){
        res.send(e);
    }
});

//update by user
router.patch('/filledForm/user/:id',authUser.userAuth, async(req,res)=>{
    const _id = req.params.id;//filled form id
    try{
        const filledForm = await FilledForm.findByPk(_id);
        if(!filledForm){
            res.status(404).send('Form not found');
        }
        if(filledForm.approval != 0){
            res.status(401).send('Cant update a processed form');
        }else{
            const newFilledForm = await FilledForm.update({
                formData: req.body.formData,
                feePaid: req.body.feePaid,
            },{
                where:{
                    id: filledForm.id,
                    userId: req.user.id
                }
            })
            res.send(newFilledForm);
        }
    }catch(e){
        res.send(e);
    }
})

//update by school
router.patch('/filledForm/school/:id',authSchool.schoolAuth, async(req,res)=>{
    const _id = req.params.id;//filled form id
    try{
        const newFilledForm = await FilledForm.update({
            approval: req.body.approval,
        },{
            where:{
                id: _id,
                schoolId: req.school.id
            }
        })
        res.send(newFilledForm);
    }catch(e){
        res.send(e);
    }
})

//delete by user
router.delete('/filledForm/:id',authUser.userAuth, async(req,res)=>{
    const _id = req.params.id;//filled form id
    try{
        await FilledForm.destroy({
            where:{
                id: _id,
                userId: req.user.id
            }
        })
        res.send('Form deleted');
    }catch(e){
        res.send(e);
    }
});

//get all filled form for a user
router.get('/filledForm/user', authUser.userAuth, async(req, res)=>{
    const _userId = req.user.id;
    try{
        const filledForms = await FilledForm.findAll({
            where: {
                userId: _userId
            }
        })
        res.send(filledForms);
    }catch(e){
        res.status(440).send(e)
    }
})

//get all filled forms for a school
router.get('/filledForm/school', authSchool.schoolAuth, async(req,res)=>{
    const schoolId = req.school.id;
    try{
        const forms = await FilledForm.findAll({
            where: {
                schoolId: schoolId
            }
        })
        res.send(forms);
    }catch(e){
        res.status(440).send(e)
    }
})

module.exports = router;