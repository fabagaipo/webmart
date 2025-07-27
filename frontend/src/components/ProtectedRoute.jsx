import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserContext } from 'contexts';

export default function ProtectedRoute() {
    const { user } = useUserContext();
    const location = useLocation();
    const isAuthenticated = !!user?.id;

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
}