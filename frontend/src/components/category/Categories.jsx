import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLaptop, FaTshirt, FaHome, FaBook } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Color palette for categories
const categoryColors = [
    'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
];

// Icons for categories
const categoryIcons = [
    <FaLaptop className='text-xl' />,
    <FaTshirt className='text-xl' />,
    <FaHome className='text-xl' />,
    <FaBook className='text-xl' />,
];

function Categories() {
    const [categories] = useState([
        {
            id: 1,
            name: 'Electronics',
            icon: categoryIcons[0],
            color: categoryColors[0],
            products: [
                { id: 1, name: 'Smartphone' },
                { id: 2, name: 'Laptop' },
                { id: 3, name: 'Tablet' },
                { id: 4, name: 'Headphones' },
                { id: 5, name: 'Smartwatch' },
            ],
        },
        {
            id: 2,
            name: 'Fashion',
            icon: categoryIcons[1],
            color: categoryColors[1],
            products: [
                { id: 1, name: 'T-Shirt' },
                { id: 2, name: 'Jeans' },
                { id: 3, name: 'Dress' },
                { id: 4, name: 'Sneakers' },
            ],
        },
        {
            id: 3,
            name: 'Home and Living',
            icon: categoryIcons[2],
            color: categoryColors[2],
            products: [
                { id: 1, name: 'Sofa' },
                { id: 2, name: 'Dining Set' },
                { id: 3, name: 'Bed Frame' },
            ],
        },
        {
            id: 4,
            name: 'Books',
            icon: categoryIcons[3],
            color: categoryColors[3],
            products: [
                { id: 1, name: 'Fiction Novel' },
                { id: 2, name: 'Self-Help' },
                { id: 3, name: 'Cookbook' },
                { id: 4, name: 'Textbook' },
            ],
        },
    ]);

    return (
        <div className='px-4 sm:px-6 lg:px-8 py-12'>
            <div className='max-w-7xl mx-auto'>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='text-4xl font-extrabold mb-8 text-center'
                >
                    <span className='relative inline-block'>
                        <span className='bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text'>
                            Categories
                        </span>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                            className='absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full origin-left'
                        />
                    </span>
                </motion.h1>
                <div className='space-y-8'>
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`${category.color.split(' ')[0]} rounded-xl shadow-sm overflow-hidden border ${category.color.split(' ')[2]}`}
                        >
                            <div className='px-6 py-4 border-b border-inherit'>
                                <div className='flex items-center space-x-4'>
                                    <span className='text-2xl'>{category.icon}</span>
                                    <h2
                                        className={`text-xl font-semibold ${category.color.split(' ')[1]}`}
                                    >
                                        {category.name}
                                    </h2>
                                    <Link
                                        to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className={`ml-auto ${category.color.split(' ')[1].replace('700', '600')} hover:${category.color.split(' ')[1].replace('700', '800')} font-medium text-sm flex items-center`}
                                    >
                                        View all
                                        <svg
                                            className='w-4 h-4 ml-1'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M9 5l7 7-7 7'
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className='p-4 overflow-x-auto'>
                                <div className='flex space-x-4 pb-2'>
                                    {category.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className='flex-shrink-0 w-32 p-3 rounded-lg hover:shadow-md transition-shadow duration-200 flex flex-col items-center'
                                        >
                                            <div className='w-16 h-16 bg-gray-50 rounded-full mb-2 flex items-center justify-center text-gray-400 text-2xl'>
                                                {/* Replace with icon */}
                                            </div>
                                            <h3 className='text-sm font-medium text-gray-900 text-center'>
                                                {product.name}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;
