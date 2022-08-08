import { useLocation, Navigate, Outlet, UNSAFE_LocationContext } from 'react-router-dom';

export default function RequireAuth({ allowedRoles }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();
    return allowedRoles.includes(user?.user?.role) ? (
        <Outlet />
    ) : user?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="login" state={{ from: location }} replace />
    );
}
