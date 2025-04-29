import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
      <p className="text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:text-blue-700"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </form>
  );
};

export default LoginForm;