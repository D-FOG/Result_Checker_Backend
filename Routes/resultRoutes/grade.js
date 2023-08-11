const express = require('express')
const router = express.Router()
const { createGrade, getGrade} = require('../../Controllers/grade')
const { validateCreateGrade } = require('../../Middlewares/validateGrade')


router.get('/', getGrade);

/**
 * @swagger
 * components:
 *      schemas:
 *          Result:
 *              type: object
 *              properties:
 *                  matNo:
 *                      type: string
 *                  gradeValue:
 *                      type: string
 *                  courseNumber:
 *                      type: integer
 *                  academicYear:
 *                      type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Results
 *   description: API routes for result operations
 */

/**
 * @swagger
 * /results:
 *   post:
 *     summary: Add a result. This is the api route for adding the result or grade of students
 *     requestBody:
 *       description: Result object to be created
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               matNo:
 *                  type: string
 *               gradeValue:
 *                  type: string
 *               courseNumber:
 *                  type: integer
 *               academicYear:
 *                  type: integer
 *             required:
 *               - matNo
 *               - gradeValue
 *               - courseNumber
 *               - academicYear
 *     tags: [Results]
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
 *         description: Result not found
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
router.post('/', validateCreateGrade, createGrade);
module.exports = router