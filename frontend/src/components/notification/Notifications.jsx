import React from 'react';
import NotificationItem from './NotificationItem';
import { useNotifications } from '../../hooks/useNotifications';

const Notifications = () => {
    const { notifications, markAsRead, markAllAsRead } = useNotifications();

    return (
        <div className='bg-white rounded-2xl shadow-xl p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-semibold text-gray-900'>Notifications</h1>
                <button
                    onClick={markAllAsRead}
                    className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors no-focus'
                >
                    Mark All as Read
                </button>
            </div>

            <div className='space-y-3'>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={markAsRead}
                        />
                    ))
                ) : (
                    <div className='text-center py-4 text-gray-500'>No notifications</div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
