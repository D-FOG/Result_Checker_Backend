const express = require('express');
const router = express.Router()
const studentLogin = require('../../Controllers/studentLogin')
const validateStudentLogin = require('../../Middlewares/validateStudentLogin')

router.post('/', validateStudentLogin, studentLogin)
module.exports = router