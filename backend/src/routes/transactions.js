const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/transactions');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Manage transactions
 */

router.use(auth);

/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     summary: List transactions (paginated)
 *     tags: [Transactions]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100 }
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: account_id
 *         schema: { type: integer }
 *       - in: query
 *         name: category_id
 *         schema: { type: integer }
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [income, expense] }
 *     responses:
 *       200:
 *         description: Paginated transactions
 */
router.get('/', controller.paginationValidation, controller.list);

/**
 * @swagger
 * /api/v1/transactions:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transactions]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       201: { description: Created }
 */
router.post('/', controller.createTransactionValidation, controller.create);

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 */
router.put('/:id', controller.updateTransactionValidation, controller.update);

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Deleted }
 */
router.delete('/:id', controller.idParamValidation, controller.remove);

module.exports = router;
