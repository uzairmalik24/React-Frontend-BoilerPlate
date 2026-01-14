import AdminLayout from '../components/layouts/admin/AdminLayout';
import NotFound from '../components/NotFound';
import Admin from '../pages/admin/Admin';
import AdminSettings from '../pages/admin/AdminSettings';
import Dashboard from '../pages/admin/Dashboard';
import AdminLogin from '../pages/auth/AdminLogin';
import ProtectedRoute from './guards/ProtectedRoute';

export const adminRoutes = [

    // Protected admin area
    {
        path: '/dashboard',
        // element: <ProtectedRoute />,           
        children: [
            {
                element: <AdminLayout />,          // ← layout with sidebar/navbar/etc
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: 'admins',
                        element: <Admin />,
                    },
                    {
                        path: 'settings',
                        element: <AdminSettings />,
                    },
                    // Add more admin pages here...
                    // {
                    //   path: 'users',
                    //   element: <AdminUsers />,
                    // },

                    // Admin 404 - only shown if authenticated
                    {
                        path: '*',
                        element: <NotFound />,
                    },
                ],
            },
        ],
    },

    // Optional: redirect /admin → /dashboard (if logged in)
    {
        path: '*',
        element: <NotFound />,
    },
];