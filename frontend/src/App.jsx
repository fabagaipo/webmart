import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FaCrown } from 'react-icons/fa';
import { MdStarRate } from 'react-icons/md';

import { CartProvider } from 'context/CartContext';
import { UserProvider } from 'context/UserContext';
import { NotificationProvider } from 'context/NotificationProvider';

import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/product/Products';
import Categories from './components/category/Categories';
import CategoryCards from './components/category/CategoryCards';
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart';
import Profile from './components/Profile';
import Notifications from 'components/notification/Notifications';
import Purchases from 'components/Purchases';
import Vouchers from 'components/Vouchers';
import ProtectedRoute from 'components/ProtectedRoute';
import About from './components/About';
import Slideshow from './components/Slideshow';
import SaleItems from './components/SaleItems';
import AuthForm from './components/AuthForm';
import FeaturedProducts from './components/product/FeaturedProducts';
import StoreOwnerApplication from './components/store/StoreOwnerApplication';
import StoreManagement from './components/store/StoreManagement';
import Settings from './components/Settings';
import Stores from './components/store/Stores';
import StoreDetails from './components/store/StoreDetails';
import NewArrivals from './components/NewArrivals';
import NotFound from './components/NotFound';
import PromoCollage from './components/PromoCollage';

// Sample data for the homepage
// const featuredCategories = [
//   { id: 1, name: 'Electronics', image: 'https://placehold.co/150x150/0053E2/FFFFFF?text=Electronics', url: '/electronics' },
//   { id: 2, name: 'Home', image: 'https://placehold.co/150x150/0071DC/FFFFFF?text=Home', url: '/home' },
//   { id: 3, name: 'Fashion', image: 'https://placehold.co/150x150/004F9A/FFFFFF?text=Fashion', url: '/fashion' },
//   { id: 4, name: 'Toys', image: 'https://placehold.co/150x150/003B7A/FFFFFF?text=Toys', url: '/toys' },
//   { id: 5, name: 'Grocery', image: 'https://placehold.co/150x150/002E99/FFFFFF?text=Grocery', url: '/grocery' },
//   { id: 6, name: 'Deals', image: 'https://placehold.co/150x150/FFC220/000000?text=Deals', url: '/deals' },
// ];

function App() {
    return (
        <UserProvider>
            <CartProvider>
                <NotificationProvider>
                    <Router>
                        <AppContent />
                    </Router>
                </NotificationProvider>
            </CartProvider>
        </UserProvider>
    );
}

function AppContent() {
    return (
        <div className='app'>
            <Header />

            <main className='main-content'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/sale' element={<SaleItems />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/product/:id' element={<ProductDetails />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<AuthForm mode='login' />} />
                    <Route path='/register' element={<AuthForm mode='register' />} />
                    <Route path='/stores'>
                        <Route index element={<Stores />} />
                        <Route path='category/:categorySlug' element={<Stores />} />
                    </Route>
                    <Route path='/store/:id' element={<StoreDetails />} />
                    <Route path='/new-arrivals' element={<NewArrivals />} />
                    <Route path='/404' element={<NotFound />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path='/profile' element={<Profile />}>
                            <Route path='notifications' element={<Notifications />} />
                            <Route path='purchases' element={<Purchases />} />
                            <Route path='vouchers' element={<Vouchers />} />
                            <Route
                                path='store-owner-application'
                                element={<StoreOwnerApplication />}
                            />
                            <Route path='store-management' element={<StoreManagement />} />
                            <Route path='settings' element={<Settings />} />
                        </Route>
                    </Route>
                </Routes>
            </main>

            <Footer />
            <Toaster position='top-right' />
        </div>
    );
}

function HomePage() {
    return (
        <div className='home-page'>
            {/* Hero Section */}
            <Slideshow />

            <CategoryCards />

            {/* Category Grid */}
            {/* <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {featuredCategories.map((category) => (
              <Link to={category.url} key={category.id} className="category-card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <img src={category.image} alt={category.name} className="w-full h-32 object-cover" />
                <h3 className="p-3 text-sm font-medium text-gray-900 text-center">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

            {/* Divider */}
            {/* <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 my-8"></div>
        </div>
      </div> */}

            {/* Top Stores */}
            <section className='py-8'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl font-semibold text-gray-900'>Top Stores</h2>
                        <Link
                            to='/stores'
                            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700'
                        >
                            View All Stores
                            <svg
                                className='ml-2 -mr-1 h-4 w-4'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </Link>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
                        {[
                            {
                                id: 1,
                                name: 'Louis Vuitton',
                                rating: 4.8,
                                reviews: 1245,
                                image: 'https://placehold.co/300x200/0053E2/FFFFFF?text=Louis Vuitton',
                                category: 'Fashion',
                            },
                            {
                                id: 2,
                                name: 'PowerMac Official Store',
                                rating: 4.9,
                                reviews: 987,
                                image: 'https://placehold.co/300x200/0071DC/FFFFFF?text=PowerMac Official Store',
                                category: 'Electronics',
                            },
                            {
                                id: 3,
                                name: 'SM Home',
                                rating: 4.7,
                                reviews: 1560,
                                image: 'https://placehold.co/300x200/004F9A/FFFFFF?text=SM Home',
                                category: 'Home & Living',
                            },
                            {
                                id: 4,
                                name: 'Samyang Offical',
                                rating: 4.8,
                                reviews: 2134,
                                image: 'https://placehold.co/300x200/003B7A/FFFFFF?text=Samyang Official',
                                category: 'Food & Beverages',
                            },
                            {
                                id: 5,
                                name: 'National Bookstore',
                                rating: 4.9,
                                reviews: 876,
                                image: 'https://placehold.co/300x200/002E99/FFFFFF?text=National Bookstore',
                                category: 'Books & Stationery',
                            },
                        ].map((store) => (
                            <Link
                                to={`/store/${store.name.toLowerCase().replace(/\s+/g, '-')}`}
                                key={store.id}
                                className='block'
                            >
                                <div className='bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1'>
                                    <div className='aspect-square relative'>
                                        <img
                                            src={store.image}
                                            alt={store.name}
                                            className='w-full h-full object-cover'
                                        />
                                        <div className='absolute top-2 right-2 bg-yellow-200 text-black px-3 py-1 rounded-full text-sm flex items-center gap-1'>
                                            <FaCrown /> Top {store.id}
                                        </div>
                                    </div>
                                    <div className='p-4'>
                                        <h3 className='text-sm font-medium text-gray-900 mb-1'>
                                            {store.name}
                                        </h3>
                                        <div className='flex items-center mb-2'>
                                            <MdStarRate className='w-4 h-4 text-yellow-400' />
                                            <span className='ml-1 text-sm text-gray-600'>
                                                {store.rating}
                                            </span>
                                            <span className='ml-1 text-sm text-gray-400'>
                                                ({store.reviews} reviews)
                                            </span>
                                        </div>
                                        <p className='text-xs text-gray-500'>{store.category}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <PromoCollage />

            {/* Divider */}
            <div className='bg-white'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='border-t border-gray-200 my-8'></div>
                </div>
            </div>

            {/* Featured Deals */}
            <section className='py-8'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl font-bold text-gray-900'>Featured Products</h2>
                        <Link
                            to='/products'
                            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700'
                        >
                            View All Products
                            <svg
                                className='ml-2 -mr-1 h-4 w-4'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </Link>
                    </div>
                    <FeaturedProducts />
                </div>
            </section>
        </div>
    );
}

export default App;
