import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaSearch,
    FaCalendarAlt,
    FaUser,
    FaShoppingCart,
    FaBell,
    FaExternalLinkAlt,
} from 'react-icons/fa';
import Marquee from 'react-fast-marquee';
import { useCart } from '../hooks/useCart';
import { useNotifications } from '../hooks/useNotifications';
import NotificationItem from './notification/NotificationItem';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    // Sale messages that will scroll in the marquee
    const saleMessages = [
        '🔥 FLAT 50% OFF on Electronics & Appliances',
        '🚚 Free Shipping on Orders Over PHP500',
        '💳 Use code: WEBMART25 for Extra 25% Off',
        '📱 New Arrivals: Latest Smartphones in Stock!',
        '🎧 Limited Time: 40% OFF on Audio Devices',
        '✈️ Same Day Delivery Available in Metro Manila',
        '💻 Back to School Sale: Laptops from PHP15,999',
        '💳 Buy Now, Pay Later with 0% Interest',
        '📺 Smart TV Deals - Up to 35% OFF',
        '🎮 Gaming Consoles - Bundle Deals Available',
        '🔋 Power Banks & Accessories - 30% OFF',
        '🎁 Special Offer: Free Gift with Purchase Over PHP2,000',
    ];

    useEffect(() => {
        // Set the end time for the sale (Currently set to 24 hours from now)
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0'),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='flex items-center w-full overflow-hidden'>
            {/* Sale Timer - Fixed width */}
            <div className='w-48 flex-shrink-0 pr-4'>
                <div className='flex items-center space-x-1'>
                    <FaCalendarAlt className='text-yellow-400 flex-shrink-0' />
                    <div className='text-center w-full'>
                        <div className='text-xs text-blue-100 whitespace-nowrap'>
                            Super Sale Ends In
                        </div>
                        <div className='flex items-center justify-center space-x-1'>
                            <span className='text-sm font-medium bg-blue-800 px-1.5 py-0.5 rounded'>
                                {timeLeft.hours}
                            </span>
                            <span>:</span>
                            <span className='text-sm font-medium bg-blue-800 px-1.5 py-0.5 rounded'>
                                {timeLeft.minutes}
                            </span>
                            <span>:</span>
                            <span className='text-sm font-medium bg-blue-800 px-1.5 py-0.5 rounded'>
                                {timeLeft.seconds}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vertical Divider */}
            <div className='h-8 w-px bg-blue-600 flex-shrink-0'></div>

            {/* Scrolling Sale Message */}
            <div className='flex-1 overflow-hidden w-full'>
                <Marquee speed={40} gradient={false} pauseOnHover className='py-1 w-full'>
                    {saleMessages.map((message, index) => (
                        <span
                            key={index}
                            className='mx-8 text-sm font-medium text-white whitespace-nowrap'
                        >
                            {message}
                        </span>
                    ))}
                </Marquee>
            </div>

            {/* Vertical Divider */}
            <div className='h-8 w-px bg-blue-600 flex-shrink-0'></div>
        </div>
    );
};

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();
    const { cart } = useCart();
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const notificationsContainer = document.querySelector('.notifications-container');
            const notificationButton = document.querySelector('.notification-button');

            // Check if the click is outside both the notifications container and the notification button
            if (
                showNotifications &&
                notificationsContainer &&
                !notificationsContainer.contains(event.target) &&
                notificationButton &&
                !notificationButton.contains(event.target)
            ) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    // Calculate total items in cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const navLinks = ['Categories', 'Products', 'Stores', 'Vouchers'];

    return (
        <>
            {/* Top Bar */}
            <header className='bg-blue-700 text-white overflow-x-hidden'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center justify-between py-2'>
                        <div className='flex items-center space-x-4 w-full'>
                            <CountdownTimer />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Header */}
            <header className='bg-gray-100 shadow-sm sticky top-0 z-50'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center justify-between py-4'>
                        <Link to='/' className='flex items-center space-x-2'>
                            <img src='/webmart-icon.svg' alt='WebMart' className='h-12 w-12' />
                            <span className='text-2xl font-bold text-blue-700'>WebMart</span>
                        </Link>

                        <form onSubmit={handleSearch} className='flex-1 max-w-5xl mx-4'>
                            <div className='relative'>
                                <input
                                    type='text'
                                    placeholder='Search WebMart'
                                    className='w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    type='submit'
                                    className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 no-bg no-hover'
                                >
                                    <FaSearch className='text-gray-600' />
                                </button>
                            </div>
                        </form>

                        <div className='flex items-center space-x-8'>
                            <div className='relative'>
                                <Link
                                    to='#'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowNotifications(!showNotifications);
                                    }}
                                    className='flex flex-col items-center text-sm text-gray-800 hover:text-blue-600 relative no-bg no-focus no-hover notification-button'
                                >
                                    <FaBell className='text-xl mb-1' />
                                    {unreadCount > 0 && (
                                        <span className='absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </Link>
                                {showNotifications && (
                                    <div className='absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-2 z-50 notifications-container'>
                                        <div className='px-4 py-3 border-b border-gray-100 flex justify-between items-center'>
                                            <h3 className='text-sm font-medium text-gray-900'>
                                                Notifications
                                            </h3>
                                            <div className='flex items-center gap-2'>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        markAllAsRead();
                                                    }}
                                                    className='text-sm no-bg text-indigo-600 no-hover'
                                                >
                                                    Mark all as read
                                                </button>
                                                <Link
                                                    to='/profile/notifications'
                                                    className='text-sm text-indigo-600 hover:text-indigo-700 no-bg no-hover flex items-center'
                                                    onClick={() => setShowNotifications(false)}
                                                >
                                                    <FaExternalLinkAlt className='w-3 h-3' />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='max-h-96 overflow-y-auto'>
                                            {notifications.length > 0 ? (
                                                notifications.map((notification) => (
                                                    <NotificationItem
                                                        key={notification.id}
                                                        notification={notification}
                                                        onMarkAsRead={(id) => {
                                                            markAsRead(id);
                                                        }}
                                                    />
                                                ))
                                            ) : (
                                                <div className='p-4 text-center text-gray-500'>
                                                    No notifications
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link
                                to='/profile'
                                className='flex flex-col items-center text-sm text-gray-800 hover:text-blue-600'
                            >
                                <FaUser className='text-xl mb-1' />
                            </Link>
                            <Link
                                to='/cart'
                                className='flex flex-col items-center text-sm text-gray-800 hover:text-blue-600 relative'
                            >
                                <FaShoppingCart className='text-xl mb-1' />
                                <span className='absolute -top-1 -right-2 bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>
                                    {cartItemCount > 9 ? '9+' : cartItemCount}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className='bg-blue-600 text-white'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center'>
                        <div className='hidden md:flex overflow-x-auto'>
                            {navLinks.map((link) => (
                                <Link
                                    key={link}
                                    to={`/${link.toLowerCase()}`}
                                    className='px-4 py-3 font-medium !text-white hover:bg-blue-700 whitespace-nowrap'
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
