import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from 'context/index';

export default function ProtectedRoute() {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("access_token");

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />;
};
