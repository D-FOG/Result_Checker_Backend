const StudentGrade = require('../Models/StudentGrade/studentGrade')

const getAllGrades =  (req, res) => {
    try{
        StudentGrade.countDocuments()
            .then(grade => {
                if(grade === 0) {
                    res.status(404).send('Sorry no data, please add grade')
                } else{
                    StudentGrade.find({})
                        .then(grades => {
                            res.status(200).json(grades);
                        })
                        .catch(err => {
                            res.status(400).send(`Error finding data: ${err}`);
                        })
                }
            })
            .catch(err => {
                res.status(500).send(`Server error`);
            })
    } catch (error){
        res.status(500).status(`Internal error: ${error}`);
    }
}

const getStudentGrade = (req,res) => {
    const {matNo} = req.body
    const sGrades = StudentGrade.find({matNo})
        .then(sGrade => {
            if(sGrade.length !== 0) {
                res.status(200).json({data: sGrade})
            } else {
                res.status(404).send(`No grades recorded for the matriculation number ${matNo}`)
            }
        })
        .catch(error => {
            res.status(500).send(`Not found: ${error}`)
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
    getAllGrades
}