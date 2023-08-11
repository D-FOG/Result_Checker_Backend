const express = require('express');
const router = express.Router()
const {Level, Course, Semester} = require('../../Models/Course/Course')
const Grade = require('../../Models/Grade/gradeModel')
const { createCourseGrade, getCourseGrade, updateCourseGrade, deleteCourseGrade} = require('../../Controllers/courseGradeControllers')
const { validateCreateCourse, validateUpdateCourse } = require('../../Middlewares/validateCourseGrade') 

/**
 * @swagger
 * components:
 *      schemas:
 *          Course:
 *              type: object
 *              properties:
 *                  levelNumber:
 *                      type: integer
 *                  semesterNumber:
 *                      type: integer
 *                  subjectNumber:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  code:
 *                      type: string
 *                  creditUnits:
 *                      type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API routes for course operations
 */

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Get courses based on the level number
 *     requestBody:
 *       description: Level Number body
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               levelNumber:
 *                 type: integer
 *             required:
 *               - levelNumber
 *     tags: [Courses]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       '404':
 *         description: Courses not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/', getCourseGrade);

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API routes for course operations
 */

/**
 * @swagger
 * /course:
 *   post:
 *     summary: Create a course.
 *     requestBody:
 *       description: Course objects. levelNumber is the level, semesterNumber is the semester session, subject number is the course number example 400.1, name is the full name description of the course example general studies, code is the short abbreviation example GES and creditUnits is the points associated with the course. 
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *                  levelNumber:
 *                      type: integer
 *                  semesterNumber:
 *                      type: integer
 *                  subjectNumber:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  code:
 *                      type: string
 *                  creditUnits:
 *                      type: integer
 *             required:
 *               - levelNumber
 *               - semesterNumber
 *               - subjectNumber
 *               - name
 *               - code
 *               - creditnits
 *     tags: [Courses]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 message:
 *                   type: string
 *       '404':
 *         description: course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string

 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', validateCreateCourse, createCourseGrade);

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API routes for course operations
 */

/**
 * @swagger
 * /course:
 *   put:
 *     summary: Update a course. 
 *     requestBody:
 *       description: course object to be Updated. The level number and subject number should be used for update of the course.
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *                  levelNumber:
 *                      type: integer
 *                  semesterNumber:
 *                      type: integer
 *                  subjectNumber:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  code:
 *                      type: string
 *                  creditUnits:
 *                      type: integer
 *             required:
 *               - levelNumber
 *               - subjectNumber
 *     tags: [Courses]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 message:
 *                   type: string
 *       '404':
 *         description: course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string

 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.put('/', validateUpdateCourse, updateCourseGrade);

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API routes for course operations
 */

/**
 * @swagger
 * /course:
 *   delete:
 *     summary: Delete a course.
 *     requestBody:
 *       description: Course object used to delete student
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               levelNumber:
 *                  type: integer
 *               subjectNumber:
 *                  type: integer
 *             required:
 *               - levelNumber
 *     tags: [Courses]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 message:
 *                   type: string
 *       '404':
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string

 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.delete('/', deleteCourseGrade);
module.exports = router
