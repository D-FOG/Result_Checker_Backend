const express = require('express');
const router = express.Router();
const verifyEmail = require('../../Middlewares/verifyEmail')

router.get('/', verifyEmail )

module.exports = router