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
    }
  ]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm transition-transform hover:-translate-y-2">
              <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                <div className="flex items-center justify-center mb-4">
                  <div className="text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{product.rating}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-4 text-center">{product.price}</div>
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors">
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
