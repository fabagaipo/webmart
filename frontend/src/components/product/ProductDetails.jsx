import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from 'context';
import { useState, useEffect } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdStarRate, MdStarOutline, MdStarHalf } from 'react-icons/md';

function ProductDetails() {
    const { id } = useParams();
    const { addToCart, updateQuantity, cart } = useCart();
    const navigate = useNavigate();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Mock values
    const [product] = useState({
        id: parseInt(id),
        name: 'Product Name',
        price: '1999.99',
        images: [
            'https://placehold.co/600x400/3362FE/FFF',
            'https://placehold.co/600x400/FE6233/FFF',
            'https://placehold.co/600x400/62FE33/FFF',
        ],
        rating: 4.5,
        category: 'Category',
        stock: 10,
        shippingTo: 'Philippines',
        shippingFee: '₱50.00',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        reviews: [
            {
                id: 1,
                rating: 5,
                comment: 'Great product! Highly recommended.',
                user: 'Juan Dela Cruz',
            },
            {
                id: 2,
                rating: 4,
                comment: 'Good quality, fast delivery.',
                user: 'Maria Clara',
            },
        ],
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageChange = (index) => {
        setCurrentImageIndex(index);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length
        );
    };

    const getCartQuantity = (productId) => {
        const item = cart.find((item) => item.id === productId);
        return item ? item.quantity : 0;
    };

    const handleQuantityChange = (newQuantity) => {
        updateQuantity(product.id, newQuantity);
    };

    const handleBuyNow = (product) => {
        addToCart(product);
        navigate('/cart');
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<MdStarRate key={i} className='text-yellow-400 w-7 h-7' />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<MdStarHalf key={i} className='text-yellow-400 w-7 h-7' />);
            } else {
                stars.push(<MdStarOutline key={i} className='text-gray-300 w-7 h-7' />);
            }
        }

        return stars;
    };

    return (
        <div className='px-2 sm:px-4 lg:px-6 py-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col md:flex-row gap-8'>
                    <div className='md:w-1/2 relative'>
                        <img
                            src={product.images[currentImageIndex]}
                            alt={product.name}
                            className='w-full h-auto rounded-xl'
                        />

                        {/* Image navigation dots */}
                        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
                            {product.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleImageChange(index)}
                                    className={`w-3 h-3 rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-opacity ${
                                        currentImageIndex === index
                                            ? 'bg-primary-600'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Navigation arrows */}
                        <button
                            onClick={handlePrevImage}
                            className='absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity hover:bg-gray-300'
                        >
                            <svg
                                className='w-6 h-6 text-black'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M15 19l-7-7 7-7'
                                />
                            </svg>
                        </button>
                        <button
                            onClick={handleNextImage}
                            className='absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity hover:bg-gray-300'
                        >
                            <svg
                                className='w-6 h-6 text-black'
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
                        </button>
                    </div>
                    <div className='md:w-1/2'>
                        <h1 className='text-2xl font-bold text-gray-900 mb-4'>{product.name}</h1>
                        <p className='text-xs text-gray-500 mb-4'>{product.category}</p>
                        <div className='flex items-center justify-start mb-1'>
                            <div className='flex'>{renderStars(product.rating)}</div>
                            <span className='ml-2 text-sm text-gray-500'>{product.rating}</span>
                        </div>
                        <div className='text-3xl font-bold text-[#001E60] my-6'>
                            ₱{product.price}
                        </div>
                        <div className='mb-8 space-y-3'>
                            <p className='text-gray-600'>
                                <span className='font-medium'>Shipping to:</span>{' '}
                                {product.shippingTo || 'Philippines'}
                            </p>
                            <p className='text-gray-600'>
                                <span className='font-medium'>Shipping Fee:</span>{' '}
                                {product.shippingFee || '₱50.00'}
                            </p>
                        </div>
                        <div className='flex items-center justify-between mb-6'>
                            {getCartQuantity(product.id) > 0 ? (
                                <>
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(getCartQuantity(product.id) - 1)
                                        }
                                        className='w-20 h-full bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors'
                                    >
                                        <FaMinus className='text-sm' />
                                    </button>
                                    <span className='text-lg font-semibold text-gray-900'>
                                        {getCartQuantity(product.id)}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(getCartQuantity(product.id) + 1)
                                        }
                                        className='w-20 h-full bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors'
                                    >
                                        <FaPlus className='text-sm' />
                                    </button>
                                </>
                            ) : (
                                <div className='flex gap-4 w-full'>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className='flex-1 bg-white text-white py-3 px-8 rounded-full hover:bg-gray-50 transition-all duration-200 border-2 border-primary-600 font-medium hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap min-w-[160px]'
                                    >
                                        <BsCartPlus className='text-lg' />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(product)}
                                        className='flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-8 rounded-full hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium hover:shadow-lg hover:-translate-y-0.5 transform whitespace-nowrap min-w-[120px]'
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mt-12 space-y-8'>
                    {/* Product Specifications */}
                    <div className='bg-[#F0F5FF] p-6 rounded-xl shadow-sm'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4'>
                            Product Specifications
                        </h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <div className='flex justify-between border-b pb-2'>
                                    <span className='text-gray-600'>Brand</span>
                                    <span className='font-medium text-gray-900'>Nike</span>
                                </div>
                                <div className='flex justify-between border-b pb-2'>
                                    <span className='text-gray-600'>Category</span>
                                    <span className='font-medium text-gray-900'>
                                        {product.category}
                                    </span>
                                </div>
                                <div className='flex justify-between border-b pb-2'>
                                    <span className='text-gray-600'>Ships From</span>
                                    <span className='font-medium text-gray-900'>Philippines</span>
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div className='flex justify-between border-b pb-2'>
                                    <span className='text-gray-600'>Weight</span>
                                    <span className='font-medium text-gray-900'>0.5 kg</span>
                                </div>
                                <div className='flex justify-between border-b pb-2'>
                                    <span className='text-gray-600'>Dimensions</span>
                                    <span className='font-medium text-gray-900'>
                                        10 x 10 x 5 cm
                                    </span>
                                </div>
                                <div className='flex justify-between border-b pb-2'>
                                    <span className='text-gray-600'>Available Stock</span>
                                    <span className='font-medium text-green-500'>
                                        {product.stock}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Description */}
                    <div className='bg-[#F0F5FF] p-6 rounded-xl shadow-sm'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4'>
                            Detailed Description
                        </h2>
                        <div className='prose max-w-none text-gray-600'>
                            <p className='mb-4'>{product.description}</p>
                            <ul className='list-disc pl-5 space-y-2'>
                                <li>High-quality materials for long-lasting durability</li>
                                <li>Designed for optimal performance and comfort</li>
                                <li>Eco-friendly and sustainable production</li>
                                <li>Easy to clean and maintain</li>
                                <li>Comes with a 1-year manufacturer's warranty</li>
                            </ul>
                            <p className='mt-4'>
                                This product has been carefully crafted to meet the highest
                                standards of quality and design. Perfect for everyday use, it
                                combines functionality with modern aesthetics.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='mt-8'>
                    <h2 className='text-xl font-bold text-gray-900 mb-4'>Customer Reviews</h2>
                    <div className='space-y-4'>
                        {product.reviews.map((review) => (
                            <div key={review.id} className='p-4 bg-[#F0F5FF] rounded-lg'>
                                <div className='flex items-center mb-2'>
                                    <h3 className='font-semibold text-gray-900'>{review.user}</h3>
                                    <div className='flex ml-2'>{renderStars(review.rating)}</div>
                                </div>
                                <p className='text-gray-600'>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
