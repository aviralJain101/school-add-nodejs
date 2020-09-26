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
            res.send(detail);
        }
        const detail = await Schooldetail.update(req.body,{
            where: {schoolId: school.id}
        });
        res.send(detail);
    }catch(e){
        res.status(440).send(e);
    }
});

module.exports = router;