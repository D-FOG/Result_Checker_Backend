const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.secretKey

function generateToken(firstName, lastName, middleName, studentEmail, matNo, enrollmentYear, value) {
    return jwt.sign({ firstName, lastName, middleName, studentEmail, matNo, enrollmentYear, value }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
  }
  
  module.exports = { generateToken };