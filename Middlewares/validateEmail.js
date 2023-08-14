const transport = require('../Services/emailService')
const { generateToken } = require('../jwtUtils')
const Student = require('../Models/Student/studentModel')
require('dotenv').config()
const crypto = require('crypto');

// Assuming you have the user's email address in the variable 'userEmail'

const sendEmail = (req, res) => {
   
    try {
        const {firstName, lastName, middleName, studentEmail, matNo, enrollmentYear} = req.val;
        console.log(`from the the middleware ${studentEmail}`)
        console.log(firstName, lastName, middleName, studentEmail, matNo, enrollmentYear)
        
        function generateSecretKeyWithCharacters(keyLength, characters) {
            const charLength = characters.length;
            const buffer = crypto.randomBytes(keyLength);
            
            let secretValue = '';
            for (let i = 0; i < buffer.length; i++) {
                secretValue += characters[buffer[i] % charLength];
            }
            
            return secretValue;
        }
    
        const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
        const value = generateSecretKeyWithCharacters(6, allowedCharacters);
        const student = Student.findOne({$or: [{ matNo },{ studentEmail }]})
            .then(isStudents => {
                if (isStudents) {
                    const isStudentFields = []
                    if (isStudents.matNo === matNo){
                        isStudentFields.push('Matriculation number')
                    }
                    if (isStudents.studentEmail === studentEmail){
                        isStudentFields.push('Student email')
                    }
                    res.status(409).json({error:`${ isStudentFields } already exists`})
                } else {
                    // Generate the verification token
                    const verificationToken = generateToken(firstName, lastName, middleName, studentEmail, matNo, enrollmentYear, value)
                    console.log(verificationToken);


                    // Create the verification link
                    const verificationLink = `https://result-backend.onrender.com/verify-email?token=${verificationToken}`;
                
                    // Send the verification email
                    transport.sendMail({
                        from: process.env.uniEmail, // Replace with your email address
                        to: studentEmail,
                        subject: 'Account Verification',
                        html: `<h1> Hello ${lastName} ${firstName} </h1>
                                <p> Click the following link to verify your account: <a href="${verificationLink}">Verifiy your mail</a></p>
                                <p>This is your student secret key: ${value}</p>
                                <p>This secret key will be needed to login to check results. Please store it and keep it safe</p>`,
                    });
                    res.status(200).json({message: `Link successfuly sent to student email`})
                }
            }) 
    } catch(error) {
        res.status(403).send(`Link is not valid ${error}`)
    }
}

module.exports = sendEmail
