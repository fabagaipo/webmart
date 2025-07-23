import { useEffect, useState } from 'react';
import { useLocation, useMatch, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useUser } from 'context';
import { useNotifications } from '../context/NotificationContext';
import { useUpload  } from 'custom-hooks/useUpload';

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
import { LuClipboardPenLine } from "react-icons/lu";
import SignOutModal from '../components/modals/SignOutModal';
import { Address } from '../components/Address';

const Profile = () => {
    const navigate = useNavigate();
    const { uploadFile } = useUpload()
    const match = useMatch('/profile');
    const { user, performLogout, updateUserAvatar } = useUser();
    const { unreadCount } = useNotifications();
    const [isEditing, setIsEditing] = useState(false);
    const [addressToEdit, setAddressToEdit] = useState(null);
    const [showSignOutModal, setShowSignOutModal] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        avatar_url: user.avatar_url,
        address: user.addresses,
    });
    const [scrolled, setScrolled] = useState();

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
        // Set to false temporarily since isStoreOwner is not yet implemented
        !user?.isStoreOwner
            ? { 
                id: 'store-management',
                icon: <BiStore />,
                label: 'Manage Store',
                to: 'http://localhost:3000/store/dashboard'
            }
            : { id: 'store-owner-application', icon: <LuClipboardPenLine />, label: 'Start Selling' },
        { id: 'settings', icon: <BiCog />, label: 'Settings' },
    ];

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            let uploadedFile = undefined;
            try {
               uploadedFile = await uploadFile({file: file, config: { profile_upload: true }})
                await updateUserAvatar(uploadedFile);
                setFormData(prev => ({ ...prev, avatar_url: uploadedFile.url}));
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleEditAddress = (address) => {
        setAddressToEdit(address);
    }

    const setScrolling = (e) => {
        const el = e.target;
        setScrolled(el.scrollTop > 0);
    }

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
            <SignOutModal
                isOpen={showSignOutModal}
                onClose={() => setShowSignOutModal(false)}
                onConfirm={handleSignOut}
            />
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
                    <aside className='hidden lg:block lg:col-span-2'>
                        <nav className='space-y-1'>
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.id}
                                    to={item.to || (item.id === 'profile' ? '/profile' : `/profile/${item.id}`)}
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
                    <div className='lg:col-span-10'>
                        {!match ? (
                            <Outlet />
                        ) : (
                            <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
                                <div className='px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-cyan-600'>
                                    <div className='flex items-center'>
                                        <div className='relative'>
                                            <div className='h-24 w-24 rounded-full bg-white p-1'>
                                                <img
                                                    className='h-full w-full rounded-full object-cover'
                                                    src={formData.avatar_url ?? '/user.svg'}
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
                                <div className='px-4 py-5 sm:p-6'>
                                    {isEditing ? (
                                        <form className='space-y-6' onSubmit={handleSubmit}>
                                            <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
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
                                        <div className='space-y-8'>
                                            <div className='grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-8'>
                                                <div>
                                                    <h3 className='text-lg leading-6 font-medium text-gray-900'>
                                                        Personal Information
                                                    </h3>
                                                    <div className='mt-6 space-y-4'>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-700'>
                                                                Full name
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.full_name}
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-700'>
                                                                Username
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.username || 'Not provided'}
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className='text-sm font-medium text-gray-700'>
                                                                Email address
                                                            </dt>
                                                            <dd className='mt-1 text-sm text-gray-900'>
                                                                {user?.email}
                                                            </dd>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className='text-lg leading-6 font-medium text-gray-900'>
                                                        Address
                                                    </h3>
                                                    {!addressToEdit ?
                                                        <ul
                                                            className={`mt-6 overflow-auto h-40 container flex flex-col gap-5 ${scrolled ? 'border-t-1 border-gray-100': ''}`}
                                                            onScroll={setScrolling}
                                                        >
                                                            { user['addresses'].map((address, idx) => {
                                                                return (
                                                                    <Address
                                                                        key={idx}
                                                                        address={address}
                                                                        onEdit={handleEditAddress}
                                                                    />
                                                                )
                                                            })}
                                                        </ul>
                                                        :
                                                        <Address
                                                            addressToEdit={addressToEdit}
                                                            onEdit={handleEditAddress}
                                                        />
                                                    }
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
