import React from 'react';

const notificationTypes = {
  success: {
    color: 'bg-green-50',
    icon: 'M5 13l4 4L19 7',
    iconColor: 'bg-green-400'
  },
  info: {
    color: 'bg-blue-50',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    iconColor: 'bg-blue-400'
  },
  offer: {
    color: 'bg-yellow-50',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    iconColor: 'bg-yellow-400'
  }
};

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const type = notificationTypes[notification.type];
  const isRead = notification.read;

  return (
    <div
      className={`flex items-start p-3 rounded-lg ${isRead ? 'bg-gray-50' : type.color}`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isRead ? 'bg-gray-200' : type.iconColor}`}>
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={type.icon} />
        </svg>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
          <p className="text-xs text-gray-500">
            {new Date(notification.timestamp).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
