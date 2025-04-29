import React from 'react'
import './App.css'
import TodoList from './TodoList'
import { AuthProvider, useAuth } from './AuthContext'
import LoginForm from './LoginForm'

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Todo App</h1>
          </header>
          <main>
            {user ? <TodoList /> : <LoginForm />}
          </main>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App