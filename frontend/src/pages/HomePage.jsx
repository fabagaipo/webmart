import React from 'react';
import { Link } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';
import { MdStarRate } from 'react-icons/md';
import Slideshow from '../components/Slideshow';
import CategoryCards from '../components/category/CategoryCards';
import PromoCollage from '../components/PromoCollage';
import FeaturedProducts from '../components/product/FeaturedProducts';

function HomePage() {
    return (
        <div className='home-page'>
            {/* Hero Section */}
            <Slideshow />

            {/* Category Grid */}
            <CategoryCards />

            {/* Top Stores */}
            <section className='py-8'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl font-semibold text-gray-900'>Top Stores</h2>
                        <Link
                            to='/stores'
                            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700'
                        >
                            View All Stores
                            <svg
                                className='ml-2 -mr-1 h-4 w-4'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </Link>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
                        {[
                            {
                                id: 1,
                                name: 'Louis Vuitton',
                                rating: 4.8,
                                reviews: 1245,
                                image: 'https://placehold.co/300x200/0053E2/FFFFFF?text=Louis+Vuitton',
                                category: 'Fashion',
                            },
                            {
                                id: 2,
                                name: 'PowerMac Official Store',
                                rating: 4.9,
                                reviews: 987,
                                image: 'https://placehold.co/300x200/0071DC/FFFFFF?text=PowerMac+Official+Store',
                                category: 'Electronics',
                            },
                            {
                                id: 3,
                                name: 'SM Home',
                                rating: 4.7,
                                reviews: 1560,
                                image: 'https://placehold.co/300x200/004F9A/FFFFFF?text=SM+Home',
                                category: 'Home & Living',
                            },
                            {
                                id: 4,
                                name: 'Samyang Official',
                                rating: 4.8,
                                reviews: 2134,
                                image: 'https://placehold.co/300x200/003B7A/FFFFFF?text=Samyang+Official',
                                category: 'Food & Beverages',
                            },
                            {
                                id: 5,
                                name: 'National Bookstore',
                                rating: 4.9,
                                reviews: 876,
                                image: 'https://placehold.co/300x200/002E99/FFFFFF?text=National+Bookstore',
                                category: 'Books & Stationery',
                            },
                        ].map((store) => (
                            <Link
                                to={`/store/${store.id}`}
                                key={store.id}
                                className='block'
                            >
                                <div className='bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1'>
                                    <div className='aspect-square relative'>
                                        <img
                                            src={store.image}
                                            alt={store.name}
                                            className='w-full h-full object-cover'
                                        />
                                        <div className='absolute top-2 right-2 bg-yellow-200 text-black px-3 py-1 rounded-full text-sm flex items-center gap-1'>
                                            <FaCrown /> Top {store.id}
                                        </div>
                                    </div>
                                    <div className='p-4'>
                                        <h3 className='text-sm font-medium text-gray-900 mb-1'>
                                            {store.name}
                                        </h3>
                                        <div className='flex items-center mb-2'>
                                            <MdStarRate className='w-4 h-4 text-yellow-400' />
                                            <span className='ml-1 text-sm text-gray-600'>
                                                {store.rating}
                                            </span>
                                            <span className='ml-1 text-sm text-gray-400'>
                                                ({store.reviews} reviews)
                                            </span>
                                        </div>
                                        <p className='text-xs text-gray-500'>{store.category}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className='bg-white'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='border-t border-gray-200 my-8'></div>
                </div>
            </div>

            <PromoCollage />

            {/* Divider */}
            <div className='bg-white'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='border-t border-gray-200 my-8'></div>
                </div>
            </div>

            {/* Featured Deals */}
            <section className='py-8'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl font-bold text-gray-900'>Featured Products</h2>
                        <Link
                            to='/products'
                            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700'
                        >
                            View All Products
                            <svg
                                className='ml-2 -mr-1 h-4 w-4'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </Link>
                    </div>
                    <FeaturedProducts />
                </div>
            </section>
        </div>
    );
}

export default HomePage;
