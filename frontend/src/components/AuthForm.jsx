import React, { useState } from 'react';

const AuthForm = ({ mode, onLogin, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // TODO: Implement login and register functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' 
        ? { email, password }
        : { name, email, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`${mode === 'login' ? 'Login' : 'Registration'} failed`);
      }

      const data = await response.json();
      mode === 'login' ? onLogin(data.user) : onRegister(data.user);
    } catch {
      setError(`${mode === 'login' ? 'Login' : 'Registration'} failed. Please check your credentials.`);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="relative mb-2 w-20 h-20">
          <div className="absolute inset-0 bg-gray-200 rounded-full aspect-square"></div>
          <img src="./user.svg" alt="User" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
        </div>
        <p className="text-gray-600 text-lg mb-1">{ mode === 'login' ? 'Sign in to' : 'Create' } your account</p>
      </div>
      <h2 className="text-3xl font-bold mb-2 text-center">
        {mode === 'login' ? 'Login' : 'Register'}
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        {mode === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {mode === 'login' 
          ? "Don't have an account? "
          : "Already have an account? "
        }
        <a href={mode === 'login' ? '/register' : '/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
          {mode === 'login' ? 'Register' : 'Login'}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;