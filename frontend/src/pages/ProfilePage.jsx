import { useEffect, useState } from 'react';
import { useLocation, useMatch, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useUser } from 'context';
import { useNotifications } from '../context/NotificationContext';
import {
    BiLogOut,
    BiEdit,
    BiUser,
    BiShoppingBag,
    BiBell,
    BiGift,
    BiStore,
    BiCog,
} from 'react-icons/bi';
import SignOutModal from '../components/modals/SignOutModal';

const Profile = () => {
    const navigate = useNavigate();
    const match = useMatch('/profile');
    const { user, performLogout } = useUser();
    const { unreadCount } = useNotifications();
    const [isEditing, setIsEditing] = useState(false);
    const [showSignOutModal, setShowSignOutModal] = useState(false);
    const [formData, setFormData] = useState({
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
    });

    // Navigation items
    const navItems = [
        { id: 'profile', icon: <BiUser />, label: 'Profile' },
        { id: 'purchases', icon: <BiShoppingBag />, label: 'Purchases' },
        {
            id: 'notifications',
            icon: <BiBell />,
            label: 'Notifications',
            ...(unreadCount > 0 && { badge: unreadCount }),
        },
        { id: 'vouchers', icon: <BiGift />, label: 'Vouchers' },
        user?.isStoreOwner
            ? { id: 'store-management', icon: <BiStore />, label: 'Manage Store' }
            : { id: 'store-owner-application', icon: <BiStore />, label: 'Start Selling' },
        { id: 'settings', icon: <BiCog />, label: 'Settings' },
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    profilePicture: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            handleImageUpload(e);
            return;
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement form submission
        console.log('Form submitted:', formData);
        setIsEditing(false);
    };

    const handleSignOut = () => {
        performLogout();
        setShowSignOutModal(false);
    };

    if (!user) return null;

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Sign Out Modal */}
            <SignOutModal
                isOpen={showSignOutModal}
                onClose={() => setShowSignOutModal(false)}
                onConfirm={handleSignOut}
            />

            {/* Header */}
            <header className='bg-white shadow-sm'>
                <div className='container mx-auto px-4 py-6'>
                    <div className='md:flex md:items-center md:justify-between'>
                        <div className='flex-1 min-w-0'>
                            <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>
                                My Account
                            </h2>
                        </div>
                        <div className='mt-4 flex md:mt-0 md:ml-4'>
                            <button
                                type='button'
                                onClick={() => setShowSignOutModal(true)}
                                className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-red-500 no-bg no-hover no-focus'
                            >
                                <BiLogOut className='-ml-1 mr-2 h-5 w-5 text-red-500' />
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className='container mx-auto px-4 py-8'>
                <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
                    {/* Sidebar Navigation */}
                    <aside className='hidden lg:block lg:col-span-2'>
                        <nav className='space-y-1'>
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.id}
                                    to={item.id === 'profile' ? '/profile' : `/profile/${item.id}`}
                                    end={item.id === 'profile'}
                                    className={({ isActive }) =>
                                        `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-700'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    <span className='mr-3 text-lg'>{item.icon}</span>
                                    <span className='truncate'>{item.label}</span>
                                    {item.badge && (
                                        <span className='ml-auto inline-block py-0.5 px-2.5 text-xs leading-4 font-medium bg-indigo-100 text-indigo-800 rounded-full'>
                                            {item.badge}
                                        </span>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className='lg:col-span-10'>
                        {!match ? (
                            <Outlet />
                        ) : (
                            <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
                                {/* Profile Header */}
                                <div className='px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-cyan-600'>
                                    <div className='flex items-center'>
                                        <div className='relative'>
                                            <div className='h-24 w-24 rounded-full bg-white p-1'>
                                                <img
                                                    className='h-full w-full rounded-full object-cover'
                                                    src={user?.profilePicture || '/user.svg'}
                                                    alt='Profile'
                                                />
                                            </div>
                                            <label className='absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-gray-100'>
                                                <BiEdit className='h-5 w-5 text-gray-600' />
                                                <input
                                                    type='file'
                                                    className='hidden'
                                                    accept='image/*'
                                                    onChange={handleImageUpload}
                                                />
                                            </label>
                                        </div>
                                        <div className='ml-6'>
                                            <h3 className='text-2xl font-bold text-white'>
                                                { user.full_name }
                                            </h3>
                                            <p className='text-indigo-100'>{user?.email}</p>
                                            {user?.isStoreOwner && (
                                                <span className='mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                                                    Store Owner
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Content */}
                                <div className='px-4 py-5 sm:p-6'>
                                    {isEditing ? (
                                        // Edit Form
                                        <form className='space-y-6' onSubmit={handleSubmit}>
                                            <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                                                {/* Personal Information */}
                                                <div className='sm:col-span-6'>
                                                    <h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
                                                        Personal Information
                                                    </h3>
                                                </div>

                                                <div className='sm:col-span-3'>
                                                    <label
                                                        htmlFor='firstName'
                                                        className='block text-sm font-medium text-gray-700'
                                                    >
                                                        First name
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='firstName'
                                                        id='firstName'
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>

                                                <div className='sm:col-span-3'>
                                                    <label
                                                        htmlFor='lastName'
                                                        className='block text-sm font-medium text-gray-700'
                                                    >
                                                        Last name
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='lastName'
                                                        id='lastName'
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>

                                                <div className='sm:col-span-4'>
                                                    <label
                                                        htmlFor='email'
                                                        className='block text-sm font-medium text-gray-700'
                                                    >
                                                        Email address
                                                    </label>
                                                    <input
                                                        type='email'
                                                        name='email'
                                                        id='email'
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>

                                                <div className='sm:col-span-2'>
                                                    <label
                                                        htmlFor='phone'
                                                        className='block text-sm font-medium text-gray-700'
                                                    >
                                                        Phone
                                                    </label>
                                                    <input
                                                        type='tel'
                                                        name='phone'
                                                        id='phone'
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>

                                                {/* Address Information */}
                                                <div className='sm:col-span-6 border-t border-gray-200 pt-6 mt-6'>
                                                    <h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
                                                        Address Information
                                                    </h3>
                                                </div>

                                                <div className='sm:col-span-6'>
                                                    <label
                                                        htmlFor='address.street'
                                                        className='block text-sm font-medium text-gray-700'
                                                    >
                                                        Street address
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='address.street'
                                                        id='address.street'
                                                        value={formData.address.street}
                                                        onChange={handleInputChange}
                                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>

                                                <div className='sm:col-span-2'>
                                                    <label
                                                        htmlFor='address.city'
                                                        className='block text-sm font-medium text-gray-700'
                                                    >
                                                        City
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='address.city'
                                                        id='address.city'
                                                        value={formData.address.city}
                                                        onChange={handleInputChange}
                                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>

                                                <div className='sm:col-span-2'>
                                                    <label
                                                        htmlFor='address.province'
                                                        className='block text-sm font-medium text-gray-700'
                                                    >
                                                        State/Province
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='address.province'
                                                        id='address.province'
                                                        value={formData.address.province}
                                                        onChange={handleInputChange}
                                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>

                                                <div className='sm:col-span-2'>
                                                    <label
                                                        htmlFor='address.zipCode'
                                                        className='block text-sm font-medium text-gray-700'
                                                    >
                                                        ZIP / Postal code
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='address.zipCode'
                                                        id='address.zipCode'
                                                        value={formData.address.zipCode}
                                                        onChange={handleInputChange}
                                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>

                                                <div className='sm:col-span-6'>
                                                    <label
                                                        htmlFor='address.additionalDetails'
                                                        className='block text-sm font-medium text-gray-700'
                                                    >
                                                        Additional details
                                                    </label>
                                                    <textarea
                                                        id='address.additionalDetails'
                                                        name='address.additionalDetails'
                                                        rows={3}
                                                        value={formData.address.additionalDetails}
                                                        onChange={handleInputChange}
                                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex justify-end space-x-3 pt-6 border-t border-gray-200'>
                                                <button
                                                    type='button'
                                                    onClick={() => setIsEditing(false)}
                                                    className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-red-500 no-bg no-hover no-focus'
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type='submit'
                                                    className='inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white'
                                                >
                                                    Save changes
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        // View Mode
                                        <div className='space-y-8'>
                                            <div className='flex justify-end'>
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        setFormData({
                                                            ...user,
                                                            address: user.address || {
                                                                street: '',
                                                                city: '',
                                                                province: '',
                                                                zipCode: '',
                                                                additionalDetails: '',
                                                                contactNumber: '',
                                                            },
                                                        });
                                                        setIsEditing(true);
                                                    }}
                                                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                >
                                                    <BiEdit className='-ml-1 mr-2 h-5 w-5' />
                                                    Edit Profile
                                                </button>
                                            </div>

                                            <div className='grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-8'>
                                                {/* Personal Information */}
                                                <div>
                                                    <h3 className='text-lg leading-6 font-medium text-gray-900'>
                                                        Personal Information
                                                    </h3>
                                                    <div className='mt-6 space-y-4'>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-500'>
                                                                Full name
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.full_name}
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-500'>
                                                                Username
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.username || 'Not provided'}
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-500'>
                                                                Email address
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.email}
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-500'>
                                                                Phone
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.address?.[0]?.phone_number ?? 'Not provided'}
                                                            </dd>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Address Information */}
                                                <div>
                                                    <h3 className='text-lg leading-6 font-medium text-gray-900'>
                                                        Address Information
                                                    </h3>
                                                    <div className='mt-6 space-y-4'>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-500'>
                                                                Address
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.address?.street ||
                                                                    'Not provided'}
                                                            </dd>
                                                        </div>
                                                        <div className='grid grid-cols-2 gap-4'>
                                                            <div>
                                                                <dt className='text-sm font-medium text-gray-500'>
                                                                    City
                                                                </dt>
                                                                <dd className='mt-1 text-sm text-gray-900'>
                                                                    {user?.address?.city ||
                                                                        'Not provided'}
                                                                </dd>
                                                            </div>
                                                            <div>
                                                                <dt className='text-sm font-medium text-gray-500'>
                                                                    State/Province
                                                                </dt>
                                                                <dd className='mt-1 text-sm text-gray-900'>
                                                                    {user?.address?.province ||
                                                                        'Not provided'}
                                                                </dd>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-500'>
                                                                ZIP/Postal code
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.address?.zipCode ||
                                                                    'Not provided'}
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-500'>
                                                                Additional Details
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.address?.additionalDetails ||
                                                                    'Not provided'}
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-500'>
                                                                Contact Number
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.address?.contactNumber ||
                                                                    'Not provided'}
                                                            </dd>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
