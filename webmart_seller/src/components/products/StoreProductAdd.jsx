import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FiUpload, FiSave, FiImage } from 'react-icons/fi';
import { TbCurrencyPeso } from "react-icons/tb";

const StoreProductAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    max_stock: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting product:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/store/products');
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full no-bg"
            aria-label="Go back"
          >
            <MdArrowBackIosNew className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        </div>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Product Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className={`w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed ${
                    imagePreview ? 'border-transparent' : 'border-gray-300 group-hover:border-blue-400'
                  } transition-colors duration-200 bg-gray-50 flex items-center justify-center`}>
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <FiImage className="w-8 h-8 mb-1" />
                        <span className="text-xs">Upload image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="image-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
                  {imagePreview && (
                    <div className="absolute -bottom-2 -right-2">
                      <label
                        htmlFor="image-upload"
                        className="bg-white rounded-full p-1.5 shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                        title="Change image"
                      >
                        <FiUpload className="w-4 h-4 text-gray-600" />
                      </label>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  <p>Recommended size: 800x800px</p>
                  <p>Max file size: 5MB</p>
                  <p>Format: JPG, PNG, or GIF</p>
                </div>
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition duration-200"
                placeholder="e.g., Premium Coffee Beans"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition duration-200"
                placeholder="Describe your product in detail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price */}
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbCurrencyPeso className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
                    required
                  />
                </div>
              </div>

              {/* Current Stock */}
              <div className="space-y-2">
                <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">
                  Current Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="stock_quantity"
                  name="stock_quantity"
                  min="0"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 transition duration-200"
                  required
                />
              </div>

              {/* Max Stock */}
              <div className="space-y-2">
                <label htmlFor="max_stock" className="block text-sm font-medium text-gray-700">
                  Maximum Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="max_stock"
                  name="max_stock"
                  min="1"
                  value={formData.max_stock}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 transition duration-200"
                  required
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <Link
                  to="/store/products"
                  className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-red-600 no-bg"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="-ml-1 mr-2 h-5 w-5" />
                      Save Product
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreProductAdd;