import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdStarRate, MdStarOutline, MdStarHalf, MdShoppingCart } from 'react-icons/md';
import { motion } from 'framer-motion';

function Products() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [products] = useState([
    {
      id: 1,
      name: 'Wireless Earbuds',
      price: 99.99,
      sales: 124,
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 149.99,
      sales: 89,
      image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=500&auto=format&fit=crop&iq=60',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 1299.99,
      sales: 45,
      image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.8,
    },
    {
      id: 4,
      name: 'Wireless Charger',
      price: 1299.99,
      sales: 67,
      image: 'https://images.unsplash.com/photo-1591290619618-904f6dd935e3?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.8,
    },
    {
      id: 5,
      name: 'Gaming Monitor',
      price: 899.99,
      sales: 78,
      image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=500&auto=format&fit=crop&q=60',
      rating: 4.6,
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
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-8 text-center"
        >
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              All Products
            </span>
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full origin-left"
            />
          </span>
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
            >
              <Link to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col h-full">
                <div className="relative pt-[100%] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => {
                        if (star <= Math.floor(product.rating)) {
                          return <MdStarRate key={star} className="w-5 h-5 text-yellow-400" />;
                        }
                        if (star === Math.ceil(product.rating) && product.rating % 1 > 0) {
                          return <MdStarHalf key={star} className="w-5 h-5 text-yellow-400" />;
                        }
                        return <MdStarOutline key={star} className="w-5 h-5 text-yellow-400" />;
                      })}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
                  </div>
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-900">₱{product.price.toFixed(2)}</span>
                      <div className="text-xs text-gray-500 mt-1">{product.sales || 0} sold</div>
                    </div>
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
