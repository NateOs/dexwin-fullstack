import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('auth/login', { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('auth/register', { name, email, password });
  return response.data;
};

export const getTodos = async () => {
  const response = await api.get('todos');
  return response.data;
};

export const createTodo = async (todo: { title: string; description: string }) => {
  const response = await api.post('todos', todo);
  return response.data;
};

export const updateTodo = async (id: string, updates: { completed?: boolean }) => {
  const response = await api.patch(`todos/${id}`, updates);
  return response.data;
};

export default api;