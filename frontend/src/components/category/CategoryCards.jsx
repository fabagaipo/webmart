import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMobileAlt, 
  FaHome, 
  FaTshirt, 
  FaGamepad, 
  FaShoppingBasket, 
  FaFireAlt, 
  FaHeartbeat, 
  FaFutbol,
  FaShoppingBag,
  FaUtensils,
  FaLaptop,
  FaBaby,
  FaBook,
  FaMusic,
  FaTools,
  FaCar
} from 'react-icons/fa';

const CategoryCards = () => {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: <FaLaptop className="w-8 h-8" />,
      color: 'from-blue-400 to-blue-600',
      url: '/electronics'
    },
    {
      id: 2,
      name: 'Home & Living',
      icon: <FaHome className="w-7 h-7" />,
      color: 'from-green-400 to-green-600',
      url: '/home'
    },
    {
      id: 3,
      name: 'Fashion',
      icon: <FaTshirt className="w-7 h-7" />,
      color: 'from-pink-400 to-pink-600',
      url: '/fashion'
    },
    {
      id: 4,
      name: 'Toys & Games',
      icon: <FaGamepad className="w-7 h-7" />,
      color: 'from-purple-400 to-purple-600',
      url: '/toys'
    },
    {
      id: 5,
      name: 'Grocery',
      icon: <FaShoppingBasket className="w-7 h-7" />,
      color: 'from-yellow-400 to-yellow-600',
      url: '/grocery'
    },
    {
      id: 6,
      name: 'Deals',
      icon: <FaFireAlt className="w-7 h-7" />,
      color: 'from-red-400 to-red-600',
      url: '/deals'
    },
    {
      id: 7,
      name: 'Health & Beauty',
      icon: <FaHeartbeat className="w-7 h-7" />,
      color: 'from-indigo-400 to-indigo-600',
      url: '/beauty'
    },
    {
      id: 8,
      name: 'Sports',
      icon: <FaFutbol className="w-7 h-7" />,
      color: 'from-emerald-400 to-emerald-600',
      url: '/sports'
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link 
              to={category.url} 
              key={category.id} 
              className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`w-16 h-16 rounded-full mb-2 flex items-center justify-center text-2xl bg-gradient-to-br ${category.color} text-white`}>
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 text-center group-hover:text-primary-600">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;