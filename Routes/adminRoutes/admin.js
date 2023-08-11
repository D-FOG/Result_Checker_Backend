const express = require('express');
const Admin = require('../../Models/Admin/Admin')
const router = express.Router()
const { createAdmin, getAdmin, updateAdmin, deleteAdmin } = require('../../Controllers/admin')
const {validateCreateAdmin, validateUpdateAdmin} = require('../../Middlewares/validateAdmin')

/**
 * @swagger
 * components:
 *      schemas:
 *          Admin:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  middleName:
 *                      type: string
 *                  password:
 *                      type: string
 *                  email:
 *                      type: string
 *                  adminNumber:
 *                      type: string
 */


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API routes for admin operations
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       '404':
 *         description:  No admin exists in the database
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
router.get('/', getAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API routes for student operations
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create an admin
 *     requestBody:
 *       description: Admin record to be created
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
 *               password:
 *                  type: string
 *               email:
 *                  type: string
 *             required:
 *               - password
 *               - firstName
 *               - lastname
 *               - middleName
 *               - email
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       '404':
 *         description: Admin not found
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
 *       '409':
 *         description: Admin already exists
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

router.post('/', validateCreateAdmin, createAdmin);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API routes for student operations
 */

/**
 * @swagger
 * /admin:
 *   put:
 *     summary: Update a admin. 
 *     requestBody:
 *       description: admin update. The admin number shouldbe the requirement to update the admin.
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               adminNumber:
 *                  type: string
 *             required:
 *               - adminNumber
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Admin'
 *       '404':
 *         description: Admin not found
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

router.put('/', validateUpdateAdmin, updateAdmin);

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
 *       description: Admin Number is used to delete an admin
 *       required: true
 *       content:
 *         application/json:   # Specify the content type
 *           schema:
 *             type: object
 *             properties:
 *               adminNumber:
 *                  type: string
 *             required:
 *               - adminNumber
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Admin'
 *       '404':
 *         description: Admin not found
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

router.delete('/', deleteAdmin);

module.exports = router;