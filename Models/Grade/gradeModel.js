const mongoose = require('mongoose');
//const { Level } = require('../Course/Course')

const Schema = mongoose.Schema;


const GradeSchema = new Schema({
    matNo: {
        type: String,
    },
    courseNumber: {
        type: Number,
    },
    gradeValue: {
        type: String,
    },
    academicYear: {
        type: Number,
    },
    updatedAt: {
        type: Date,
    },
})

const Grade = mongoose.model('Grade', GradeSchema)

module.exports = Grade