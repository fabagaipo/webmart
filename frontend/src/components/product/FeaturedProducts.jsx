import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdStarRate, MdStarOutline, MdStarHalf } from 'react-icons/md';

function FeaturedProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const products = [
    {
      id: 1,
      name: 'Wireless Earbuds',
      price: '99.99',
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.5,
      sales: 124
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: '149.99',
      image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=500&auto=format&fit=crop&iq=60',
      rating: 4.7,
      sales: 89
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: '1299.99',
      image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.8,
      sales: 45
    },
    {
      id: 4,
      name: 'Wireless Charger',
      price: '1299.99',
      image: 'https://images.unsplash.com/photo-1591290619618-904f6dd935e3?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.8,
      sales: 67
    },
    {
      id: 5,
      name: 'Gaming Monitor',
      price: '899.99',
      image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.6,
      sales: 78
    },
    {
      id: 6,
      name: 'Wireless Headphones',
      price: 99.99,
      sales: 10,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
      rating: 4.5,
    },
    {
      id: 7,
      name: 'Nintendo Switch',
      price: 149.99,
      sales: 20,
      image: 'https://images.unsplash.com/photo-1591182136289-67ff16828fd4?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.7,
    },
    {
      id: 8,
      name: 'Magsafe Powerbank',
      price: 1299.99,
      sales: 30,
      image: 'https://images.unsplash.com/photo-1644571663498-f4f18db66c17?q=80&w=500auto=format&fit=crop&q=60',
      rating: 4.8,
    },
    {
      id: 9,
      name: 'Macbook Air M2',
      price: 1299.99,
      sales: 40,
      image: 'https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.8,
    },
    {
      id: 10,
      name: 'Casio GShock',
      price: 1299.99,
      sales: 50,
      image: 'https://images.unsplash.com/photo-1624608291203-c0efcb41cab6?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.8,
    },
  ];

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="relative">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="absolute left-[-3rem] top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="absolute right-[-3rem] top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="grid grid-cols-5 gap-4 relative">
        {currentProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-md overflow-hidden border border-gray-300 shadow-sm transition-transform hover:-translate-y-1"
          >
            <Link 
              to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
                  <span className="text-sm text-gray-500">{product.sales} sold</span>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const ratingValue = product.rating;
                      return (
                        <span key={star} className="text-lg">
                          {ratingValue >= star ? (
                            <MdStarRate />
                          ) : ratingValue >= star - 0.5 ? (
                            <MdStarHalf />
                          ) : (
                            <MdStarOutline />
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
                </div>
                <div className="text-base font-semibold text-[#001E60] mb-2 text-center">₱{product.price}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
