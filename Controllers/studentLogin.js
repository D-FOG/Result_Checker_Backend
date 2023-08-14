const Student = require('../Models/Student/studentModel')

const studentLogin = async (req, res) => {
    const {matNo} = req.val
    const sNo = req.val.secretValue
    let sNumber
    //console.log(`email from val ${email}`)
    const student = await Student.findOne({matNo})
        .then(student => {
            if (student) {
                sNumber = student.secretValue
            } else {
                res.status(400).send(`Matriculation number is incorrect or does not exist`)
            }
            console.log(`student email from student is: `, sNumber)
            console.log(student)

            if (student){
                if (sNo !== sNumber) {
                    res.status(400).json({message: 'Email is not coreect'});
                } else {
                    res.status(200).json({message: 'Logged in successfully'});
                }
            }
        })
}

module.exports = studentLogin