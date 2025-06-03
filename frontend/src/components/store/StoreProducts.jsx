import React from 'react';
import { Link } from 'react-router-dom';

const StoreProducts = ({ products }) => {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Store Products</h3>
      <div className="flex flex-wrap gap-12 justify-center">
        {products.map(product => (
          <div key={product.id} className="block">
            <Link to={`/products/${product.id}`} className="block">
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-primary-600">₱{product.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreProducts;