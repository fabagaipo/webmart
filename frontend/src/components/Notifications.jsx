import React, { useState } from 'react';
import NotificationItem from './NotificationItem';

const sampleNotifications = [
  {
    id: 1,
    title: 'Order Confirmation',
    message: 'Your order #123456 has been successfully placed!',
    type: 'success',
    timestamp: '2025-05-20 14:30',
    read: false
  },
  {
    id: 2,
    title: 'Shipping Update',
    message: 'Your order is being prepared for shipping.',
    type: 'info',
    timestamp: '2025-05-19 10:45',
    read: true
  },
  {
    id: 3,
    title: 'Special Offer',
    message: 'Get 20% off on your next purchase! Use code WEBMART20',
    type: 'offer',
    timestamp: '2025-05-18 16:20',
    read: false
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })))
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <button 
          onClick={markAllAsRead}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={markAsRead}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
