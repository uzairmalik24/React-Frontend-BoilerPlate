// src/routes/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './PublicRoutes';
import { adminRoutes } from './AdminRoutes';
import NotFound from '../components/NotFound';
import AdminLogin from '../pages/auth/AdminLogin';

// Combine all route groups
const router = createBrowserRouter([
    ...publicRoutes,
    ...adminRoutes,

    {
        path: '/login',
        element: <AdminLogin />,
    },

    // Optional: global 404 (outside layouts)
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;