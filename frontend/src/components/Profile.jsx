import React, { useState, useEffect } from 'react';
import AuthForm from './AuthForm';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showRegister ? (
          <AuthForm 
            mode="register"
            onRegister={(userData) => setUser(userData)}
            onLogin={() => setShowRegister(false)}
          />
        ) : (
          <AuthForm 
            mode="login"
            onLogin={(userData) => setUser(userData)}
            onRegister={() => setShowRegister(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center">
          <div className="rounded-full w-32 h-32 bg-gray-200 flex items-center justify-center mb-4">
            <img src="./user.svg" alt="Profile" className="w-24 h-24" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Welcome, {user.name || user.email}</h2>
          <p className="text-gray-600">Your profile information will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;