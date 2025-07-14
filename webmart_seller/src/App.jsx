import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';

import StoreManagement from './components/StoreManagement';
import StoreHeader from './components/StoreHeader';
import StoreProducts from './components/StoreProducts';
import StoreProductDetails from './components/StoreProductDetails';
import NotFound from './components/NotFound';
import Orders from './components/Orders';

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
          <Route path="/store/orders" element={<Orders />} />
          <Route path="/store/products" element={<StoreProducts />} />
          <Route path="/store/products/:productId" element={<StoreProductDetails />} />
          <Route path="/" element={<Navigate to="/store/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;