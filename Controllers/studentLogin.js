const Student = require('../Models/Student/studentModel')

const studentLogin = async (req, res) => {
    const {matNo} = req.val
    const email = req.val.studentEmail
    console.log(`email from val ${email}`)
    const student = await Student.findOne({matNo})
    const {studentEmail} = student;
    
    console.log(studentEmail)
    if (!student){
        res.status(404).send('Student not found');
    }
    if (student){
        if (email !== studentEmail) {
            res.status(400).send('Email is not coreect');
        } else {
            res.status(200).send('Logged in successfully');
        }
    }
}

module.exports = studentLogin