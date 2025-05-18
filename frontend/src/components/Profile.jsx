import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center">
          <div className="rounded-full w-32 h-32 bg-gray-200 flex items-center justify-center mb-4">
            <img src="./user.svg" alt="Profile" className="w-24 h-24" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
          <p className="text-gray-600">Your profile information will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;