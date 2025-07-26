import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FiSave, FiTag, FiBox } from 'react-icons/fi';
import { TbCurrencyPeso } from "react-icons/tb";

const StoreProductEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    max_stock: 50,
    image: '',
    category: '',
    created_at: new Date().toISOString().split('T')[0],
    updated_at: new Date().toISOString().split('T')[0]
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const mockProduct = {
          id: parseInt(productId),
          name: 'Premium Headphones',
          description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions.',
          price: 99.99,
          stock_quantity: 10,
          max_stock: 50,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          category: 'Audio & Electronics',
          created_at: '2023-01-01',
          updated_at: '2023-01-15'
        };
        setProduct(mockProduct);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Product updated:', product);
      navigate(`/store/products/${productId}`, { replace: true });
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* <Link
          to={`/store/products/${productId}`}
          className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-8"
        >
          <MdArrowBackIosNew className="mr-1 h-4 w-4" />
          Back to Product
        </Link> */}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="md:flex space-x-8">
                {/* Product Image */}
                <div className="md:w-2/5 mb-8 md:mb-0">
                  <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-4 mb-4">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400">No image</div>
                    )}
                  </div>
                  <label className="block w-full">
                    <span className="sr-only">Choose product image</span>
                    <input 
                      type="file" 
                      onChange={handleImageChange}
                      accept="image/*"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </label>
                </div>
                
                {/* Product Form */}
                <div className="md:w-3/5 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      value={product.description}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <TbCurrencyPeso className="mr-1 text-blue-500" /> Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₱</span>
                        </div>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          min="0"
                          step="0.01"
                          value={product.price}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiTag className="mr-1 text-blue-500" /> Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Audio & Electronics">Audio & Electronics</option>
                        <option value="Home & Living">Home & Living</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                        <option value="Sports & Outdoors">Sports & Outdoors</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiBox className="mr-1 text-blue-500" /> Current Stock
                      </label>
                      <input
                        type="number"
                        id="stock_quantity"
                        name="stock_quantity"
                        min="0"
                        value={product.stock_quantity}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="max_stock" className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Stock
                      </label>
                      <input
                        type="number"
                        id="max_stock"
                        name="max_stock"
                        min="1"
                        value={product.max_stock}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form actions */}
            <div className="mt-8 pt-6 px-6 pb-6 border-t border-gray-100 flex justify-end space-x-3">
              <Link
                to={`/store/products/${productId}`}
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-red-700 no-bg"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSave className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreProductEdit;
