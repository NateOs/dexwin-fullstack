const Todo = require('../models/Todo');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createTodo = async (req, res) => {
  req.body.user = req.user.userId;
  const todo = await Todo.create(req.body);
  res.status(StatusCodes.CREATED).json({ todo });
};

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ todos, count: todos.length });
};

const getSingleTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId, user: req.user.userId });
  if (!todo) {
    throw new CustomError.NotFoundError(`No todo with id: ${todoId}`);
  }
  res.status(StatusCodes.OK).json({ todo });
};

const updateTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, user: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!todo) {
    throw new CustomError.NotFoundError(`No todo with id: ${todoId}`);
  }
  res.status(StatusCodes.OK).json({ todo });
};

const deleteTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: todoId, user: req.user.userId });
  if (!todo) {
    throw new CustomError.NotFoundError(`No todo with id: ${todoId}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Todo removed.' });
};

module.exports = {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
