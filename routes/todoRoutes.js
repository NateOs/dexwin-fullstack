const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

router
  .route('/')
  .post(authenticateUser, createTodo)
  .get(authenticateUser, getAllTodos);

router
  .route('/:id')
  .get(authenticateUser, getSingleTodo)
  .patch(authenticateUser, updateTodo)
  .delete(authenticateUser, deleteTodo);

module.exports = router;
