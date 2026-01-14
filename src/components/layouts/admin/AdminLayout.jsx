// src/layouts/AdminLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <AdminSidebar onToggle={setSidebarOpen} />

            {/* Main Content Area */}
            <div
                className="transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                    marginLeft: sidebarOpen ? '280px' : '80px',
                }}
            >
                {/* Topbar */}
                <AdminTopbar onToggleSidebar={() => {
                }} />

                {/* Page Content */}
                <main className=" overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;