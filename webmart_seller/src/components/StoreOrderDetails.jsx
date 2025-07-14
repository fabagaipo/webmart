import React, { useState, useEffect } from 'react';
import { 
    FiArrowLeft,
    FiPackage,
    FiCalendar,
    FiTruck,
    FiCreditCard,
    FiMapPin,
    FiMail,
    FiPhone
} from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

const StoreOrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const sampleOrders = [
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
                ],
                shippingAddress: '123 Main St, Metro Manila, Philippines',
                email: 'juan.delacruz@example.com',
                phone: '+63 912 345 6789',
                paymentMethod: 'Credit Card',
                trackingNumber: 'TRK123456789',
                estimatedDelivery: '2025-07-15'
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
                ],
                shippingAddress: '456 Oak St, Cebu City, Philippines',
                email: 'maria.delacruz@example.com',
                phone: '+63 923 456 7890',
                paymentMethod: 'GCash',
                trackingNumber: 'TRK987654321',
                estimatedDelivery: '2025-07-12'
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
                ],
                shippingAddress: '789 Pine St, Davao City, Philippines',
                email: 'cat.gray@example.com',
                phone: '+63 934 567 8901',
                paymentMethod: 'Credit Card',
                trackingNumber: 'TRK456789123',
                estimatedDelivery: '2025-07-10',
                deliveredDate: '2025-07-09'
            }
        ];

        const fetchOrder = () => {
            const foundOrder = sampleOrders.find(order => order.id === orderId);
            setOrder(foundOrder);
        };

        fetchOrder();
    }, [orderId]);

    const statusBadge = (status) => {
        const statusMap = {
            'processing': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Processing' },
            'shipped': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Shipped' },
            'delivered': { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
            'cancelled': { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
        };
        
        const statusInfo = statusMap[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };
        
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                {statusInfo.label}
            </span>
        );
    };

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Order not found</h2>
                    <p className="mt-2 text-gray-600">The order you're looking for doesn't exist or has been removed.</p>
                    <Link 
                        to="/store/orders"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Orders
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
            <main className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
                <Link 
                    to="/store/orders"
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <FiArrowLeft className="mr-2" />
                    Back to Orders
                </Link>

                <div className="bg-white shadow rounded-xl overflow-hidden">
                    {/* Order Header */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Order #{order.id}</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div className="mt-3 sm:mt-0">
                                {statusBadge(order.status)}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                        <div className="space-y-4">
                            {order.products.map((product, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <div className="flex">
                                        <div className="h-16 w-16 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                                            {/* Product image */}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total</p>
                                <p>{order.total}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Shipping Address</h4>
                                <div className="mt-1 text-sm text-gray-900">
                                    <p>{order.customer}</p>
                                    <p>{order.shippingAddress}</p>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <FiMail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                                        {order.email}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <FiPhone className="flex-shrink-0 mr-1.5 h-4 w-4" />
                                        {order.phone}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Shipping Method</h4>
                                <div className="mt-1 text-sm text-gray-900">
                                    <p>Standard Shipping</p>
                                    {order.trackingNumber && (
                                        <div className="mt-2 flex items-center">
                                            <FiTruck className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-500">
                                                Tracking: {order.trackingNumber}
                                            </span>
                                        </div>
                                    )}
                                    {order.estimatedDelivery && (
                                        <div className="mt-1 flex items-center">
                                            <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-500">
                                                Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    {order.deliveredDate && (
                                        <div className="mt-1 flex items-center">
                                            <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-green-500" />
                                            <span className="text-sm text-green-600 font-medium">
                                                Delivered on {new Date(order.deliveredDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="px-6 py-5">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
                        <div className="flex items-center">
                            <FiCreditCard className="flex-shrink-0 h-5 w-5 text-gray-400" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{order.paymentMethod}</p>
                                <p className="text-sm text-gray-500">Paid on {new Date(order.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StoreOrderDetails;
