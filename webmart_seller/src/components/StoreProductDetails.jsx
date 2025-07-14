import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FiEdit, FiPackage, FiTag, FiInfo, FiCalendar, FiBox } from 'react-icons/fi';

const StoreProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = {
    id: parseInt(productId),
    name: 'Premium Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions.',
    price: 99.99,
    stock_quantity: 10,
    max_stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Audio & Electronics',
    created_at: '2023-01-01',
    updated_at: '2023-01-15'
  };

  const stockPercentage = (product.stock_quantity / product.max_stock) * 100;
  const isLowStock = stockPercentage < 30;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/store/products"
          className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-8"
        >
          <MdArrowBackIosNew className="mr-1 h-4 w-4" />
          Back to Products
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Product Details</h1>
            <button
              onClick={() => navigate(`/store/products/edit/${product.id}`)}
              className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <FiEdit className="mr-2 h-4 w-4" /> Edit Product
            </button>
          </div>
          
          <div className="p-6">
            <div className="md:flex space-x-8">
              {/* Product Image */}
              <div className="md:w-2/5 mb-8 md:mb-0">
                <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="md:w-3/5">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">{product.name}</h2>
                    <p className="text-blue-600 text-lg font-semibold mb-6">₱{product.price.toFixed(2)}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    product.stock_quantity > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock_quantity > 0 
                      ? `${product.stock_quantity} in Stock` 
                      : 'Out of Stock'}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <DetailCard 
                    icon={<FiTag className="text-blue-500" />} 
                    title="Category" 
                    value={product.category} 
                  />
                </div>

                {/* Stock Level */}
                <div className="bg-gray-50 p-4 rounded-xl mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center">
                      <FiBox className="mr-2 text-blue-500" /> Stock Level
                    </h4>
                    <span className={`text-sm font-medium ${
                      isLowStock ? 'text-amber-600' : 'text-gray-700'
                    }`}>
                      {product.stock_quantity} / {product.max_stock}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        isLowStock ? 'bg-amber-400' : 'bg-green-500'
                      }`} 
                      style={{ width: `${Math.min(100, stockPercentage)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
                    <FiInfo className="mr-2 text-blue-500" /> Additional Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailCard 
                      icon={<FiCalendar className="text-blue-500" />} 
                      title="Created" 
                      value={new Date(product.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} 
                    />
                    <DetailCard 
                      icon={<FiCalendar className="text-blue-500" />} 
                      title="Last Updated" 
                      value={new Date(product.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail Card Component
const DetailCard = ({ icon, title, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors duration-200">
    <div className="flex items-center mb-1">
      {icon}
      <span className="ml-2 text-sm font-medium text-gray-500">{title}</span>
    </div>
    <p className="text-gray-900 font-medium">{value}</p>
  </div>
);

export default StoreProductDetails;