import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdStarRate, MdStarOutline, MdStarHalf } from 'react-icons/md';

function FeaturedProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '₱99.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.5,
      sales: 124
    },
    {
      id: 2,
      name: 'Product 2',
      price: '₱149.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.7,
      sales: 89
    },
    {
      id: 3,
      name: 'Product 3',
      price: '₱1299.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.8,
      sales: 45
    },
    {
      id: 4,
      name: 'Product 4',
      price: '₱1299.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.8,
      sales: 67
    },
    {
      id: 5,
      name: 'Product 5',
      price: '₱899.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.6,
      sales: 78
    },
    {
      id: 6,
      name: 'Product 6',
      price: '₱199.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.9,
      sales: 95
    },
    {
      id: 7,
      name: 'Product 7',
      price: '₱299.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.7,
      sales: 112
    },
    {
      id: 8,
      name: 'Product 8',
      price: '₱399.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.5,
      sales: 88
    },
    {
      id: 9,
      name: 'Product 9',
      price: '₱499.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.8,
      sales: 65
    },
    {
      id: 10,
      name: 'Product 10',
      price: '₱599.99',
      image: 'https://placehold.co/300x200/0053E2/FFF',
      rating: 4.9,
      sales: 102
    }
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
            className="bg-[#F0F5FF] overflow-hidden border border-gray-300 shadow-sm transition-transform hover:-translate-y-1"
          >
            <Link 
              to={`/product/${product.id}`}
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
                <div className="text-base font-semibold text-[#001E60] mb-2 text-center">{product.price}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
