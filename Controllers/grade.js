const Grade = require('../Models/Grade/gradeModel')
const {Level} = require('../Models/Course/Course')
const StudentGrade = require('../Models/StudentGrade/studentGrade')

const getGrade =  (req,res) => {
    const {courseNumber, subjectNumber} = req.body
    async function value( ) {
        let subjectValue;
        let matricNum;
        let courseValue;
        let gradeVal;
        let creditUnit;
        let levelYear;
        let semesterValue;
        let courseCodes;
        let courseDesc;
        let acadYear;
        const Course = await Level.findOne({'semester.courses.subjectNumber': subjectNumber})
        .then(course => {
            res.send(course)
            const array = course.semester[0].courses
            subjectValue = array[0].subjectNumber
            courseDesc = array[0].name
            courseCodes = array[0].code
            creditUnit = array[0].creditUnits
            semesterValue = course.semester[0].semesterNumber
            levelYear = course.levelNumber
            //res.send(`value: ${isCourse}`)
        })
    
        const grade = await Grade.findOne({courseNumber})
        .then(grades => {
            courseValue = grades.courseNumber
            matricNum = grades.matNo
            gradeVal = grades.gradeValue
            acadYear - grades.academicYear
            
            //res.send(`value: ${courseValue}`)
        })
        console.log(`value1 is: ${subjectValue} $value2 is: ${courseValue}`);
        console.log(courseDesc)
        console.log(courseCodes)
        console.log(creditUnit)
        console.log(semesterValue)
        console.log(levelYear)
        console.log(matricNum)
        console.log(gradeVal)
        console.log(acadYear)
    }
    
    //courseDesc, courseCodes, creditUnit, semesterValue, levelYear,  matricNum, gradeVal, acadYear
    
    
    value()
    
   
   
    
        // if (Course) {
        //     res.send(Course)
        // }
        //console.log(Course)
    // Grade.findOne({courseNumber})
    //     .then(grades => {
    //         res.status(201).send(grades)
    //         console.log(grades._id)
    //     })
    //     .catch(error => {
    //         res.status(404).send(`Grades not found ${error}`)
    //     })
}

const createGrade = async (req,res) => {
    // const {courseNumber, matNo} = req.val;
    // const subjectNumber = courseNumber;
    // let subjectValue, matricNum, courseValue, gradeVal, creditUnits, levelYear, semesterValue, courseCodes, courseDesc, acadYear;
    // const gradeData = req.val
    // console.log(subjectNumber)

    // try {
    //     const { courseNumber, matNo } = req.val;
    //     const subjectNumber = courseNumber;

    //     const course = await Level.findOne({ 'semester.courses.subjectNumber': subjectNumber })
    //     .then(course => {
    //         if (!course) {
    //             return res.status(404).send(`Course does not exist, please add the course to give it a grade`);
    //         }
    
    //         const array = course.semester[0].courses;
    //         subjectValue = array[0].subjectNumber;
    //         courseDesc = array[0].name;
    //         courseCodes = array[0].code;
    //         creditUnits = array[0].creditUnits;
    //         semesterValue = course.semester[0].semesterNumber;
    //         levelYear = course.levelNumber;
    //     })

        

    //     const grades = new Grade(req.val)
    //     await grades.save()
    //     .then(grades => {
    //         courseValue = grades.courseNumber;
    //         matricNum = grades.matNo;
    //         gradeVal = grades.gradeValue;
    //         acadYear = grades.academicYear;
    //     })

        

    //     const exists = await Grade.findOne({ matNo, courseNumber })
    //     .then( exists => {
    //         if (exists) {
    //             return res.status(409).send(`The Matriculation number already has a grade for this course`);
    //         }
    //     })

    //     const stGrades = new StudentGrade({
    //         matNo: matricNum,
    //         academicYear: acadYear,
    //         semesterNumber: semesterValue,
    //         courseCode: courseCodes,
    //         courseName: courseDesc,
    //         creditUnits: creditUnits,
    //         gradeValue: gradeVal,
    //         levelNumber: levelYear,
    //         courseNumber: courseValue,
    //     });

    //     await stGrades.save();
    //     console.log(stGrades);

        
    // } catch (error) {
    //     res.status(500).send(error);
    // }    

   
    try {
        const { courseNumber, matNo, code } = req.val;
        const subjectNumber = courseNumber;

        const course = await Level.findOne({ 'semester.courses.subjectNumber': code });

        if (!course) {
            return res.status(404).send(`Course does not exist, please add the course to give it a grade`);
        }

        const array = course.semester[0].courses;
        subjectValue = array[0].subjectNumber;
        courseDesc = array[0].name;
        courseCodes = array[0].code;
        creditUnits = array[0].creditUnits;
        semesterValue = course.semester[0].semesterNumber;
        levelYear = course.levelNumber;

        const exists = await Grade.findOne({ matNo, courseNumber });

        if (exists) {
            console.log(exists)
            res.status(409).send(`The Matriculation number already has a grade for this course`);
        } else {
            const grades = new Grade(req.val);
            await grades.save();

            courseValue = grades.courseNumber;
            matricNum = grades.matNo;
            gradeVal = grades.gradeValue;
            acadYear = grades.academicYear;

            const stGrades = new StudentGrade({
                matNo: matricNum,
                academicYear: acadYear,
                semesterNumber: semesterValue,
                courseCode: courseCodes,
                courseName: courseDesc,
                creditUnits: creditUnits,
                gradeValue: gradeVal,
                levelNumber: levelYear,
                courseNumber: courseValue,
            });

            await stGrades.save()
            .then( stGrades => {
            res.status(201).send(stGrades)
            })
            console.log(stGrades);
        }

        // Respond to the client here if necessary

    } catch (error) {
        res.status(500).send(error);
    }

    
}

module.exports = {
    getGrade,
    createGrade
}