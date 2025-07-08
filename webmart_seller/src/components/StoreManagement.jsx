import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    FiEdit2,
    FiPlus,
    FiPackage,
    FiCheckCircle,
    FiClock,
    FiShoppingBag,
    FiTrendingUp,
} from 'react-icons/fi';

const StoreManagement = () => {
    const navigate = useNavigate();
    const [storeData, setStoreData] = useState({
        name: 'My Awesome Store',
        description: 'Your one-stop shop for amazing products',
        category: 'Electronics',
        products: [
            { id: 1, name: 'Premium Headphones', description: 'Wireless noise-canceling headphones with premium sound quality', price: '299.99', status: 'active' },
            { id: 2, name: 'Smart Watch', description: 'Feature-rich smartwatch with health tracking', price: '199.99', status: 'pending' },
            { id: 3, name: 'Wireless Earbuds', description: 'True wireless earbuds with long battery life', price: '129.99', status: 'active' },
        ]
    });

    const handleAddProduct = () => navigate('/store/dashboard/add-product');
    const handleEditStore = () => navigate('/store/dashboard/edit');

    const stats = [
        { label: 'Total Products', value: storeData.products?.length || 0, icon: <FiPackage className="w-5 h-5" />, color: 'bg-indigo-50 text-indigo-600' },
        { label: 'Active', value: storeData.products?.filter(p => p.status === 'active').length || 0, icon: <FiCheckCircle className="w-5 h-5" />, color: 'bg-green-50 text-green-600' },
        { label: 'Pending', value: storeData.products?.filter(p => p.status === 'pending').length || 0, icon: <FiClock className="w-5 h-5" />, color: 'bg-yellow-50 text-yellow-600' },
        { label: 'Total Sales', value: '₱5,299.95', icon: <FiTrendingUp className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
            <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
                {/* Store Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-4 sm:p-6 text-white mb-6 sm:mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Store Dashboard</h1>
                            <p className="text-cyan-100 mt-1">Manage your store and track performance</p>
                        </div>
                        <button
                            onClick={handleEditStore}
                            className="flex items-center gap-2 px-5 py-2.5 !bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg font-medium text-sm border border-white/20"
                        >
                            <FiEdit2 size={16} />
                        </button>
                    </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                        {stats.map((stat, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Store Info & Products */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {/* Store Info Card */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                        <FiShoppingBag className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Store Information</h2>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Store Name</p>
                                        <p className="text-gray-900 font-medium mt-1">{storeData.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Category</p>
                                        <span className="inline-block mt-1 px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-full">
                                            {storeData.category}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Description</p>
                                        <p className="text-gray-600 mt-1">{storeData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Your Products</h2>
                                        <p className="text-sm text-gray-500 mt-1">Manage your product listings and inventory</p>
                                    </div>
                                    <button
                                        onClick={handleAddProduct}
                                        className="flex items-center gap-2 px-5 py-2.5 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
                                    >
                                        <FiPlus size={16} />
                                        Add Product
                                    </button>
                                </div>

                                {storeData.products?.length > 0 ? (
                                    <div className="space-y-4">
                                        {storeData.products.map((product) => (
                                            <div 
                                                key={product.id}
                                                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
                                                onClick={() => navigate(`/store/dashboard/edit-product/${product.id}`)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                        <FiPackage className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 group-hover:text-indigo-600">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 line-clamp-1">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-lg font-bold text-gray-900">
                                                        ₱{product.price}
                                                    </span>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                            product.status === 'active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                    >
                                                        {product.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-500">
                                            <FiPackage className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
                                        <p className="text-gray-500 mt-1 mb-6">Add your first product to get started</p>
                                        <button
                                            onClick={handleAddProduct}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-lg transition-colors font-medium text-sm shadow-sm hover:shadow-md"
                                        >
                                            <FiPlus size={16} />
                                            Add Your First Product
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StoreManagement;
