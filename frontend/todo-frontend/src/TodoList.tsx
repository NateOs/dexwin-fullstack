import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo } from './api';
import { useAuth } from './AuthContext';

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const { logout } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data.todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.title.trim()) {
      try {
        const data = await createTodo(newTodo);
        setTodos([...todos, data.todo]);
        setNewTodo({ title: '', description: '' });
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === id);
      if (todoToUpdate) {
        const data = await updateTodo(id, { completed: !todoToUpdate.completed });
        setTodos(todos.map(todo => todo._id === id ? data.todo : todo));
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <button 
        onClick={logout}
        className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          value={newTodo.title}
          onChange={handleInputChange}
          placeholder="Todo title"
          required
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-2"
        />
        <textarea
          name="description"
          value={newTodo.description}
          onChange={handleInputChange}
          placeholder="Todo description"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-2"
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Todo
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id)}
                className="mr-2"
              />
              <span className={`font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.title}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;