import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthForm from './AuthForm';
import Purchases from './Purchases';
import Notifications from './notification/Notifications';
import Vouchers from './Vouchers';
import Settings from './Settings';
import StoreOwnerApplication from './store/StoreOwnerApplication';
import StoreManagement from './store/StoreManagement';
import { useUser } from 'context';

const Profile = () => {
  const location = useLocation();
  //const [user, setUser] = useState(null);
  const { user } = useUser();
  const [showRegister, setShowRegister] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePicture: null,
    address: {
      street: '',
      city: '',
      province: '',
      zipCode: '',
      additionalDetails: '',
      contactNumber: '',
    },
    isStoreOwner: true,
  });
  const [currentView, setCurrentView] = useState('profile');

  useEffect(() => {
    // Extract the view from the URL path
    const path = location.pathname;
    if (path.includes('/profile/notifications')) {
      setCurrentView('notifications');
    } else if (path.includes('/profile/purchases')) {
      setCurrentView('purchases');
    } else if (path.includes('/profile/vouchers')) {
      setCurrentView('vouchers');
    } else if (path.includes('/profile/store-owner-application')) {
      setCurrentView('store-owner-application');
    } else if (path.includes('/profile/store-management')) {
      setCurrentView('store-management');
    } else if (path.includes('/profile/settings')) {
      setCurrentView('settings');
    } else {
      setCurrentView('profile');
    }
  }, [location]);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    if (name === 'profilePicture') {
      const file = e.target.files[0];
      setEditData(prev => ({
        ...prev,
        profilePicture: file
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update user data
    //setUser({
    //  ...user,
    //  ...editData
    //});
    //setShowEdit(false);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showRegister ? (
          <AuthForm 
            mode="register"
          />
        ) : (
          <AuthForm 
            mode="login"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl border-r border-gray-100">
        <div className="p-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <div className="rounded-full w-24 h-24 bg-gray-200 flex items-center justify-center mb-2 overflow-hidden border-2 border-indigo-600">
                {user && user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-20 h-20" />
                ) : (
                  <img src="./user.svg" alt="Profile" className="w-20 h-20" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-indigo-600 w-6 h-6 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-0.5 text-gray-900">Welcome, {user.firstName + ' ' + user.lastName}</h2>
              <p className="text-gray-500 text-sm text-center">{user.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <button
              onClick={() => handleViewChange('profile')}
              className={`w-full px-4 py-3 rounded-lg ${
                currentView === 'profile' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              } font-medium flex items-center space-x-3 transition-all duration-200`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm">Profile</span>
            </button>
            <button
              onClick={() => handleViewChange('purchases')}
              className={`w-full px-4 py-3 rounded-lg ${
                currentView === 'purchases' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              } font-medium flex items-center space-x-3 transition-all duration-200`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm">Purchases</span>
            </button>
            <button
              onClick={() => handleViewChange('notifications')}
              className={`w-full px-4 py-3 rounded-lg ${
                currentView === 'notifications' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              } font-medium flex items-center space-x-3 transition-all duration-200`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="text-sm">Notifications</span>
            </button>
            <button
              onClick={() => handleViewChange('vouchers')}
              className={`w-full px-4 py-3 rounded-lg ${
                currentView === 'vouchers' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              } font-medium flex items-center space-x-3 transition-all duration-200`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Vouchers</span>
            </button>
            {!user.isStoreOwner ? (
              <button
                onClick={() => handleViewChange('store-owner-application')}
                className={`w-full px-4 py-3 rounded-lg ${
                  currentView === 'store-owner-application' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                } font-medium flex items-center space-x-3 transition-all duration-200`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Start Selling</span>
              </button>
            ) : (
              <button
                onClick={() => handleViewChange('store-management')}
                className={`w-full px-4 py-3 rounded-lg ${
                  currentView === 'store-management' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                } font-medium flex items-center space-x-3 transition-all duration-200`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-sm">Manage Store</span>
              </button>
            )}
            <button
              onClick={() => handleViewChange('settings')}
              className={`w-full px-4 py-3 rounded-lg ${
                currentView === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              } font-medium flex items-center space-x-3 transition-all duration-200`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="text-sm">Settings</span>
            </button>
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pt-8 border-t border-gray-100">
            <button className="w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {currentView === 'store-management' ? (
          <StoreManagement user={user} />
        ) : currentView === 'profile' ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            </div>

            <div className="text-center mb-8">
              <div className="relative">
                <div className="rounded-full w-24 h-24 bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-indigo-600 mx-auto mb-6">
                  {user && user.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-20 h-20" />
                  ) : (
                    <img src="./user.svg" alt="Profile" className="w-20 h-20" />
                  )}
                </div>
                <label className="cursor-pointer text-indigo-600 hover:text-indigo-700 block text-center">
                  <input
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleEdit}
                    className="hidden"
                  />
                  <span className="text-sm">Change Profile Picture</span>
                </label>
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowEdit(true)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm shadow-sm hover:shadow-lg flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {showEdit ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={editData.username}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={editData.firstName}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={editData.lastName}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Address Information</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                        <input
                          type="text"
                          name="street"
                          value={editData.address.street}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your street address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={editData.address.city}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province/State</label>
                        <input
                          type="text"
                          name="province"
                          value={editData.address.province}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your province/state"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={editData.address.zipCode}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your ZIP/postal code"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                        <textarea
                          name="additionalDetails"
                          value={editData.address.additionalDetails}
                          onChange={handleEdit}
                          rows="2"
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter additional address details (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={editData.address.contactNumber}
                          onChange={handleEdit}
                          className="mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200"
                          placeholder="Enter your contact number"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Name</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.firstName + ' ' + user.lastName || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Username</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.username || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Phone Number</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Address Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Street Address</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.address.street || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">City</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.address.city || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Province/State</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.address.province || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">ZIP/Postal Code</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.address.zipCode || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Additional Details</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.address.additionalDetails || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Contact Number</label>
                      <p className="mt-1 text-gray-900 font-medium">{user.address.contactNumber || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : currentView === 'purchases' ? (
          <Purchases />
        ) : currentView === 'notifications' ? (
          <Notifications />
        ) : currentView === 'vouchers' ? (
          <Vouchers />
        ) : currentView === 'settings' ? (
          <Settings />
        ) : currentView === 'store-owner-application' ? (
          <StoreOwnerApplication />
        ) : currentView === 'store-management' ? (
          <StoreManagement />
        ) : null}
      </div>
    </div>
  );
};

export default Profile;