import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Stores = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stores = [
    {
      id: 1,
      name: "Louis Vuitton",
      rating: 4.8,
      reviews: 1245,
      image: "https://placehold.co/300x200/0053E2/FFF",
      category: "Fashion",
      description: "Buy trending fashion"
    },
    {
      id: 2,
      name: "Electroworld",
      rating: 4.9,
      reviews: 987,
      image: "https://placehold.co/300x200/002E99/FFF",
      category: "Electronics",
      description: "Buy techie stuff"
    },
    {
      id: 3,
      name: "Mandaue Foam",
      rating: 4.7,
      reviews: 1560,
      image: "https://placehold.co/300x200/FF6B6B/FFF",
      category: "Home & Living",
      description: "Buy furniture and decoration"
    },
    {
      id: 4,
      name: "Nestle",
      rating: 4.8,
      reviews: 2134,
      image: "https://placehold.co/300x200/4CAF50/FFF",
      category: "Food & Beverages",
      description: "Buy food and drinks"
    },
    {
      id: 5,
      name: "Fully Booked",
      rating: 4.9,
      reviews: 876,
      image: "https://placehold.co/300x200/9C27B0/FFF",
      category: "Books & Stationery",
      description: "Buy school supplies"
    }
  ];

  const categories = ['All Categories', ...new Set(stores.map(store => store.category))];

  const filteredStores = selectedCategory && selectedCategory !== 'All Categories'
    ? stores.filter(store => store.category === selectedCategory)
    : stores;

  // Helper function to create URL-friendly slugs
  const createSlug = (category) => 
    category.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-6"
        >
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Stores
            </span>
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full origin-left"
            />
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg"
        >
          Discover amazing stores and shop from a wide range of categories
        </motion.p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8 px-2">
          {categories.map((category) => {
            const slug = createSlug(category);
            const to = category === 'All Categories' ? '/stores' : `/stores/category/${slug}`;
            
            return (
              <NavLink
                key={category}
                to={to}
                onClick={() => setSelectedCategory(category === 'All Categories' ? '' : category)}
                className={() => {
                  const isCategoryActive = category === 'All Categories' 
                    ? !selectedCategory 
                    : selectedCategory === category;
                  return `
                    px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
                    ${isCategoryActive 
                      ? 'bg-primary-600 text-white shadow-md hover:shadow-lg hover:bg-primary-700 border-2 border-primary-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                    }`;
                }}
              >
                {category}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStores.map(store => (
          <Link 
            to={`/store/${store.id}`} 
            key={store.id}
            className="group block h-full"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img 
                  src={store.image} 
                  alt={store.name} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{store.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {store.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{store.description}</p>
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(store.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-600">{store.rating}</span>
                    </div>
                    <span className="mx-1 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{store.reviews} reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Stores;
