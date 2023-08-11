const express = require('express');
const router = express.Router()
const adminLogin = require('../../Controllers/adminLoginController')
const validateAdminLogin = require('../../Middlewares/validateAdminLogin')

/**
 * @swagger
 * tags:
 *   name: Admin Login
 *   description: API routes for admin login operations
 */

/**
 * @swagger
 * /adminLogin:
 *   post:
 *     summary: Admin login.
 *     requestBody:
 *       description: Admin form body needed for login
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *               password:
 *                  type: string
 *             required:
 *               - email
 *               - password
 *     tags: [Admin Login]
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
 *         description: Admin Login email not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '400':
 *         description: Admin login password incorrect
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
router.post('/', validateAdminLogin, adminLogin)
module.exports = router