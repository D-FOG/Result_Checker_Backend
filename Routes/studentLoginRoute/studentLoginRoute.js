const express = require('express');
const router = express.Router()
const studentLogin = require('../../Controllers/studentLogin')
const validateStudentLogin = require('../../Middlewares/validateStudentLogin')

/**
 * @swagger
 * tags:
 *   name: Student Login
 *   description: API routes for student login operations
 */

/**
 * @swagger
 * /studentLogin:
 *   post:
 *     summary: Student login. This is done before student can check his/her results.
 *     requestBody:
 *       description: Student form body needed for login
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               matNo:
 *                  type: string
 *               studentEmail:
 *                  type: string
 *             required:
 *               - matNo
 *               - studentEmail
 *     tags: [Student Login]
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
 *         description: Student Login credentials not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '400':
 *         description: Student login credentials incorrect
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
router.post('/', validateStudentLogin, studentLogin)
module.exports = router