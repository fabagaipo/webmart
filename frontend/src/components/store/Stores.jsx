import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Stores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stores = [
    {
      id: 1,
      name: "Top Store 1",
      rating: 4.8,
      reviews: 1245,
      image: "https://placehold.co/300x200/0053E2/FFF",
      category: "Fashion",
      description: "Buy trending fashion"
    },
    {
      id: 2,
      name: "Top Store 2",
      rating: 4.9,
      reviews: 987,
      image: "https://placehold.co/300x200/002E99/FFF",
      category: "Electronics",
      description: "Buy techie stuff"
    },
    {
      id: 3,
      name: "Top Store 3",
      rating: 4.7,
      reviews: 1560,
      image: "https://placehold.co/300x200/0053E2/FFF",
      category: "Home & Living",
      description: "Buy furniture and decoration"
    },
    {
      id: 4,
      name: "Top Store 4",
      rating: 4.8,
      reviews: 2134,
      image: "https://placehold.co/300x200/002E99/FFF",
      category: "Food & Beverages",
      description: "Buy food and drinks"
    },
    {
      id: 5,
      name: "Top Store 5",
      rating: 4.9,
      reviews: 876,
      image: "https://placehold.co/300x200/0053E2/FFF",
      category: "Books & Stationery",
      description: "Buy school supplies"
    }
  ];

  const categories = [...new Set(stores.map(store => store.category))];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || store.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">All Stores</h1>
        </div>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search stores"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 w-full justify-center">
        {filteredStores.map(store => (
          <Link to={`/store/${store.id}`} key={store.id} className="">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1">
              <div className="aspect-rectangle">
                <img src={store.image} alt={store.name} className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-xs font-medium text-gray-900 mb-1">{store.name}</h3>
                <div className="flex items-center mb-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-xs text-gray-600">{store.rating}</span>
                  <span className="ml-1 text-xs text-gray-400">({store.reviews} reviews)</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{store.category}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{store.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Stores;
