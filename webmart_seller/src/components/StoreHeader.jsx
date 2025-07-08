import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag, FiExternalLink } from 'react-icons/fi';

// Custom Store Header Component
const StoreHeader = ({ onToggleMenu, isMenuOpen }) => {
  return (
    <header className="bg-blue-600 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleMenu}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
            <Link to="/store/dashboard" className="ml-4 flex items-center">
              <FiShoppingBag className="h-6 w-6 text-white" />
              <span className="ml-2 text-xl font-bold text-white">Store Manager</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/store/dashboard"
                className="px-3 py-2 text-sm font-medium text-white rounded-md"
              >
                Dashboard
              </Link>
              <Link
                to="/store/orders"
                className="px-3 py-2 text-sm font-medium text-white rounded-md"
              >
                Orders
              </Link>
              <Link
                to="/store/products"
                className="px-3 py-2 text-sm font-medium text-white rounded-md"
              >
                Products
              </Link>
              <Link
                to="/store/analytics"
                className="px-3 py-2 text-sm font-medium text-white rounded-md"
              >
                Analytics
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <Link
              to="http://localhost:4000/store/1"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center px-3 py-2 text-sm font-medium text-white rounded-md"
            >
              <span>View Store</span>
              <FiExternalLink className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
