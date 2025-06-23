import React, { useState } from 'react';
import NotificationContext from './NotificationContext';

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Welcome to WebMart!',
            message: 'Thank you for signing up. Enjoy your shopping experience!',
            type: 'info',
            timestamp: new Date().toISOString(),
            read: false,
        },
        {
            id: 2,
            title: 'Special Offer',
            message: 'Get 10% off your first order with code WELCOME10',
            type: 'offer',
            timestamp: new Date().toISOString(),
            read: false,
        },
        {
            id: 3,
            title: 'Order Confirmation',
            message: 'Your order #123456 has been successfully placed!',
            type: 'success',
            timestamp: new Date().toISOString(),
            read: false,
        },
        {
            id: 4,
            title: 'Shipping Update',
            message: 'Your order is being prepared for shipping.',
            type: 'info',
            timestamp: new Date().toISOString(),
            read: false,
        },
    ]);

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAsRead,
                markAllAsRead,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
