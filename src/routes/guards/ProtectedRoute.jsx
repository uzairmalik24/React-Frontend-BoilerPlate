// src/components/ProtectedRoute.jsx   (or wherever you keep components)
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAdminAuthenticated } from '../../store/slices/AdminSlice'; // ← your selector

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAdminAuthenticated);



    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;