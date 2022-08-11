import { useLocation, Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth({ allowedRoles }) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('requireAuth', user);
    const location = useLocation();
    return allowedRoles.includes(user?.user?.role) ? (
        <Outlet />
    ) : user?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="login" state={{ from: location }} replace />
    );
}
