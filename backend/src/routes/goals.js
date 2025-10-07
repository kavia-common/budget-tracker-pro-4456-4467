const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/goals');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Manage savings goals
 */

router.use(auth);

/**
 * @swagger
 * /api/v1/goals:
 *   get:
 *     summary: List goals
 *     tags: [Goals]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of goals }
 */
router.get('/', controller.list);

/**
 * @swagger
 * /api/v1/goals:
 *   post:
 *     summary: Create a goal
 *     tags: [Goals]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       201: { description: Created }
 */
router.post('/', controller.createValidation, controller.create);

/**
 * @swagger
 * /api/v1/goals/{id}:
 *   put:
 *     summary: Update a goal
 *     tags: [Goals]
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
router.put('/:id', controller.updateValidation, controller.update);

/**
 * @swagger
 * /api/v1/goals/{id}:
 *   delete:
 *     summary: Delete a goal
 *     tags: [Goals]
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
