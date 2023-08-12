const express = require('express')
const bcrypt = require('bcrypt')
const Student = require('../../Models/Student/studentModel')
const router = express.Router();
const sendEmail = require('../../Middlewares/validateEmail')
const {validateStudent, validateStudentUpdate, validateGetStudent, validateDeleteStudent} = require('../../Middlewares/validateStudentModel')
const { createStudent, getStudent, updateStudent, deleteStudent, getAllStudents } = require('../../Controllers/student') 
//const bcrypt = require('bcrypt')
/**
 * @swagger
 * components:
 *      schemas:
 *          Student:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  middleName:
 *                      type: string
 *                  matNo:
 *                      type: string
 *                  studentEmail:
 *                      type: string
 *                  enrollmentYear:
 *                      type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API routes for student operations
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a student. This sends a mail to the students email then after the mail link is clicked and verified the student record is created.
 *     requestBody:
 *       description: Student object to be created
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                  type: string
 *               lastName:
 *                  type: string
 *               middleName:
 *                  type: string
 *               matNo:
 *                  type: string
 *               studentEmail:
 *                  type: string
 *               enrollmentYear:
 *                  type: integer
 *             required:
 *               - matNo
 *               - firstName
 *               - lastname
 *               - middleName
 *               - studentEmail
 *               - enrollmentYear
 *     tags: [Students]
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
 *         description: Student not found
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
router.post('/', validateStudent, sendEmail);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API routes for student operations
 */

/**
 * @swagger
 * /students/getStudent:
 *   post:
 *     summary: Get all student
 *     tags: [Students]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       '404':
 *         description: No student found
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
router.get('/', getAllStudents);
/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API routes for student operations
 */

/**
 * @swagger
 * /students/getStudent:
 *   post:
 *     summary: Get a particular student
 *     requestBody:
 *       description: Student record to be gotten by matriculation number
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               matNo:
 *                 type: string
 *             required:
 *               - matNo
 *     tags: [Students]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       '404':
 *         description: Student not found
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
router.post('/getStudent', validateGetStudent, getStudent);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API routes for student operations
 */

/**
 * @swagger
 * /students:
 *   put:
 *     summary: Update a student. 
 *     requestBody:
 *       description: Student object to be Updated. The email should be the as it was validated earlier.
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                  type: string
 *               lastName:
 *                  type: string
 *               middleName:
 *                  type: string
 *               matNo:
 *                  type: string
 *               studentEmail:
 *                  type: string
 *               enrollmentYear:
 *                  type: integer
 *             required:
 *               - matNo
 *               - firstName
 *               - lastname
 *               - middleName
 *               - studentEmail
 *               - enrollmentYear
 *     tags: [Students]
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
 *         description: Student not found
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


router.put('/', validateStudentUpdate, updateStudent);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API routes for student operations
 */

/**
 * @swagger
 * /students:
 *   delete:
 *     summary: Delete a student.
 *     requestBody:
 *       description: Student object used to delete student
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               matNo:
 *                  type: string
 *             required:
 *               - matNo
 *     tags: [Students]
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
 *         description: Student not found
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

router.delete('/', validateDeleteStudent, deleteStudent);
module.exports = router