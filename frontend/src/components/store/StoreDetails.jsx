import React, { useState, useEffect, useCallback } from 'react';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LuCopy, LuCheck } from 'react-icons/lu';
import { BsPersonHeart, BsPersonFillCheck } from 'react-icons/bs';
import { MdStarRate } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import StoreProducts from './StoreProducts';
import StoreReviews from './StoreReviews';
import StoreContact from './StoreContact';
import NewArrivals from '../NewArrivals';

const StoreDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    
    // Get active tab from URL
    const getActiveTab = useCallback(() => {
        const pathParts = location.pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        
        // If we're at the root of the store, it's the overview
        if (lastPart === id) return 'overview';
        
        // Otherwise, return the last part of the URL (products, reviews, contact)
        return lastPart;
    }, [id, location.pathname])

    const [activeTab, setActiveTab] = useState(getActiveTab());
    const [copiedCode, setCopiedCode] = useState(null);

    // Update activeTab when URL changes
    useEffect(() => {
        setActiveTab(getActiveTab());
    }, [location.pathname, getActiveTab]);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        toast.success('Voucher code copied!', {
            position: 'bottom-center',
        });
        setTimeout(() => setCopiedCode(null), 1000);
    };

    // Store data
    const store = {
        id: parseInt(id),
        name: 'Store Name',
        logo: 'https://placehold.co/200x200/FDC700/FFFFFF?text=Logo',
        banner: 'https://placehold.co/1200x400/555/FFFFFF?text=Banner',
        rating: 4.8,
        reviewsCount: 1245,
        followers: 5823,
        category: 'Fashion',
        joiningDate: '2024-01-15',
        description: 'Welcome to the store.',
        overview: 'Welcome to the store.',
        featuredProducts: [
            {
                id: 1,
                name: 'Featured Product 1',
                price: 99.99,
                originalPrice: 149.99,
                discount: 50,
                image: 'https://placehold.co/300x300/0053E2/FFF',
                category: 'Dresses',
            },
            {
                id: 2,
                name: 'Featured Product 2',
                price: 49.99,
                originalPrice: 199.99,
                discount: 25,
                image: 'https://placehold.co/300x300/002E99/FFF',
                category: 'Shoes',
            },
            {
                id: 3,
                name: 'Featured Product 3',
                price: 749.99,
                originalPrice: 1499.99,
                discount: 50,
                image: 'https://placehold.co/300x300/0053E2/FFF',
                category: 'Accessories',
            },
            {
                id: 4,
                name: 'Featured Product 4',
                price: 1799.99,
                originalPrice: 2999.99,
                discount: 60,
                image: 'https://placehold.co/300x300/002E99/FFF',
                category: 'Accessories',
            },
            {
                id: 5,
                name: 'Featured Product 5',
                price: 26.99,
                originalPrice: 89.99,
                discount: 30,
                image: 'https://placehold.co/300x300/0053E2/FFF',
                category: 'Accessories',
            },
        ],
        vouchers: [
            {
                id: 1,
                code: 'WELCOME20',
                description: '20% off your first purchase',
                bg: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
                expiryDate: '2025-12-31',
                minSpend: 500,
                remaining: 100,
            },
            {
                id: 2,
                code: 'FASHION15',
                description: '15% off fashion items',
                bg: 'bg-gradient-to-r from-green-500 to-green-600',
                expiryDate: '2025-11-30',
                minSpend: 1000,
                remaining: 50,
            },
            {
                id: 3,
                code: 'SUMMER10',
                description: '10% off all items',
                bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
                expiryDate: '2025-09-30',
                minSpend: 2000,
                remaining: 200,
            },
        ],
        reviews: [
            {
                id: 1,
                user: 'John Doe',
                rating: 5,
                comment: 'Great store! Amazing products and customer service.',
                date: '2025-06-01',
            },
            {
                id: 2,
                user: 'Jane Smith',
                rating: 4,
                comment: 'Good selection of products. Fast shipping.',
                date: '2025-05-28',
            },
        ],
        contact: {
            email: 'contact@store.com',
            phone: '+1234567890',
            address: '123 Store Street, City, Country',
            hours: '9:00 AM - 6:00 PM',
            social: {
                facebook: 'https://facebook.com/store',
                instagram: 'https://instagram.com/store',
                twitter: 'https://twitter.com/store',
            },
        },
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'products':
                return <StoreProducts products={store.featuredProducts} />;
            case 'reviews':
                return <StoreReviews reviews={store.reviews} />;
            case 'contact':
                return <StoreContact contact={store.contact} />;
            default: // 'overview'
                return (
                    <div className='space-y-8'>
                        <div>
                            <h3 className='text-lg font-medium text-gray-900 mb-4'>
                                Store Overview
                            </h3>
                            <p className='text-gray-600'>{store.overview}</p>
                        </div>
                        <div>
                            <h3 className='text-lg font-medium text-gray-900 mb-4'>
                                Available Vouchers
                            </h3>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                {store.vouchers.map((voucher, index) => (
                                    <div
                                        key={index}
                                        className={`relative rounded-lg overflow-hidden ${voucher.bg} text-white p-6 transition-transform hover:scale-[1.02]`}
                                    >
                                        <div className='absolute top-4 left-4 text-4xl opacity-70'>
                                            🏷️
                                        </div>
                                        <div className='pl-10 flex flex-col justify-between h-full'>
                                            <div>
                                                <h3 className='text-xl font-semibold mb-2'>
                                                    {voucher.code}
                                                </h3>
                                                <p className='text-sm mb-4'>
                                                    {voucher.description}
                                                </p>
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex items-center space-x-4'>
                                                        <span className='text-sm'>
                                                            Expires:{' '}
                                                            {new Date(
                                                                voucher.expiryDate
                                                            ).toLocaleDateString()}
                                                        </span>
                                                        <span className='text-sm'>
                                                            Min Spend: ₱{voucher.minSpend}
                                                        </span>
                                                        <span className='text-sm'>
                                                            Remaining: {voucher.remaining}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleCopy(voucher.code)}
                                                        className='p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors no-bg no-focus no-hover'
                                                    >
                                                        {copiedCode === voucher.code ? (
                                                            <LuCheck className='w-5 h-5' />
                                                        ) : (
                                                            <LuCopy className='w-5 h-5' />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className='text-lg font-medium text-gray-900 mb-4'>
                                Featured Products
                            </h3>
                            <div className='flex flex-wrap gap-16 justify-center'>
                                {store.featuredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className='bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                                    >
                                        <Link to={`/product/${product.id}`} className='block'>
                                            <div className='relative'>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className='w-full h-full object-cover'
                                                />
                                                <div className='absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm'>
                                                    {product.discount}% OFF
                                                </div>
                                            </div>
                                            <div className='p-4'>
                                                <h4 className='text-sm font-medium text-gray-900 mb-1'>
                                                    {product.name}
                                                </h4>
                                                <p className='text-xs text-gray-500 mb-2'>
                                                    {product.category}
                                                </p>
                                                <div className='flex items-center justify-between'>
                                                    <div>
                                                        <span className='text-sm font-semibold text-red-500'>
                                                            ₱{product.price}
                                                        </span>
                                                        {product.originalPrice && (
                                                            <span className='text-xs text-gray-400 line-through ml-2'>
                                                                ₱{product.originalPrice}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Store Banner Image */}
                        <div className='mt-8'>
                            <img
                                src='https://placehold.co/800@3x.png'
                                alt={`${store.name} Banner`}
                                className='w-full h-[625px] object-cover rounded-lg'
                            />
                        </div>
                        {/* New Arrivals Section */}
                        <h3 className='text-lg font-medium text-gray-900 mb-4'>New Arrivals</h3>
                        <NewArrivals />
                    </div>
                );
        }
    };

    return (
        <div className='py-8 px-4 sm:px-6 lg:px-8'>
            {/* Store Banner */}
            <div className='mb-8'>
                <img
                    src={store.banner}
                    alt={`₱{store.name} Banner`}
                    className='w-full h-64 object-cover rounded-lg'
                />
            </div>

            {/* Store Header */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
                <div className='flex items-center'>
                    <img
                        src={store.logo}
                        alt={`₱{store.name} Logo`}
                        className='w-20 h-20 rounded-full mr-4'
                    />
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>{store.name}</h1>
                        <div className='flex items-center mt-2'>
                            <MdStarRate className='w-4 h-4 text-yellow-400' />
                            <span className='ml-1 text-sm text-gray-600'>{store.rating}</span>
                            <span className='ml-1 text-sm text-gray-400'>
                                ({store.reviewsCount} reviews)
                            </span>
                            <span className='flex items-center ml-4'>
                                <BsPersonHeart className='w-4 h-4 mr-1 text-gray-600' />
                                <span className='text-sm text-gray-400'>
                                    {store.followers} followers
                                </span>
                            </span>
                            <span className='flex items-center ml-4'>
                                <BsPersonFillCheck className='w-4 h-4 mr-1 text-gray-600' />
                                <span className='text-sm text-gray-400'>Joined: June 4, 2025</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center space-x-4'>
                    <button className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700'>
                        <svg
                            className='w-5 h-5 mr-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                            />
                        </svg>
                        Follow Store
                    </button>
                    <button className='inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-white hover:bg-gray-50'>
                        <svg
                            className='w-5 h-5 mr-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                            />
                        </svg>
                        Share
                    </button>
                </div>
            </div>

            {/* Store Info Tabs */}
            <div className='mb-8'>
                <nav className='flex space-x-2 border-b border-gray-200' aria-label='Tabs'>
                    <NavLink
                        to='.'
                        end
                        className={({ isActive }) =>
                            `px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                                isActive
                                    ? 'text-primary-600 border-b-2 border-primary-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`
                        }
                    >
                        Overview
                    </NavLink>
                    <NavLink
                        to='products'
                        className={({ isActive }) =>
                            `px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                                isActive
                                    ? 'text-primary-600 border-b-2 border-primary-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to='reviews'
                        className={({ isActive }) =>
                            `px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                                isActive
                                    ? 'text-primary-600 border-b-2 border-primary-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`
                        }
                    >
                        Reviews
                    </NavLink>
                    <NavLink
                        to='contact'
                        className={({ isActive }) =>
                            `px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                                isActive
                                    ? 'text-primary-600 border-b-2 border-primary-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`
                        }
                    >
                        Contact
                    </NavLink>
                </nav>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    );
};

export default StoreDetails;
