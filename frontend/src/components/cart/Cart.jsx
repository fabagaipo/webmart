import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'context';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [total, setTotal] = useState(0);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTotal = () => {
      return cart.reduce((total, item) => total + (parseFloat(item.price.replace('₱', '')) * item.quantity), 0);
    };
    setTotal(getTotal());
  }, [cart]);

  const applyVoucher = async () => {
    if (!voucherCode.trim()) {
      setVoucherError('Please enter a voucher code');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement voucher validation API call
      const validVouchers = ['SUMMER20', 'WELCOME10'];
      if (validVouchers.includes(voucherCode.toUpperCase())) {
        setVoucherDiscount(0.2); // 20% discount
        setVoucherError('');
      } else {
        setVoucherError('Invalid voucher code');
      }
    } catch {
      setVoucherError('Failed to validate voucher');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some items to your cart to get started!</p>
        <Link to="/products" className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Your Shopping Cart</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-1">{item.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <span className="sr-only">Decrease quantity</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  >
                    <span className="sr-only">Increase quantity</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                    title="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h3>
          
          {/* Voucher Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Enter voucher code"
                className="flex-1 px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                onClick={applyVoucher}
                disabled={loading}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Apply'
                )}
              </button>
            </div>
            {voucherError && (
              <p className="mt-2 text-sm text-red-600">{voucherError}</p>
            )}
            {voucherDiscount > 0 && (
              <p className="mt-2 text-sm text-green-600">{Math.round(voucherDiscount * 100)}% discount applied</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Subtotal</span>
              <span className="text-lg font-medium">₱{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-600">Free</span>
            </div>
            {voucherDiscount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">-₱{(total * voucherDiscount).toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-700">₱{(total * (1 - voucherDiscount)).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              to="/checkout" 
              className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;