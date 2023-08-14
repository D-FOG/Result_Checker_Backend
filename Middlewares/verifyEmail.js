const Student = require('../Models/Student/studentModel');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const verifyEmail = (req, res) => {
    const token = req.query.token;
    console.log(token)
    const headers = {
        'content-type': 'text/html',
    }
    const htmlContent = `
    <!Doctype html>
    <html>
    <head>
    <title>Success message</title>
    <style>
    body{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
    }
    h2{
        color: #38c76a ;
        text-align: center;
    }
    </style>
    </head>
    <body>
    <h2>Email verified successfully and account created</h2>
    </body>
    </html>    
    `
    let data;
    
    jwt.verify(token, process.env.secretKey, (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid token' });
      } else {

         // Token is valid, you can perform necessary actions (e.g., update user's email verification status)
         const {firstName, lastName, middleName, matNo, studentEmail, enrollmentYear, value} = decoded;
         const students = new Student({firstName, lastName, middleName, studentEmail, matNo, enrollmentYear, secretValue: value})
         students.save()
             .then(students => {
                 res.status(201).set(headers).send(htmlContent);
             })
             .catch(err => {
                 res.status(400).send(`Failed to upload students: ${err}`);
             })
        }
    })
}

module.exports = verifyEmail