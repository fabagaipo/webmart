import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import StoreManagement from './components/StoreManagement';
import StoreHeader from './components/StoreHeader';
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
                <Route path="/store/*" element={<StoreManagement />} />
                <Route path="/" element={<Navigate to="/store/dashboard" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
    </div>
  );
}

export default App;