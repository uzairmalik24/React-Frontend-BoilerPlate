import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../store';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
    FiSun,
    FiMoon,
    FiBell,
    FiSearch,
    FiSettings,
    FiLogOut,
    FiUser,
    FiMenu,
} from 'react-icons/fi';
import ConfirmationModal from '../../ui/ConfirmationModal';
import { clearAdmin } from '../../../store/slices/AdminSlice';

const AdminTopbar = ({ onToggleSidebar }) => {
    const dispatch = useDispatch();
    const { current: theme } = useSelector((state) => state.theme);

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const profileRef = useRef(null);
    const notificationsRef = useRef(null);
    const themeToggleRef = useRef(null);

    // Mock user data - replace with actual user data from Redux/API
    const user = {
        name: 'John Doe',
        email: 'john.doe@admin.com',
        avatar: null, // Set to image URL if available
        role: 'Administrator',
    };

    // Mock notifications
    const notifications = [
        { id: 1, title: 'New order received', time: '5 min ago', unread: true },
        { id: 2, title: 'Product stock low', time: '1 hour ago', unread: true },
        { id: 3, title: 'Customer inquiry', time: '2 hours ago', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    // Theme toggle animation with reset
    const handleThemeToggle = () => {
        const element = themeToggleRef.current;

        // Reset rotation first
        gsap.set(element, { rotation: 0 });

        // Animate rotation
        gsap.to(element, {
            rotation: 360,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
                // Reset rotation after animation
                gsap.set(element, { rotation: 0 });
            }
        });

        setTimeout(() => {
            dispatch(toggleTheme());
        }, 100);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Animate dropdown open/close
    useEffect(() => {
        if (isProfileOpen && profileRef.current) {
            const dropdown = profileRef.current.querySelector('.dropdown-menu');
            gsap.fromTo(
                dropdown,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isProfileOpen]);

    useEffect(() => {
        if (isNotificationsOpen && notificationsRef.current) {
            const dropdown = notificationsRef.current.querySelector('.dropdown-menu');
            gsap.fromTo(
                dropdown,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isNotificationsOpen]);


    const logoutConfirmation = () => {
        setIsModalOpen(true);
    }

    return (
        <header className="sticky top-0 z-40 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="h-full flex items-center justify-between px-4 md:px-6">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    {/* Mobile sidebar toggle */}
                    {/* <button
                        onClick={onToggleSidebar}
                        className="md:hidden p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-200"
                    >
                        <FiMenu size={20} />
                    </button> */}

                    {/* Search bar */}
                    {/* <div className="hidden md:flex items-center gap-2 bg-muted/30 rounded-lg px-4 py-2 w-80 border border-border/40 focus-within:border-primary/60 transition-all duration-200">
                        <FiSearch className="text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
                        />
                    </div> */}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        ref={themeToggleRef}
                        onClick={handleThemeToggle}
                        className="p-2.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-200 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
                        {theme === 'dark' ? (
                            <FiSun className="relative z-10" size={18} />
                        ) : (
                            <FiMoon className="relative z-10" size={18} />
                        )}
                    </button>

                    {/* Notifications */}
                    <div className="relative" ref={notificationsRef}>
                        <button
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="p-2.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-200 relative"
                        >
                            <FiBell size={18} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {isNotificationsOpen && (
                            <div className="dropdown-menu absolute right-0 mt-2 w-80 bg-card backdrop-blur-xl rounded-xl border border-border shadow-xl overflow-hidden z-50">
                                <div className="p-4 border-b border-border/30 bg-card">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-foreground">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                                {unreadCount} new
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="max-h-80 overflow-y-auto custom-scrollbar bg-card">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b border-border/20 hover:bg-muted/30 transition-colors cursor-pointer ${notification.unread ? 'bg-primary/5' : ''
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.unread ? 'bg-primary' : 'bg-border'
                                                    }`}></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-foreground">
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center border-t border-border/30 bg-card">
                                    <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-semibold flex-shrink-0 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                                ) : (
                                    user.name.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-medium text-foreground leading-none">
                                    {user.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {user.email}
                                </p>
                            </div>
                        </button>

                        {/* Profile Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="dropdown-menu absolute right-0 mt-2 w-64 bg-card backdrop-blur-xl rounded-xl border border-border shadow-xl overflow-hidden z-50">
                                {/* User Info */}
                                <div className="p-4 border-b border-border/30 bg-card">
                                    <p className="font-semibold text-foreground">{user.name}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
                                    <p className="text-xs text-primary mt-1">{user.role}</p>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2 bg-card">
                                    <Link
                                        to="/dashboard/profile"
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/30 transition-colors text-foreground"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <FiUser size={16} className="text-muted-foreground" />
                                        <span className="text-sm">My Profile</span>
                                    </Link>
                                    <Link
                                        to="/dashboard/settings"
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/30 transition-colors text-foreground"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <FiSettings size={16} className="text-muted-foreground" />
                                        <span className="text-sm">Settings</span>
                                    </Link>
                                </div>

                                {/* Logout */}
                                <div className="border-t border-border/30 py-2 bg-card">
                                    <button
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-destructive/10 transition-colors text-destructive w-full"
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            setIsModalOpen(true);
                                            // Handle logout
                                        }}
                                    >
                                        <FiLogOut size={16} />
                                        <span className="text-sm font-medium">Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {isModalOpen && (
                <ConfirmationModal
                    title='Logout'
                    isOpen={isModalOpen}
                    message='Are you sure you want to logout?'
                    onConfirm={() => {
                        // dispatch(clearAdmin());
                        setIsModalOpen(false);
                        navigate('/login');
                    }}
                    onClose={() => setIsModalOpen(false)}
                    confirmButtonVariant="danger"
                    type="danger"
                />
            )}

            {/* <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: hsl(var(--border) / 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: hsl(var(--border) / 0.5);
                }
            `}</style> */}
        </header>
    );
};

export default AdminTopbar;