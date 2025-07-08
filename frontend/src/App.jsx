import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

import { CartProvider } from 'context/CartContext';
import { UserProvider } from 'context/UserContext';
import { NotificationProvider } from 'context/NotificationContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/ProductsPage';
import Categories from './pages/CategoriesPage';
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart';
import Profile from './pages/ProfilePage';
import Notifications from 'components/notification/Notifications';
import Purchases from 'components/Purchases';
import Vouchers from 'components/Vouchers';
import ProtectedRoute from 'components/ProtectedRoute';
import About from './components/About';
import SaleItems from './components/SaleItems';
import AuthForm from './components/AuthForm';
import StoreOwnerApplication from './components/store/StoreOwnerApplication';
import Settings from './components/Settings';
import Stores from './pages/StoresPage';
import StoreDetails from './components/store/StoreDetails';
import NewArrivals from './components/NewArrivals';
import NotFound from './components/NotFound';
import HomePage from './pages/HomePage';

function App() {
    return (
        <Router>
            <UserProvider>
                <CartProvider>
                    <NotificationProvider>
                        <AppContent />
                    </NotificationProvider>
                </CartProvider>
            </UserProvider>
        </Router>
    );
}

function AppContent() {
    const location = useLocation();
    const [showHeaderFooter, setShowHeaderFooter] = useState(true);
    
    useEffect(() => {
        const is404Page = location.pathname === '/404' || 
                         (location.state && location.state.is404);
        setShowHeaderFooter(!is404Page);
    }, [location]);
    
    return (
        <div className='app flex flex-col min-h-screen'>
            {showHeaderFooter && <Header />}

            <main className='flex-grow'>
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
                    <Route path='/store/:id' element={<StoreDetails />}>
                        <Route index element={<StoreDetails />} />
                        <Route path='products' element={<StoreDetails />} />
                        <Route path='reviews' element={<StoreDetails />} />
                        <Route path='contact' element={<StoreDetails />} />
                    </Route>
                    <Route path='/new-arrivals' element={<NewArrivals />} />
                    <Route path='*' element={<NotFound />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path='/profile' element={<Profile />}>
                            <Route path='notifications' element={<Notifications />} />
                            <Route path='purchases' element={<Purchases />} />
                            <Route path='vouchers' element={<Vouchers />} />
                            <Route
                                path='store-owner-application'
                                element={<StoreOwnerApplication />}
                            />
                            <Route path='settings' element={<Settings />} />
                        </Route>
                    </Route>
                </Routes>
            </main>

            {showHeaderFooter && <Footer />}
            <Toaster position='top-center' reverseOrder={false} />
        </div>
    );
}

export default App;
