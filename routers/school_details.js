const express = require('express')

const School = require('../models/school');
const Schooldetail = require('../models/school_details');
const auth = require('../middleware/auth');
const authSchool = require('../middleware/auth_school');

const router = new express.Router();

//school details create/update
router.post('/school/details',authSchool.schoolAuth,async(req,res)=>{
    const school = req.school;
    try{
        const schoolDetail = await Schooldetail.findOne({where: {schoolId:school.id}});
        if(!schoolDetail){
            const detail = await school.createSchooldetail(req.body);
            console.log("created school details");
            res.status(201).send(detail);
        }
        const detail = await Schooldetail.update(req.body,{
            where: {schoolId: school.id}
        });
        res.status(204).send(detail);
    }catch(e){
        res.status(440).send(e);
    }
});

//get school details by schoolId;
router.get('/school/details', authSchool.schoolAuth, async(req, res)=>{
    const schoolId = req.school.id;
    try{
        const school = await Schooldetail.findOne({
            where: {
                schoolId: schoolId
            }
        })
        if(!school){
            res.status(404).send('School Details not found')
        }
        res.send(school);
    }catch(e){
        res.status(440).send(e);
    }
} )

//get school details by id; 
router.get('/school/details/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const school = await Schooldetail.findByPk(id);
        if(!school){
            res.status(404).send('School Not found');
        }
        res.send(school);
    }catch(e){
        res.send(e);
    }
})

//list of all the schools
router.get('/school/list', async(req,res)=>{
    try{
        const schools = await Schooldetail.findAll();
        res.send(schools);
    }catch(e){
        res.status(440).send(e);
    }
})

//list of all the schools which are active
router.get('/school/list/active', async(req,res)=>{
    try{
        const schools = await Schooldetail.findAll({
            where: {
                isActive: 1
            }
        });
        res.send(schools);
    }catch(e){
        res.status(440).send(e);
    }
})

//get List of Schools according to city of User
router.get('/school/list/:city', async(req, res)=>{
    const city = req.params.city;
    try{
        const schools = await Schooldetail.findAll({
            where: {
                city: city,
                isActive: 1
            }
        })
        res.send(schools);
    }catch(e){
        res.status(440).send(e);
    }
})

module.exports = router;