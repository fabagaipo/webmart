import React, { useState } from 'react';
import { LuCopy, LuCheck, LuTicketCheck, LuTicketX } from 'react-icons/lu';
import { toast } from 'react-hot-toast';

const Vouchers = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  // TODO: Replace with actual voucher data from API
  const vouchers = [
    {
      id: 1,
      code: 'SUMMER20',
      description: '20% off on all products',
      expiryDate: '2025-12-31',
      status: 'active',
      discount: 20,
    },
    {
      id: 2,
      code: 'WELCOME10',
      description: '10% off on first purchase',
      expiryDate: '2025-06-30',
      status: 'expired',
      discount: 10,
    },
    {
      id: 3,
      code: 'BIRTHDAY50',
      description: '50% off on birthday week',
      expiryDate: '2025-07-05',
      status: 'active',
      discount: 50,
    },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Voucher code copied!', {
      position: 'bottom-center'
    });
    setTimeout(() => setCopiedCode(null), 1000);
  };

  // Separate vouchers by status
  const activeVouchers = vouchers.filter(v => v.status === 'active');
  const expiredVouchers = vouchers.filter(v => v.status === 'expired');

  return (
    <div className="bg-white rounded-lg shadow-sm p-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-gray-900">Vouchers</h1>
      </div>

      {activeVouchers.length > 0 && (
        <div className="space-y-3 mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Active Vouchers</h2>
          {activeVouchers.map((voucher) => (
            <div
              key={voucher.id}
              className={`p-3 rounded border border-green-200 bg-green-50`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <LuTicketCheck className="w-4 h-4 text-green-500" />
                    <h3 className="text-sm font-medium text-gray-900">{voucher.code}</h3>
                  </div>
                  <p className="text-xs text-gray-600">{voucher.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(voucher.code);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors flex items-center space-x-1 no-bg no-focus no-hover"
                    title="Copy code"
                  >
                    {copiedCode === voucher.code ? (
                      <LuCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <LuCopy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Expires: {new Date(voucher.expiryDate).toLocaleDateString()}
                </p>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {expiredVouchers.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Expired Vouchers</h2>
          {expiredVouchers.map((voucher) => (
            <div
              key={voucher.id}
              className={`p-3 rounded border border-red-200 bg-red-50`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <LuTicketX className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-900">{voucher.code}</h3>
                  </div>
                  <p className="text-xs text-gray-600">{voucher.description}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Expired: {new Date(voucher.expiryDate).toLocaleDateString()}
                </p>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Expired
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!activeVouchers.length && !expiredVouchers.length && (
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm">No vouchers available</p>
        </div>
      )}
    </div>
  );
};

export default Vouchers;
