import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LuCopy, LuCheck } from 'react-icons/lu';
import { toast } from 'react-hot-toast';

const StoreDetails = () => {
  const { id } = useParams();
  const [copiedCode, setCopiedCode] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Voucher code copied!', {
      position: 'bottom-center'
    });
    setTimeout(() => setCopiedCode(null), 1000);
  };

  const store = {
    id: parseInt(id),
    name: "Store Name",
    logo: "https://placehold.co/200x200/FE6233/FFF",
    banner: "https://placehold.co/1200x400/FE6233/FFF",
    rating: 4.8,
    reviews: 1245,
    category: "Fashion",
    description: "Welcome to the store.",
    featuredProducts: [
      {
        id: 1,
        name: "Featured Product 1",
        price: 99.99,
        image: "https://placehold.co/300x300/FE6233/FFF",
        category: "Dresses"
      },
      {
        id: 2,
        name: "Featured Product 2",
        price: 49.99,
        image: "https://placehold.co/300x300/FE6233/FFF",
        category: "Shoes"
      },
      {
        id: 3,
        name: "Featured Product 3",
        price: 29.99,
        image: "https://placehold.co/300x300/FE6233/FFF",
        category: "Accessories"
      },
      {
        id: 4,
        name: "Featured Product 4",
        price: 29.99,
        image: "https://placehold.co/300x300/FE6233/FFF",
        category: "Accessories"
      },
      {
        id: 5,
        name: "Featured Product 5",
        price: 29.99,
        image: "https://placehold.co/300x300/FE6233/FFF",
        category: "Accessories"
      }
    ],
    vouchers: [
      {
        id: 1,
        code: "WELCOME20",
        description: "20% off your first purchase",
        bg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
        expiryDate: "2025-12-31",
        minSpend: 500,
        remaining: 100
      },
      {
        id: 2,
        code: "FASHION15",
        description: "15% off fashion items",
        bg: "bg-gradient-to-r from-green-500 to-green-600",
        expiryDate: "2025-11-30",
        minSpend: 1000,
        remaining: 50
      },
      {
        id: 3,
        code: "SUMMER10",
        description: "10% off all items",
        bg: "bg-gradient-to-r from-blue-500 to-blue-600",
        expiryDate: "2025-09-30",
        minSpend: 2000,
        remaining: 200
      }
    ]
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Store Banner */}
      <div className="mb-8">
        <img src={store.banner} alt={`₱{store.name} Banner`} className="w-full h-64 object-cover rounded-lg" />
      </div>

      {/* Store Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center">
          <img src={store.logo} alt={`₱{store.name} Logo`} className="w-20 h-20 rounded-full mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
            <div className="flex items-center mt-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm text-gray-600">{store.rating}</span>
              <span className="ml-1 text-sm text-gray-400">({store.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Follow Store
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Store Info Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button className="border-b-2 border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 text-sm font-medium">
            Overview
          </button>
          <button className="border-b-2 border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 text-sm font-medium">
            Products
          </button>
          <button className="border-b-2 border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 text-sm font-medium">
            Reviews
          </button>
          <button className="border-b-2 border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 text-sm font-medium">
            Contact
          </button>
        </nav>
      </div>

      {/* Store Overview */}
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Store Overview</h3>
          <p className="text-gray-600">{store.description}</p>
        </div>

      {/* Vouchers Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Available Vouchers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {store.vouchers.map((voucher, index) => (
            <div 
              key={index}
              className={`relative rounded-lg overflow-hidden ${voucher.bg} text-white p-6 transition-transform hover:scale-[1.02]`}
            >
              <div className="absolute top-4 left-4 text-4xl opacity-70">🏷️</div>
              <div className="pl-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{voucher.code}</h3>
                  <p className="text-sm mb-4">{voucher.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm">Expires: {new Date(voucher.expiryDate).toLocaleDateString()}</span>
                      <span className="text-sm">Min Spend: ₱{voucher.minSpend}</span>
                      <span className="text-sm">Remaining: {voucher.remaining}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(voucher.code)}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors no-bg no-focus no-hover"
                    >
                      {copiedCode === voucher.code ? (
                        <LuCheck className="w-5 h-5" />
                      ) : (
                        <LuCopy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Products</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {store.featuredProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="block">
                <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-square">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                    <p className="text-sm font-semibold text-primary-600">₱{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
