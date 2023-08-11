const express = require('express')
const router = express.Router()
const { getStudentGrade, updateStudentGrade, deleteStudentGrade, getAllGrades} = require('../../Controllers/studentGradeControllers')

/**
 * @swagger
 * components:
 *      schemas:
 *          Grade:
 *              type: object
 *              properties:
 *                  levelNumber:
 *                      type: integer
 *                  semesterNumber:
 *                      type: integer
 *                  courseNumber:
 *                      type: integer
 *                  courseCode:
 *                      type: string
 *                  courseName:
 *                      type: string
 *                  matNo:
 *                      type: string
 *                  gradeValue:
 *                      type: string
 *                  creditUNits:
 *                      type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: API routes for grade operations
 */

/**
 * @swagger
 * /Grade/allGrades:
 *   get:
 *     summary: Get every student grades
 *     tags: [Grades]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       '404':
 *         description: No current grade found
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
router.get('/allGrades', getAllGrades);
/**
 * @swagger
 * /Grade:
 *   post:
 *     summary: Get grades
 *     requestBody:
 *       description: Grade record to be gotten by matriculation number and courseNumberexample 400.1
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               matNo:
 *                 type: string
 *               courseNumber:
 *                 type: integer
 *             required:
 *               - matNo
 *               - courseNumber
 *     tags: [Grades]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       '404':
 *         description: Grade not found
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
router.get('/', getStudentGrade);

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: API routes for Grade operations
 */

/**
 * @swagger
 * /Grade:
 *   put:
 *     summary: Update a grade. 
 *     requestBody:
 *       description: grade object to be Updated.
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               levelNumber:
 *                  type: integer
 *               semesterNumber:
 *                  type: integer
 *               courseNumber:
 *                  type: integer
 *               courseCode:
 *                  type: string
 *               courseName:
 *                  type: string
 *               matNo:
 *                  type: string
 *               gradeValue:
 *                  type: string
 *               creditUNits:
 *                  type: integer
 *             required:
 *               - matNo
 *               - courseNumber
 *     tags: [Grades]
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 message:
 *                   type: string
 *       '404':
 *         description: Grade not found
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

router.put('/', updateStudentGrade);

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: API routes for grade operations
 */

/**
 * @swagger
 * /Grade:
 *   delete:
 *     summary: Delete a grade.
 *     requestBody:
 *       description: Grade object used to delete grade
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               matNo:
 *                  type: string
 *               courseNumber:
 *                  type: integer
 *             required:
 *               - matNo
 *               - courseNumber
 *     tags: [Grades]
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
 *         description: Grade not found
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
router.delete('/', deleteStudentGrade);

module.exports = router