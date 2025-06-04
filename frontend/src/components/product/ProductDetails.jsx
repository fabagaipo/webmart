import { useParams } from 'react-router-dom';
import { useCart } from 'context';
import { useState, useEffect } from 'react';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart, updateQuantity, cart } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock values
  const [product] = useState({
    id: parseInt(id),
    name: 'Product Name',
    price: '₱99.99',
    images: [
      'https://placehold.co/600x400/FE6233/FFF',
      'https://placehold.co/600x400/3362FE/FFF',
      'https://placehold.co/600x400/62FE33/FFF'
    ],
    rating: 4.5,
    category: 'Category',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: 'Great product! Highly recommended.',
        user: 'Juan Dela Cruz'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Good quality, fast delivery.',
        user: 'Maria Clara'
      }
    ]
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const getCartQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 relative">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.name} 
              className="w-full h-auto rounded-xl"
            />
            
            {/* Image navigation dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
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
              className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity hover:bg-gray-300"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity hover:bg-gray-300"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
            <div className="flex items-center justify-start mb-1">
              <div className="text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-6">{product.price}</div>
            <div className="mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mb-6">
              {getCartQuantity(product.id) > 0 ? (
                <>
                  <button 
                    onClick={() => handleQuantityChange(getCartQuantity(product.id) - 1)}
                    className="w-20 h-8 bg-gray-100 text-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold text-gray-900">{getCartQuantity(product.id)}</span>
                  <button 
                    onClick={() => handleQuantityChange(getCartQuantity(product.id) + 1)}
                    className="w-20 h-8 bg-gray-100 text-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map(review => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{review.user}</h3>
                  <div className="ml-2 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
