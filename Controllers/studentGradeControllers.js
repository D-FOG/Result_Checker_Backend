const StudentGrade = require('../Models/StudentGrade/studentGrade')

const getStudentGrade = (req,res) => {
    const {matNo} = req.body
    const sGrades = StudentGrade.findOne({matNo})
        .then(sGrade => {
            res.send(sGrade)
        })
        .catch(error => {
            res.status(404).send(`Not found: ${error}`)
        })
}

const updateStudentGrade = (req,res) => {
    const body = req.body
    const {matNo, courseNumber} = req.body
    const sGrades = StudentGrade.findOneAndUpdate({matNo, courseNumber}, body)
        .then( sGrade => {
            if (!sGrade){
                res.status(404).send(`Not found in the database`)
            }
            res.status(201).send(sGrade);
        })
        .catch( error =>  {
            res.status(404).send(`Not found, error updating grades: ${error}`)
        })
}

const deleteStudentGrade = (req,res) => {
    const {matNo, courseNumber} = req.body
    StudentGrade.findOneAndDelete({matNo, courseNumber})
        .then(sGrade => {
            res.status(200).send(sGrade)
        })
        .catch(error => {
            res.status(404).send(`Error deleting grades try again later: ${error}`)
        })
}
module.exports = {
    getStudentGrade,
    updateStudentGrade,
    deleteStudentGrade,
}