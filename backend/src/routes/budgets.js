const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/budgets');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Budgets
 *   description: Manage budgets
 */

router.use(auth);

/**
 * @swagger
 * /api/v1/budgets:
 *   get:
 *     summary: List budgets
 *     tags: [Budgets]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of budgets }
 */
router.get('/', controller.list);

/**
 * @swagger
 * /api/v1/budgets:
 *   post:
 *     summary: Create a budget
 *     tags: [Budgets]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       201: { description: Created }
 */
router.post('/', controller.createBudgetValidation, controller.create);

/**
 * @swagger
 * /api/v1/budgets/{id}:
 *   put:
 *     summary: Update a budget
 *     tags: [Budgets]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string, format: uuid }
 *         required: true
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 */
router.put('/:id', controller.updateBudgetValidation, controller.update);

/**
 * @swagger
 * /api/v1/budgets/{id}:
 *   delete:
 *     summary: Delete a budget
 *     tags: [Budgets]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       204: { description: Deleted }
 */
router.delete('/:id', controller.idParamValidation, controller.remove);

module.exports = router;
