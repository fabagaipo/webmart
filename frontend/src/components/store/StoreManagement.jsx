import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StoreManagement = ({ user }) => {
  const navigate = useNavigate();
  // Store data
  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    category: '',
    products: []
  });

  useEffect(() => {
    const fetchStoreData = async () => {
      console.log("Fetching store data...")
    };

    fetchStoreData();
  }, [user.id]);

  const handleAddProduct = () => {
    navigate('/profile/store-owner-application/add-product');
  };

  const handleEditStore = () => {
    navigate('/profile/store-owner-application/edit-store');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
        <button
          onClick={handleEditStore}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm shadow-sm hover:shadow-lg"
        >
          Edit Store Details
        </button>
      </div>

      {/* Store Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Store Overview</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Store Name</label>
              <p className="mt-1 text-gray-900 font-medium">{storeData.name || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Category</label>
              <p className="mt-1 text-gray-900 font-medium">{storeData.category || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Description</label>
              <p className="mt-1 text-gray-900 font-medium">{storeData.description || 'Not set'}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Store Statistics</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Total Products</label>
              <p className="mt-1 text-gray-900 font-medium">{storeData.products?.length || 0}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Active Products</label>
              <p className="mt-1 text-gray-900 font-medium">{storeData.products?.filter(p => p.status === 'active').length || 0}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Pending Products</label>
              <p className="mt-1 text-gray-900 font-medium">{storeData.products?.filter(p => p.status === 'pending').length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Products</h2>
          <button
            onClick={handleAddProduct}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm shadow-sm hover:shadow-lg"
          >
            Add Product
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeData.products?.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' :
                  product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 font-semibold">₱{product.price}</p>
                <button
                  onClick={() => navigate(`/profile/store-owner-application/edit-product/${product.id}`)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Settings */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Store Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="isFeatured"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
              Featured Store
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="isDeliveryAvailable"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <label htmlFor="isDeliveryAvailable" className="text-sm font-medium text-gray-700">
              Delivery Available
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="isPickupAvailable"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <label htmlFor="isPickupAvailable" className="text-sm font-medium text-gray-700">
              Pickup Available
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManagement;
