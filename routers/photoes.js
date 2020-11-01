const express = require('express')

const School = require('../models/school');
const Schooldetail = require('../models/school_details');
const User = require('../models/user');
const Photo = require('../models/photoes');
const authSchool = require('../middleware/auth_school');
const authUser = require('../middleware/auth_user');

const router = new express.Router();


module.exports = router;