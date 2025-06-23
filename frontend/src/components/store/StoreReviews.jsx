import React, { useState } from 'react';

const StoreReviews = ({ reviews }) => {
    const [selectedRating, setSelectedRating] = useState('all');

    const filteredReviews = reviews.filter((review) => {
        if (selectedRating === 'all') return true;
        return review.rating === parseInt(selectedRating);
    });

    return (
        <div className='space-y-8'>
            <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>Customer Reviews</h3>
                <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className='rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                >
                    <option value='all'>All Reviews</option>
                    <option value='5'>⭐⭐⭐⭐⭐ (5 stars)</option>
                    <option value='4'>⭐⭐⭐⭐ (4 stars)</option>
                    <option value='3'>⭐⭐⭐ (3 stars)</option>
                    <option value='2'>⭐⭐ (2 stars)</option>
                    <option value='1'>⭐ (1 star)</option>
                </select>
            </div>

            <div className='space-y-6'>
                {filteredReviews.map((review) => (
                    <div key={review.id} className='border-b border-gray-200 pb-6'>
                        <div className='flex items-start space-x-4'>
                            <div className='flex items-center'>
                                <svg
                                    className='w-4 h-4 text-yellow-400'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                                <span className='text-sm text-gray-600'>{review.rating}</span>
                            </div>
                            <div className='flex-1'>
                                <h4 className='text-sm font-medium text-gray-900'>{review.user}</h4>
                                <p className='text-sm text-gray-500'>
                                    {new Date(review.date).toLocaleDateString()}
                                </p>
                                <p className='mt-2 text-gray-600'>{review.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreReviews;
