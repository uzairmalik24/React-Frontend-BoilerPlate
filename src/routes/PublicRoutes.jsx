import PublicLayout from '../components/layouts/public/PublicLayout';
import Home from '../pages/public/Home';
import NotFound from '../components/NotFound';
import AdminLogin from '../pages/auth/AdminLogin';

export const publicRoutes = [
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                path: '/',
                element: <Home />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];