const { Level, Course, Semester} = require('../Models/Course/Course')
const Grade = require('../Models/Grade/gradeModel')

const getAllCourses =  (req, res) => {
    try{
        Level.countDocuments()
            .then(level => {
                if(level === 0) {
                    res.status(404).send('No data in collection')
                } else{
                    Level.find({})
                        .then(levels => {
                            res.status(200).json(levels);
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

const getCourseGrade = (req,res) => {
    try{
        const {levelNumber} = req.body
        Level.find({levelNumber})
            .then(course => {
                // const array = course.semester[0].courses
                // const courseArray = array[0].creditUnits
               // console.log(courseArray)
               res.send(course)
            })
            .catch(err => {
                res.status(400).send(`Not found: ${err}`);
            })
    } catch (error){
        res.status(500).send(`Internal error: ${error}`);
    }
}

const createCourseGrade = (req,res) => {
    try{
        const {name, code, creditUnits, subjectNumber, semesterNumber} = req.val
        const {levelNumber} = req.val;
        const isCourseFields = []
        if (levelNumber >= 5){
            isCourseFields.push('Level Number,')
        }
        if (semesterNumber >= 3){
            isCourseFields.push('Semester Number')
        }
        if (isCourseFields.length > 0) {
            res.status(409).json({error:`${ isCourseFields } is not valid`})
        } else {
        const courseNumber = Level.findOne({"semester.courses.subjectNumber": subjectNumber})
            .then(courseExist => {
                if (courseExist) {
                    res.status(409).json({error:`Course already exists`})
                } else {
                    const courseDoc = new Course({name, code, creditUnits, subjectNumber})
            
                    const semesterDoc = new Semester({
                        semesterNumber,
                        courses: courseDoc
                    });
            
                    const course = new Level({
                        levelNumber, 
                        semester: semesterDoc
                    })
                    course.save()
                        .then(courses => {
                            res.status(200).send(courses);
                        })
                        .catch(err => {
                            res.status(500).send("Not able to create course database")
                        })
                }
            })
        }   
            
    } catch(error){
        res.status(500).send(`Error: ${error}`)
    }
}

const updateCourseGrade = (req, res) => {
    const { levelNumber, name, code, creditUnits, semesterNumber, subjectNumber} = req.body;
    const body = req.val;
    try{
        Level.findOne({levelNumber,
            "semester.courses.subjectNumber": subjectNumber})
            .then( found => {
                if (!found){
                    res.status(404).send('The course you want to update does not exist')
                } else{
                    Level.findOneAndUpdate(
                        {
                          levelNumber,
                          "semester.courses.subjectNumber": subjectNumber
                        },
                        {
                          $set: { "semester.$[sem].courses.$[course].creditUnits": creditUnits, "semester.$[sem].courses.$[course].name": name, "semester.$[sem].courses.$[course].code": code }
                        },
                        {
                          arrayFilters: [
                            { "sem.courses.subjectNumber": subjectNumber },
                            { "course.subjectNumber": subjectNumber }
                          ],
                          new: true
                        }
                      )
                        .then(courses => {
                            res.status(200).send(courses);
                        })
                        .catch(err => {
                            res.status(400).send(`Failed to upload courses: ${err}`);
                        })
                }
            })
    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
}

const deleteCourseGrade = (req, res) => {
    const { levelNumber, subjectNumber } = req.body;


    try {
        Level.findOneAndDelete({ levelNumber, "semester.courses.subjectNumber": subjectNumber })
            .then(course => {
                if (!course || course === null ){
                    res.status(404).send(`course not found`)
                } else {
                    res.status(200).send(course);
                }
            })
            .catch(err => {
                res.status(400).send(`Details are not valid: ${err}`);
            })
    } catch (error){
        res.status(500).send(`Internal error: ${error}`);
    }
}

module.exports = {
    getCourseGrade,
    createCourseGrade,
    updateCourseGrade,
    deleteCourseGrade,
    getAllCourses
}

