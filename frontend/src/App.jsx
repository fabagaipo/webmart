import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FaCrown } from 'react-icons/fa';
import { MdStarRate } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import { CartProvider } from 'context/CartContext';
import { UserProvider } from 'context/UserContext'

import Notifications from 'components/notification/Notifications';
import Purchases from 'components/Purchases';
import Vouchers from 'components/Vouchers';
import ProtectedRoute from 'components/ProtectedRoute'
import Products from './components/product/Products';
import Categories from './components/category/Categories';
import About from './components/About';
import Cart from './components/cart/Cart';
import Slideshow from './components/Slideshow';
import Banners from './components/Banners';
import Profile from './components/Profile';
import SaleItems from './components/SaleItems';
import AuthForm from './components/AuthForm';
import NotificationItem from './components/notification/NotificationItem';
import FeaturedProducts from './components/product/FeaturedProducts';
import CartBadge from './components/cart/CartBadge';
import ProductDetails from './components/product/ProductDetails';
import StoreOwnerApplication from './components/store/StoreOwnerApplication';
import StoreManagement from './components/store/StoreManagement';
import Settings from './components/Settings';
import Stores from './components/store/Stores';
import StoreDetails from './components/store/StoreDetails';
import NewArrivals from './components/NewArrivals';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '/404';

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Order Confirmation',
      message: 'Your order #123456 has been successfully placed!',
      type: 'success',
      timestamp: '2025-05-20 14:30',
      read: false
    },
    {
      id: 2,
      title: 'Shipping Update',
      message: 'Your order is being prepared for shipping.',
      type: 'info',
      timestamp: '2025-05-19 10:45',
      read: true
    },
    {
      id: 3,
      title: 'Special Offer',
      message: 'Get 20% off on your next purchase! Use code WEBMART20',
      type: 'offer',
      timestamp: '2025-05-18 16:20',
      read: false
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const notificationsContainer = document.querySelector('.notifications-container');
      const notificationButton = document.querySelector('.notification-button');
      
      if (showNotifications && 
          notificationsContainer && 
          !notificationsContainer.contains(event.target) && 
          !notificationButton.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
  };

  return (
    <UserProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <Toaster reverseOrder={false} />
            {/* Header */}
            {!isNotFoundPage && (
              <header className="bg-[#0053E2] shadow-sm sticky top-0 z-50">
                <nav className="px-4 sm:px-6 lg:px-8 py-4 flex items-center">
                  <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                      <img src="/webmart-long-icon.svg" alt="WebMart Logo" className="h-16 w-auto" />
                    </Link>
                  </div>
                  <div className="flex-grow flex items-center space-x-2 ml-4">
                    <div className="relative flex-grow">
                      <div className="w-full relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder="Search in WebMart"
                          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary-600 text-black bg-[#F0F5FF] transition-all duration-200"
                        />
                      </div>
                    </div>
                    <Link to="/cart" className="text-gray-700 p-2 rounded-lg transition-colors no-bg">
                      <div className="relative rounded-full w-10 h-10 bg-[#F0F5FF] flex items-center justify-center">
                        <img src="/shoppingcart.svg" alt="Shopping Cart" className="w-6 h-6" />
                        <CartBadge />
                      </div>
                    </Link>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNotifications();
                        }}
                        className="text-gray-700 p-2 rounded-lg transition-colors no-bg no-focus no-hover notification-button"
                      >
                        <div className="relative rounded-full w-10 h-10 bg-[#F0F5FF] flex items-center justify-center">
                          <img src="/bell.svg" alt="Notifications" className="w-6 h-6" />
                          {notifications.filter(n => !n.read).length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {notifications.filter(n => !n.read).length}
                            </span>
                          )}
                        </div>
                      </button>
                      {showNotifications && (
                        <div className="absolute right-0 mt-2 w-96 bg-[#F0F5FF] rounded-lg shadow-xl py-2 z-50 notifications-container">
                          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setNotifications(prev => prev.map(notification => ({ ...notification, read: true })))
                                }}
                                className="text-sm no-bg text-indigo-600 no-hover"
                              >
                                Mark all as read
                              </button>
                              <Link to="/profile/notifications" className="text-sm text-indigo-600 hover:text-indigo-700 no-bg no-hover flex items-center" onClick={() => setShowNotifications(false)}>
                                <FiExternalLink className="w-5 h-5" />
                              </Link>
                            </div>
                          </div>
                          <div className="max-h-96 overflow-y-auto">
                            {notifications.map((notification) => (
                              <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={(id) => {
                                  setNotifications(prev => prev.map(notification =>
                                    notification.id === id ? { ...notification, read: true } : notification
                                  ));
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Link to="/profile" className="text-gray-700 p-2 rounded-lg transition-colors no-bg">
                      <div className="rounded-full w-10 h-10 bg-[#F0F5FF] flex items-center justify-center">
                        <img src="/user.svg" alt="User" className="w-6 h-6" />
                      </div>
                    </Link>
                  </div>
                </nav>
              </header>
            )}
            
            {/* Main Content */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={
                  <>
                    {/* Hero Slideshow */}
                    <section className="py-4 px-4 sm:px-6 lg:px-8">
                      <Slideshow />
                    </section>

                    {/* Banners */}
                    <section className="py-4 px-4 sm:px-6 lg:px-8">
                      <Banners />
                    </section>

                    {/* Featured Products */}
                    <section className="py-8 px-4 sm:px-6 lg:px-8">
                      <div className="">
                        <div className="flex justify-between items-center mb-8">
                          <h2 className="text-2xl font-semibold text-gray-900">
                            Featured Products
                          </h2>
                          <Link to="/products" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                            View All Products
                            <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                        <FeaturedProducts />
                      </div>
                    </section>

                    {/* Divider */}
                    <div className="px-4 sm:px-6 lg:px-8">
                      <div className="border-t border-gray-200 my-8"></div>
                    </div>

                    {/* Top Stores */}
                    <section className="py-8 px-4 sm:px-6 lg:px-8">
                      <div className="">
                        <div className="flex justify-between items-center mb-8">
                          <h2 className="text-2xl font-semibold text-gray-900">
                            Top Stores
                          </h2>
                          <Link to="/stores" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                            View All Stores
                            <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                          {[
                            {
                              id: 1,
                              name: "Top Store 1",
                              rating: 4.8,
                              reviews: 1245,
                              image: "https://placehold.co/300x200/002E99/FFF",
                              category: "Fashion"
                            },
                            {
                              id: 2,
                              name: "Top Store 2",
                              rating: 4.9,
                              reviews: 987,
                              image: "https://placehold.co/300x200/002E99/FFF",
                              category: "Electronics"
                            },
                            {
                              id: 3,
                              name: "Top Store 3",
                              rating: 4.7,
                              reviews: 1560,
                              image: "https://placehold.co/300x200/002E99/FFF",
                              category: "Home & Living"
                            },
                            {
                              id: 4,
                              name: "Top Store 4",
                              rating: 4.8,
                              reviews: 2134,
                              image: "https://placehold.co/300x200/002E99/FFF",
                              category: "Food & Beverages"
                            },
                            {
                              id: 5,
                              name: "Top Store 5",
                              rating: 4.9,
                              reviews: 876,
                              image: "https://placehold.co/300x200/002E99/FFF",
                              category: "Books & Stationery"
                            }
                          ].map(store => (
                            <Link to={`/store/${store.id}`} key={store.id} className="block">
                              <div className="bg-[#F0F5FF] border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1">
                                <div className="aspect-square relative">
                                  <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                                  <div className="absolute top-2 right-2 bg-yellow-200 text-black px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <FaCrown /> Top {store.id}
                                  </div>
                                </div>
                                <div className="p-4">
                                  <h3 className="text-sm font-medium text-gray-900 mb-1">{store.name}</h3>
                                  <div className="flex items-center mb-2">
                                    <MdStarRate className="w-4 h-4 text-yellow-400" />
                                    <span className="ml-1 text-sm text-gray-600">{store.rating}</span>
                                    <span className="ml-1 text-sm text-gray-400">({store.reviews} reviews)</span>
                                  </div>
                                  <p className="text-xs text-gray-500">{store.category}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* Divider */}
                    <div className="px-4 sm:px-6 lg:px-8">
                      <div className="border-t border-gray-200 my-8"></div>
                    </div>

                    {/* Categories */}
                    <section className="py-8 px-4 sm:px-6 lg:px-8">
                      <div className="">
                        <div className="flex justify-between items-center mb-8">
                          <h2 className="text-2xl font-semibold text-gray-900">
                            Shop by Category
                          </h2>
                          <Link to="/categories" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                            View All Categories
                            <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                          {[
                            {
                              id: 1,
                              name: 'Category 1',
                              image: 'https://placehold.co/50x50/0053E2/FFF',
                              icon: '📱'
                            },
                            {
                              id: 2,
                              name: 'Category 2',
                              image: 'https://placehold.co/50x50/0053E2/FFF',
                              icon: '👗'
                            },
                            {
                              id: 3,
                              name: 'Category 3',
                              image: 'https://placehold.co/50x50/0053E2/FFF',
                              icon: '🛋️'
                            },
                            {
                              id: 4,
                              name: 'Category 4',
                              image: 'https://placehold.co/50x50/0053E2/FFF',
                              icon: '📚'
                            },
                            {
                              id: 5,
                              name: 'Category 5',
                              image: 'https://placehold.co/50x50/0053E2/FFF',
                              icon: '🔥'
                            },
                            {
                              id: 6,
                              name: 'Category 6',
                              image: 'https://placehold.co/50x50/0053E2/FFF',
                              icon: '🦀'
                            },
                            {
                              id: 7,
                              name: 'Category 7',
                              image: 'https://placehold.co/50x50/002E99/FFF',
                              icon: '🎮'
                            },
                            {
                              id: 8,
                              name: 'Category 8',
                              image: 'https://placehold.co/50x50/002E99/FFF',
                              icon: '🏖️'
                            },
                            {
                              id: 9,
                              name: 'Category 9',
                              image: 'https://placehold.co/50x50/002E99/FFF',
                              icon: '🏖️'
                            },
                            {
                              id: 10,
                              name: 'Category 10',
                              image: 'https://placehold.co/50x50/002E99/FFF',
                              icon: '🏖️'
                            },
                            {
                              id: 11,
                              name: 'Category 11',
                              image: 'https://placehold.co/50x50/002E99/FFF',
                              icon: '🏖️'
                            },
                            {
                              id: 12,
                              name: 'Category 12',
                              image: 'https://placehold.co/50x50/002E99/FFF',
                              icon: '🏖️'
                            },
                          ].map(category => (
                            <Link to={`/category/${category.id}`} key={category.id} className="block">
                              <div className="bg-[#F0F5FF] border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1">
                                <div className="aspect-square">
                                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-2">
                                  <div className="text-xl text-center mb-1">{category.icon}</div>
                                  <h3 className="text-xs font-medium text-gray-900 text-center">{category.name}</h3>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </section>
                  </>
                } />
                <Route path="/sale" element={<SaleItems />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route element={<ProtectedRoute/>}>
                  <Route path="/profile" element={<Profile />}>
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="purchases" element={<Purchases />} />
                    <Route path="vouchers" element={<Vouchers />} />
                    <Route path="store-owner-application" element={<StoreOwnerApplication />} />
                    <Route path="store-management" element={<StoreManagement />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                </Route>
                <Route path="/login" element={<AuthForm mode="login" />} />
                <Route path="/register" element={<AuthForm mode="register" />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/store/:id" element={<StoreDetails />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/404" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            {!isNotFoundPage && (
              <footer className="bg-[#F0F5FF] text-gray-600 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-wrap gap-6">
                    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                      <h3 className="text-gray-900 font-semibold mb-4">WebMart</h3>
                      <p className="text-gray-600 mb-4">Your one-stop shop for anything you want</p>
                    </div>
                    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                      <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/stores" className="text-gray-600 hover:text-primary-600 transition-colors">Stores</Link>
                        </li>
                        <li>
                          <Link to="/products" className="text-gray-600 hover:text-primary-600 transition-colors">Products</Link>
                        </li>
                        <li>
                          <Link to="/categories" className="text-gray-600 hover:text-primary-600 transition-colors">Categories</Link>
                        </li>
                        <li>
                          <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                      <h3 className="text-gray-900 font-semibold mb-4">My Account</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/profile" className="text-gray-600 hover:text-primary-600 transition-colors">Profile</Link>
                        </li>
                        <li>
                          <Link to="/shipping" className="text-gray-600 hover:text-primary-600 transition-colors">Track My Order</Link>
                        </li>
                        <li>
                          <Link to="/returns" className="text-gray-600 hover:text-primary-600 transition-colors">Returns</Link>
                        </li>
                        <li>
                          <Link to="/faq" className="text-gray-600 hover:text-primary-600 transition-colors">FAQ</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                      <h3 className="text-gray-900 font-semibold mb-4">Contact Us</h3>
                      <p className="text-gray-600 mb-2">Email: support@webmart.com</p>
                      <p className="text-gray-600 mb-4">Phone: (032) 123-4567</p>
                    </div>
                  </div>
                  <div className="mt-16 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-sm">
                      <p className="text-gray-600">&copy; 2025 WebMart. All rights reserved.</p>
                      <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                        <Link to="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-600 hover:text-primary-600 transition-colors">Terms of Service</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            )}
          </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;