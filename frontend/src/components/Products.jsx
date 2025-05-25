import { useState } from 'react';

function Products() {
  const [products] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: '₱99.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.5,
      category: 'Category 1'
    },
    {
      id: 2,
      name: 'Product 2',
      price: '₱149.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.7,
      category: 'Category 2'
    },
    {
      id: 3,
      name: 'Product 3',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 3'
    },
    {
      id: 4,
      name: 'Product 4',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 4'
    },
    {
      id: 5,
      name: 'Product 5',
      price: '₱1299.99',
      image: 'https://placehold.co/600x400/FE6233/FFF',
      rating: 4.8,
      category: 'Category 5'
    },
  ]);

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">All Products</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm transition-transform hover:-translate-y-2">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <div className="flex items-center justify-center mb-1">
                  <div className="text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
                </div>
                <div className="text-base font-bold text-gray-900 mb-2 text-center">{product.price}</div>
                <button className="w-full bg-primary-600 text-white py-1.5 rounded-lg hover:bg-primary-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
