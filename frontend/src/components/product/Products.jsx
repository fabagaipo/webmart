import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdStarRate, MdStarOutline, MdStarHalf } from 'react-icons/md';

function Products() {

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [products] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      items_sold: 10,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 149.99,
      items_sold: 20,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Product 3',
      price: 1299.99,
      items_sold: 30,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 4,
      name: 'Product 4',
      price: 1299.99,
      items_sold: 40,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 5,
      name: 'Product 5',
      price: 1299.99,
      items_sold: 50,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 6,
      name: 'Product 6',
      price: 1299.99,
      items_sold: 60,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 7,
      name: 'Product 7',
      price: 1299.99,
      items_sold: 70,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 8,
      name: 'Product 8',
      price: 1299.99,
      items_sold: 80,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 9,
      name: 'Product 9',
      price: 1299.99,
      items_sold: 90,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 10,
      name: 'Product 10',
      price: 1299.99,
      items_sold: 100,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 11,
      name: 'Product 11',
      price: 1299.99,
      items_sold: 110,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.9,
    },
    {
      id: 12,
      name: 'Product 12',
      price: 1299.99,
      items_sold: 120,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 13,
      name: 'Product 13',
      price: 1299.99,
      items_sold: 130,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
    {
      id: 14,
      name: 'Product 14',
      price: 1299.99,
      items_sold: 140,
      image: 'https://placehold.co/600x400/002E99/FFF',
      rating: 4.8,
    },
  ]);

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-8">
      <div className="max-w-9xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">All Products</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map(product => (
            <div 
              key={product.id} 
              className="bg-white border border-gray-300 overflow-hidden shadow-sm transition-transform hover:-translate-y-2 block"
            >
              <Link 
                to={`/product/${product.id}`}
                className="block"
              >
                <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center justify-center mb-1">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => {
                        if (star <= Math.floor(product.rating)) {
                          return <MdStarRate key={star} className="w-4 h-4" />;
                        }
                        if (star === Math.ceil(product.rating) && product.rating % 1 > 0) {
                          return <MdStarHalf key={star} className="w-4 h-4" />;
                        }
                        return <MdStarOutline key={star} className="w-4 h-4" />;
                      })}
                    </div>
                    <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-base font-bold text-[#001E60]">₱{product.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{product.items_sold || 0} sold</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
