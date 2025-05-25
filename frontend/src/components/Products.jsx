import { useState } from 'react';
import { useCart } from '../context/useCart';
import { Link } from 'react-router-dom';

function Products() {
  const [products] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: '₱99.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.5,
      category: 'Category 1'
    },
    {
      id: 2,
      name: 'Product 2',
      price: '₱149.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.7,
      category: 'Category 2'
    },
    {
      id: 3,
      name: 'Product 3',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 3'
    },
    {
      id: 4,
      name: 'Product 4',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 4'
    },
    {
      id: 5,
      name: 'Product 5',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 5'
    },
    {
      id: 6,
      name: 'Product 6',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 6'
    },
    {
      id: 7,
      name: 'Product 7',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 7'
    },
    {
      id: 8,
      name: 'Product 8',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 8'
    },
    {
      id: 9,
      name: 'Product 9',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 9'
    },
    {
      id: 10,
      name: 'Product 10',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 10'
    },
    {
      id: 11,
      name: 'Product 11',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 11'
    },
    {
      id: 12,
      name: 'Product 12',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 12'
    },
  ]);

  const { addToCart, updateQuantity, cart } = useCart();

  const getCartQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleQuantityChange = (product, newQuantity) => {
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">All Products</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map(product => (
            <div 
              key={product.id} 
              className="bg-white overflow-hidden shadow-sm transition-transform hover:-translate-y-2 block"
            >
              <Link 
                to={`/product/${product.id}`}
                className="block"
              >
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                  <div className="flex items-center justify-center mb-1">
                    <div className="text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
                  </div>
                  <div className="text-base font-bold text-gray-900 mb-4 text-center">{product.price}</div>
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  {getCartQuantity(product.id) > 0 ? (
                    <>
                      <button 
                        onClick={() => handleQuantityChange(product, getCartQuantity(product.id) - 1)}
                        className="w-8 h-8 bg-gray-100 text-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-gray-900">{getCartQuantity(product.id)}</span>
                      <button 
                        onClick={() => handleQuantityChange(product, getCartQuantity(product.id) + 1)}
                        className="w-8 h-8 bg-gray-100 text-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary-600 text-white py-1.5 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
