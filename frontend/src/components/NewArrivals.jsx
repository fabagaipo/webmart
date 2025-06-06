import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivals = () => {

  const newArrivals = [
    {
      id: 1,
      name: "New Arrival 1",
      price: 199.99,
      image: "https://placehold.co/300x300/002E99/FFF",
      category: "Dresses"
    },
    {
      id: 2,
      name: "New Arrival 2",
      price: 299.99,
      image: "https://placehold.co/300x300/0053E2/FFF",
      category: "Shoes"
    },
    {
      id: 3,
      name: "New Arrival 3",
      price: 399.99,
      image: "https://placehold.co/300x300/002E99/FFF",
      category: "Accessories"
    },
    {
      id: 4,
      name: "New Arrival 4",
      price: 499.99,
      image: "https://placehold.co/300x300/0053E2/FFF",
      category: "Accessories"
    },
    {
      id: 5,
      name: "New Arrival 5",
      price: 599.99,
      image: "https://placehold.co/300x300/002E99/FFF",
      category: "Accessories"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-16 justify-center">
        {newArrivals.map(product => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`} 
            className="block"
          >
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  NEW
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">₱{product.price}</p>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">₱{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
