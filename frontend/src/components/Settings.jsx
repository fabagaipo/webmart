import React, { useState } from 'react';

const Settings = () => {
    const [settingsData, setSettingsData] = useState({
        notifications: {
            email: true,
            sms: true,
            push: true,
        },
        language: 'en',
        currency: 'PHP',
        theme: 'light',
    });

    const handleSettingsChange = (setting, value) => {
        setSettingsData((prev) => ({
            ...prev,
            [setting]: value,
        }));
    };

    return (
        <div className='bg-white rounded-2xl shadow-xl p-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>Settings</h1>

            <div className='space-y-8'>
                {/* Account Settings */}
                <div>
                    <h2 className='text-xl font-semibold text-gray-900 mb-6'>Account Settings</h2>
                    <div className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Language
                            </label>
                            <select
                                value={settingsData.language}
                                onChange={(e) => handleSettingsChange('language', e.target.value)}
                                className='mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200'
                            >
                                <option value='en'>English</option>
                                <option value='ceb'>Cebuano</option>
                                <option value='es'>Español</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Currency
                            </label>
                            <select
                                value={settingsData.currency}
                                onChange={(e) => handleSettingsChange('currency', e.target.value)}
                                className='mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200'
                            >
                                <option value='PHP'>Philippine Peso (PHP)</option>
                                <option value='USD'>US Dollar (USD)</option>
                                <option value='EUR'>Euro (EUR)</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Theme
                            </label>
                            <select
                                value={settingsData.theme}
                                onChange={(e) => handleSettingsChange('theme', e.target.value)}
                                className='mt-1 block w-full rounded-lg text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-opacity-50 focus:shadow-sm transition-all duration-200'
                            >
                                <option value='light'>Light</option>
                                <option value='dark'>Dark</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div>
                    <h2 className='text-xl font-semibold text-gray-900 mb-6'>
                        Notification Settings
                    </h2>
                    <div className='space-y-4'>
                        <div className='flex items-center space-x-4'>
                            <label className='flex items-center'>
                                <input
                                    type='checkbox'
                                    checked={settingsData.notifications.email}
                                    onChange={(e) =>
                                        handleSettingsChange('notifications', {
                                            ...settingsData.notifications,
                                            email: e.target.checked,
                                        })
                                    }
                                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                                />
                                <span className='ml-2 text-sm text-gray-700'>
                                    Email Notifications
                                </span>
                            </label>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <label className='flex items-center'>
                                <input
                                    type='checkbox'
                                    checked={settingsData.notifications.sms}
                                    onChange={(e) =>
                                        handleSettingsChange('notifications', {
                                            ...settingsData.notifications,
                                            sms: e.target.checked,
                                        })
                                    }
                                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                                />
                                <span className='ml-2 text-sm text-gray-700'>
                                    SMS Notifications
                                </span>
                            </label>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <label className='flex items-center'>
                                <input
                                    type='checkbox'
                                    checked={settingsData.notifications.push}
                                    onChange={(e) =>
                                        handleSettingsChange('notifications', {
                                            ...settingsData.notifications,
                                            push: e.target.checked,
                                        })
                                    }
                                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                                />
                                <span className='ml-2 text-sm text-gray-700'>
                                    Push Notifications
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div>
                    <h2 className='text-xl font-semibold text-gray-900 mb-6'>Security Settings</h2>
                    <div className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Change Password
                            </label>
                            <button
                                type='button'
                                className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-lg'
                            >
                                Update Password
                            </button>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Two-Factor Authentication
                            </label>
                            <button
                                type='button'
                                className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-lg'
                            >
                                Enable 2FA
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Changes Button */}
                <div className='flex justify-end'>
                    <button
                        type='button'
                        className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-lg'
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
