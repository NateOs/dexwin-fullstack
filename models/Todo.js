const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the todo
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         completed:
 *           type: boolean
 *           description: Whether the todo is completed
 *         user:
 *           type: string
 *           description: The ID of the user who owns the todo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the todo was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the todo was last updated
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         title: "Buy groceries"
 *         description: "Milk, Bread, Eggs"
 *         completed: false
 *         user: "60d21b4667d0d8992e610c84"
 *         createdAt: "2025-04-29T10:00:00.000Z"
 *         updatedAt: "2025-04-29T10:00:00.000Z"
 */

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide todo title'],
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);
