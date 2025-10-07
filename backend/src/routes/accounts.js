const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/accounts');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Manage user accounts
 */

router.use(auth);

/**
 * @swagger
 * /api/v1/accounts:
 *   get:
 *     summary: List accounts
 *     tags: [Accounts]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of accounts
 */
router.get('/', controller.list);

/**
 * @swagger
 * /api/v1/accounts:
 *   post:
 *     summary: Create an account
 *     tags: [Accounts]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               type: { type: string }
 *               balance: { type: number }
 *     responses:
 *       201:
 *         description: Account created
 */
router.post('/', controller.createValidation, controller.create);

/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   put:
 *     summary: Update an account
 *     tags: [Accounts]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 */
router.put('/:id', controller.updateValidation, controller.update);

/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Deleted }
 */
router.delete('/:id', controller.updateValidation, controller.remove);

module.exports = router;
