// src/layouts/PublicLayout.jsx
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';
import { Outlet } from 'react-router-dom';

const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* Fixed/Sticky Navbar */}
            <PublicNavbar />

            {/* Main content area */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer - sticks to bottom when content is short */}
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;