const transport = require('../Services/emailService')
const { generateToken } = require('../jwtUtils')
require('dotenv').config()
const fs = require('fs')
const path = require('path')

// Assuming you have the user's email address in the variable 'userEmail'

const sendEmail = (req, res) => {
   
    try {
        const imagePath = path.join(__dirname, '../', 'image', 'dragon-ball-super.jpg');
        const imageBase64 = fs.readFileSync(imagePath, {encoding: 'base64'})
        const {firstName, lastName, middleName, studentEmail, matNo, enrollmentYear} = req.val;
        console.log(`from the the middleware ${studentEmail}`)
        console.log(firstName, lastName, middleName, studentEmail, matNo, enrollmentYear)
        // Generate the verification token
        const verificationToken = generateToken(firstName, lastName, middleName, studentEmail, matNo, enrollmentYear)
        console.log(verificationToken);

        // Create the verification link
        const verificationLink = `https://result-backend.onrender.com/verify-email?token=${verificationToken}`;
    
        // Send the verification email
        transport.sendMail({
            from: process.env.uniEmail, // Replace with your email address
            to: studentEmail,
            subject: 'Account Verification',
            html: `<h1> Hello ${lastName} ${firstName} </h1>
                    <p> Click the following link to verify your account: <a href="${verificationLink}">Verifiy your mail</a></p>`,
        });
    } catch(error) {
        res.status(403).send(`Link is not invalid ${error}`)
    }
}

module.exports = sendEmail
