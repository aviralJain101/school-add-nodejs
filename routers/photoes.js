const express = require('express')

const School = require('../models/school');
const User = require('../models/user');
const Photo = require('../models/photoes');
const authSchool = require('../middleware/auth_school');
const authUser = require('../middleware/auth_user');

const router = new express.Router();

//post for school
router.post('/photo/school', authSchool.schoolAuth, async(req, res) => {
    const school = req.school;
    try{
        var photoUrls = [];
        photoUrls = req.body.photoUrls;
        for(var i=0;i<photoUrls.length;i++){
            const photo = await Photo.create({
                by: 0,
                schoolName: school.name,
                schoolId: school.id,
                photoUrl: req.body.photoUrls[i]
            })
        }
        res.send(photoUrls);
    }catch(e){
        res.status(440).send(e);
    }
})

//get all photo from School
router.get('/photo/school', authSchool.schoolAuth, async(req, res) => {
    const school = req.school;
    try{
        const photo = await Photo.findAll({
            where: {
                schoolId: school.id,
                by: 0
            }
        })
        //console.log(Array.isArray(photo));
        var urls = [];
        for(var i=0;i<photo.length;i++){
            urls.push(photo[i].photoUrl);
        }
        res.send(urls);
    }catch(e){
        res.status(404).send(e);
    }
})

module.exports = router;