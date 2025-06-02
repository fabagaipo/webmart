import { useState } from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  const [categories] = useState([
    {
      id: 1,
      name: 'Category 1',
      icon: '📱',
      products: [
        { id: 1, name: 'Product 1', price: '₱29999.00' },
        { id: 2, name: 'Product 2', price: '₱49999.00' },
        { id: 3, name: 'Product 3', price: '₱19999.00' }
      ]
    },
    {
      id: 2,
      name: 'Category 2',
      icon: '👗',
      products: [
        { id: 1, name: 'Product 1', price: '₱1999.00' },
        { id: 2, name: 'Product 2', price: '₱2999.00' },
        { id: 3, name: 'Product 3', price: '₱3999.00' }
      ]
    },
    {
      id: 3,
      name: 'Category 3',
      icon: '🛋️',
      products: [
        { id: 1, name: 'Product 1', price: '₱19999.00' },
        { id: 2, name: 'Product 2', price: '₱9999.00' },
        { id: 3, name: 'Product 3', price: '₱29999.00' }
      ]
    },
    {
      id: 4,
      name: 'Category 4',
      icon: '📚',
      products: [
        { id: 1, name: 'Product 1', price: '₱499.00' },
        { id: 2, name: 'Product 2', price: '₱999.00' },
        { id: 3, name: 'Product 3', price: '₱299.00' }
      ]
    }
  ]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-12">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(category => (
            <Link 
              to={`/category/${category.id}`} 
              className="block bg-white border border-gray-300 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-4xl text-primary-600 mb-4 text-center">{category.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{category.name}</h3>
              <div className="space-y-2">
                {category.products.map(product => (
                  <div key={product.id} className="flex justify-between items-center">
                    <span className="text-gray-600">{product.name}</span>
                    <span className="text-gray-900 font-semibold">{product.price}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
