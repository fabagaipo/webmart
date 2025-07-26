import React, { useState, useEffect } from 'react';
import { FiPackage, FiPlus, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    price: 129.99,
    stock_quantity: 5,
    max_stock: 50,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200'
  },
  {
    id: 2,
    name: 'Smartphone Stand',
    price: 24.99,
    stock_quantity: 0,
    max_stock: 100,
    image: 'https://images.unsplash.com/photo-1591374579647-5a210abf4471?w=200'
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 79.99,
    stock_quantity: 8,
    max_stock: 30,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200'
  },
  {
    id: 4,
    name: 'Wireless Charging Pad',
    price: 34.99,
    stock_quantity: 20,
    max_stock: 50,
    image: 'https://images.unsplash.com/photo-1587033411399-6482cefaadc4?w=200'
  },
  {
    id: 5,
    name: 'Laptop Backpack',
    price: 59.99,
    stock_quantity: 3,
    max_stock: 25,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200'
  }
];

const StoreProducts = ({ products: propProducts }) => {
  const [products, setProducts] = useState(propProducts || mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Update products if prop changes
  useEffect(() => {
    if (propProducts) {
      setProducts(propProducts);
    }
  }, [propProducts]);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products by stock level (lowest first)
  const sortedProducts = [...filteredProducts].sort((a, b) => 
    (a.stock_quantity / a.max_stock) - (b.stock_quantity / b.max_stock)
  );

  // Get stock status class based on stock level
  const getStockStatus = (product) => {
    const stockPercentage = (product.stock_quantity / product.max_stock) * 100;
    if (stockPercentage < 10) return 'bg-red-100 text-red-800';
    if (stockPercentage < 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Products Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-4 sm:p-6 text-white mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Product Inventory</h1>
              <p className="text-cyan-100 mt-1">Manage your product listings and inventory</p>
            </div>
            <button
              onClick={() => navigate('/store/products/add')}
              className="flex items-center gap-2 px-5 py-2.5 !bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg font-medium text-sm border border-white/20"
            >
              <FiPlus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 w-full mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-gray-900"
              placeholder="Search products"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Products List */}
        {sortedProducts.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {sortedProducts.map((product) => (
                <li 
                  key={product.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/store/products/${product.id}`)}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          {product.image ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <FiPackage className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">₱{product.price}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStockStatus(product)}`}>
                            {product.stock_quantity > 0 ? `In Stock (${product.stock_quantity})` : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/store/products/add')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Product
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreProducts;