import React, { useState } from 'react';

const Purchases = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="flex-1 p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Purchases</h1>
        </div>

        {/* Filter Section */}
        <div className="flex items-center justify-end mb-8 space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search purchase"
              className="px-3 py-1.5 rounded-lg border text-black border-gray-300 w-48 pr-8"
            />
            <svg className="absolute right-2.5 top-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            className="px-4 py-2 rounded-lg border text-gray-500 border-gray-300"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="space-y-6">
          {/* Purchases Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3].map((purchase) => (
                  <tr key={purchase}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#ORD{purchase}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Product {purchase}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-05-20</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₱1,299.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Delivered</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button className="text-blue-600 hover:text-blue-900 no-bg no-hover no-focus">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
