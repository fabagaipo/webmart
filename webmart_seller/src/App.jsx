import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';

import StoreManagement from './components/StoreManagement';
import StoreHeader from './components/StoreHeader';
import StoreProducts from './components/products/StoreProducts';
import StoreProductDetails from './components/products/StoreProductDetails';
import StoreProductEdit from './components/products/StoreProductEdit';
import StoreProductAdd from './components/products/StoreProductAdd';
import NotFound from './components/NotFound';
import StoreOrders from './components/orders/StoreOrders';
import StoreOrderDetails from './components/orders/StoreOrderDetails';
import StoreAnalytics from './components/StoreAnalytics';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(true);  
  
  useEffect(() => {
      const is404Page = location.pathname === '/404' || 
                      (location.state && location.state.is404);
      setShowHeader(!is404Page);
  }, [location]);

  return (
    <div className='app flex flex-col min-h-screen'>
      {showHeader && <StoreHeader />}

      <main className='flex-grow'>
        <Routes>
          <Route path="/store/dashboard/*" element={<StoreManagement />} />
          <Route path="/store/orders" element={<StoreOrders />} />
          <Route path="/store/orders/:orderId" element={<StoreOrderDetails />} />
          <Route path="/store/products" element={<StoreProducts />} />
          <Route path="/store/products/add" element={<StoreProductAdd />} />
          <Route path="/store/products/:productId" element={<StoreProductDetails />} />
          <Route path="/store/products/edit/:productId" element={<StoreProductEdit />} />
          <Route path="/store/analytics" element={<StoreAnalytics />} />
          <Route path="/" element={<Navigate to="/store/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;