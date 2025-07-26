import React, { useState } from 'react';
import { 
    FiPackage,
    FiCalendar,
    FiSearch,
    FiFilter
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const StoreOrders = () => {
    const navigate = useNavigate();
    
    // Sample order data
    const [orders, setOrders] = useState([
        {
            id: '1001',
            customer: 'Juan de la Cruz',
            date: '2025-07-08',
            status: 'processing',
            items: 2,
            total: '₱1,299.98',
            products: [
                { name: 'Premium Headphones', quantity: 1, price: '₱999.99' },
                { name: 'Earphone Case', quantity: 1, price: '₱299.99' }
            ]
        },
        {
            id: '1002',
            customer: 'Maria de la Cruz',
            date: '2025-07-07',
            status: 'shipped',
            items: 1,
            total: '₱199.99',
            products: [
                { name: 'Smart Watch', quantity: 1, price: '₱199.99' }
            ]
        },
        {
            id: '1003',
            customer: 'Catriona Gray',
            date: '2025-07-06',
            status: 'delivered',
            items: 3,
            total: '₱389.97',
            products: [
                { name: 'Wireless Earbuds', quantity: 3, price: '₱129.99' }
            ]
        }
    ]);

    const statusBadge = (status) => {
        const statusMap = {
            'processing': { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Processing' },
            'shipped': { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Shipped' },
            'delivered': { bg: 'bg-green-50', text: 'text-green-700', label: 'Delivered' },
            'cancelled': { bg: 'bg-red-50', text: 'text-red-700', label: 'Cancelled' }
        };
        
        const statusInfo = statusMap[status] || { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Unknown' };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                {statusInfo.label}
            </span>
        );
    };

    const handleOrderClick = (order) => {
        navigate(`/store/orders/${order.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
            <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
                {/* Orders Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-4 sm:p-6 text-white mb-6 sm:mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
                            <p className="text-cyan-100 mt-1">Manage and track customer orders</p>
                        </div>
                    </div>
                </div>

                {/* Orders Search and Filter */}
                <div className="flex gap-3 w-full mb-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-gray-900"
                            placeholder="Search orders"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <li 
                                key={order.id} 
                                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                onClick={() => handleOrderClick(order)}
                            >
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium text-blue-600">
                                                Order #ORD-{order.id}
                                            </span>
                                            <span className="ml-2 text-sm text-gray-500">
                                                • {order.customer}
                                            </span>
                                        </div>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            {statusBadge(order.status)}
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                {new Date(order.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                <FiPackage className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                {order.items} {order.items === 1 ? 'item' : 'items'}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-900 font-medium sm:mt-0">
                                            {order.total}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-sm text-gray-500">
                                            {order.products.map((product, idx) => (
                                                <div key={idx} className="flex justify-between mt-1">
                                                    <span>{product.quantity} × {product.name}</span>
                                                    <span>{product.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default StoreOrders;
