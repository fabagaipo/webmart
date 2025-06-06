import React from 'react';
import { Link } from 'react-router-dom';

const SaleItems = () => {
  const saleItems = [
    {
      id: 1,
      name: "Sale Product 1",
      originalPrice: 129.99,
      salePrice: 64.99,
      discount: 50,
      image: "https://placehold.co/300x300/0053E2/FFF",
    },
    {
      id: 2,
      name: "Sale Product 2",
      originalPrice: 99.99,
      salePrice: 49.99,
      discount: 50,
      image: "https://placehold.co/300x300/0053E2/FFF",
    },
    {
      id: 3,
      name: "Sale Product 3",
      originalPrice: 49.99,
      salePrice: 24.99,
      discount: 50,
      image: "https://placehold.co/300x300/0053E2/FFF",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Summer Sale - Up to 50% Off</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {saleItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                {item.discount}% OFF
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-red-500 text-xl font-bold">₱{item.salePrice}</span>
                  <span className="text-gray-400 line-through ml-2">₱{item.originalPrice}</span>
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                  Add to Cart
                </button>
              </div>
              
              <Link 
                to={`/product/${item.id}`}
                className="block text-blue-500 hover:text-blue-600 text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleItems;