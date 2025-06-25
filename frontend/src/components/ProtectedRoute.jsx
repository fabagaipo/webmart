import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from 'context';

export default function ProtectedRoute() {
    const { user } = useUser();
    const location = useLocation();
    const isAuthenticated = !!user?.id;

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
}