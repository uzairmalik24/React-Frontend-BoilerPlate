import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import {
    FiHome,
    FiUsers,
    FiShoppingBag,
    FiBarChart2,
    FiSettings,
    FiFileText,
    FiTag,
    FiPackage,
    FiMenu,
    FiX,
    FiChevronDown,
    FiShield,
} from 'react-icons/fi';

const DashboardSidebar = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});
    const [hasAnimatedEntrance, setHasAnimatedEntrance] = useState(false);
    const location = useLocation();
    const sidebarRef = useRef(null);
    const submenuRefs = useRef({});

    const menuItems = [
        {
            title: 'Dashboard',
            icon: FiHome,
            path: '/dashboard',
        },
        {
            title: 'Admin',
            icon: FiShield,
            path: '/dashboard/admins',
        },
        {
            title: 'Products',
            icon: FiPackage,
            path: '/dashboard/products',
            submenu: [
                { title: 'All Products', path: '/dashboard/products' },
                { title: 'Add Product', path: '/dashboard/products/add' },
                { title: 'Categories', path: '/dashboard/products/categories' },
            ],
        },
        {
            title: 'Orders',
            icon: FiShoppingBag,
            path: '/dashboard/orders',
        },
        {
            title: 'Customers',
            icon: FiUsers,
            path: '/dashboard/customers',
        },
        {
            title: 'Analytics',
            icon: FiBarChart2,
            path: '/dashboard/analytics',
        },
        {
            title: 'Content',
            icon: FiFileText,
            path: '/dashboard/content',
            submenu: [
                { title: 'Pages', path: '/dashboard/content/pages' },
                { title: 'Blog', path: '/dashboard/content/blog' },
                { title: 'Media', path: '/dashboard/content/media' },
            ],
        },
        {
            title: 'Marketing',
            icon: FiTag,
            path: '/dashboard/marketing',
        },
        {
            title: 'Settings',
            icon: FiSettings,
            path: '/dashboard/settings',
        },
    ];

    // Initialize state based on screen size
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const initialState = !isMobile;

        setIsOpen(initialState);

        // Set initial width immediately without animation
        if (sidebarRef.current) {
            gsap.set(sidebarRef.current, { width: initialState ? '280px' : '80px' });
        }

        onToggle?.(initialState);
    }, []);

    // Smooth toggle sidebar animation
    const toggleSidebar = () => {
        const newState = !isOpen;

        const timeline = gsap.timeline({
            onStart: () => {
                if (newState) {
                    setIsOpen(true);
                }
            },
            onComplete: () => {
                if (!newState) {
                    setIsOpen(false);
                }
                onToggle?.(newState);
            }
        });

        if (!newState) {
            // Closing: fade out text first, then shrink smoothly
            timeline
                .to('.sidebar-text', {
                    opacity: 0,
                    x: -15,
                    duration: 0.3,
                    ease: 'power2.in',
                    stagger: 0.015,
                })
                .to(sidebarRef.current, {
                    width: '80px',
                    duration: 0.5,
                    ease: 'power2.inOut',
                }, '-=0.05');
        } else {
            // Opening: expand smoothly first, then fade in text
            timeline
                .to(sidebarRef.current, {
                    width: '280px',
                    duration: 0.5,
                    ease: 'power2.inOut',
                })
                .fromTo('.sidebar-text',
                    { opacity: 0, x: -15 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.35,
                        ease: 'power2.out',
                        stagger: 0.015,
                    }, '-=0.2');
        }
    };

    // Smooth submenu toggle
    const toggleSubmenu = (title) => {
        const submenuElement = submenuRefs.current[title];
        const isExpanding = !expandedMenus[title];

        if (submenuElement && isOpen) {
            if (isExpanding) {
                setExpandedMenus((prev) => ({ ...prev, [title]: true }));

                gsap.fromTo(submenuElement,
                    { height: 0, opacity: 0 },
                    {
                        height: 'auto',
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power3.out',
                    }
                );

                // Stagger animate submenu items
                gsap.fromTo(submenuElement.querySelectorAll('li'),
                    { opacity: 0, x: -10 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: 'power2.out',
                        delay: 0.1,
                    }
                );
            } else {
                gsap.to(submenuElement, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.in',
                    onComplete: () => {
                        setExpandedMenus((prev) => ({ ...prev, [title]: false }));
                    },
                });
            }
        }
    };

    const isActive = (path) => {
        if (location.pathname === path) return true;
        const item = menuItems.find(m => m.path === path);
        if (item?.submenu) {
            return item.submenu.some(sub => location.pathname === sub.path);
        }
        return false;
    };

    // Smooth entrance animation on mount (only once)
    useEffect(() => {
        if (!hasAnimatedEntrance && sidebarRef.current) {
            setHasAnimatedEntrance(true);

            // Set initial state immediately
            gsap.set(sidebarRef.current, { x: 0, opacity: 1 });
            gsap.set('.nav-item', { opacity: 1, x: 0 });

            const timeline = gsap.timeline();
            timeline
                .fromTo(sidebarRef.current,
                    { x: -280, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
                )
                .fromTo('.nav-item',
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
                    '-=0.3'
                );
        } else if (hasAnimatedEntrance && sidebarRef.current) {
            // Ensure visibility after animation has run
            gsap.set(sidebarRef.current, { x: 0, opacity: 1 });
            gsap.set('.nav-item', { opacity: 1, x: 0 });
        }
    }, [hasAnimatedEntrance]);

    // Responsive: handle resize
    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            const newState = !isMobile;

            if (isOpen !== newState) {
                setIsOpen(newState);
                onToggle?.(newState);

                // Animate width change on resize
                if (sidebarRef.current) {
                    gsap.to(sidebarRef.current, {
                        width: newState ? '280px' : '80px',
                        duration: 0.4,
                        ease: 'power2.inOut',
                    });

                    // Animate text visibility
                    if (!newState) {
                        gsap.to('.sidebar-text', {
                            opacity: 0,
                            x: -15,
                            duration: 0.3,
                            ease: 'power2.in',
                            stagger: 0.015,
                        });
                    } else {
                        gsap.fromTo('.sidebar-text',
                            { opacity: 0, x: -15 },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 0.35,
                                ease: 'power2.out',
                                stagger: 0.015,
                                delay: 0.2,
                            }
                        );
                    }
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen, onToggle]);

    // Auto-close sidebar on mobile when route changes
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile && isOpen) {
            setIsOpen(false);
            onToggle?.(false);

            if (sidebarRef.current) {
                gsap.to(sidebarRef.current, {
                    width: '80px',
                    duration: 0.4,
                    ease: 'power3.out',
                });
            }
        }
    }, [location.pathname]);

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && window.innerWidth < 768 && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className="fixed left-0 top-0 h-screen bg-card border-r border-border z-40 shadow-xl flex flex-col overflow-hidden"
                style={{ width: '80px' }}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-border/30">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                            AF
                        </div>
                        {isOpen && (
                            <span className="sidebar-text font-bold text-foreground text-lg whitespace-nowrap">
                                Admin Panel
                            </span>
                        )}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 flex-shrink-0"
                    >
                        {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 custom-scrollbar">
                    <ul className="space-y-1">
                        {menuItems.map((item, index) => {
                            const isItemActive = isActive(item.path);

                            return (
                                <li key={index} className="nav-item">
                                    {/* Main menu item */}
                                    {item.submenu ? (
                                        <div
                                            className="relative group"
                                            onMouseEnter={(e) => {
                                                gsap.to(e.currentTarget.querySelector('.menu-btn'), {
                                                    x: 4,
                                                    duration: 0.3,
                                                    ease: 'power2.out',
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                gsap.to(e.currentTarget.querySelector('.menu-btn'), {
                                                    x: 0,
                                                    duration: 0.3,
                                                    ease: 'power2.out',
                                                });
                                            }}
                                        >
                                            <button
                                                onClick={() => toggleSubmenu(item.title)}
                                                className={`menu-btn w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${expandedMenus[item.title] || isItemActive
                                                    ? 'text-primary bg-primary/5'
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <item.icon className="flex-shrink-0" size={20} />
                                                    {isOpen && (
                                                        <span className="sidebar-text font-medium truncate text-sm">
                                                            {item.title}
                                                        </span>
                                                    )}
                                                </div>
                                                {isOpen && (
                                                    <FiChevronDown
                                                        className={`sidebar-text flex-shrink-0 transition-transform duration-300 ${expandedMenus[item.title] ? 'rotate-180' : ''
                                                            }`}
                                                        size={16}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="relative group"
                                            onMouseEnter={(e) => {
                                                gsap.to(e.currentTarget.querySelector('.menu-btn'), {
                                                    x: 4,
                                                    duration: 0.3,
                                                    ease: 'power2.out',
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                gsap.to(e.currentTarget.querySelector('.menu-btn'), {
                                                    x: 0,
                                                    duration: 0.3,
                                                    ease: 'power2.out',
                                                });
                                            }}
                                        >
                                            <Link
                                                to={item.path}
                                                className={`menu-btn flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isItemActive
                                                    ? 'text-primary bg-primary/5'
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                                                    }`}
                                            >
                                                <item.icon className="flex-shrink-0" size={20} />
                                                {isOpen && (
                                                    <span className="sidebar-text font-medium truncate text-sm">
                                                        {item.title}
                                                    </span>
                                                )}
                                            </Link>
                                        </div>
                                    )}

                                    {/* Submenu */}
                                    {item.submenu && isOpen && (
                                        <ul
                                            ref={(el) => (submenuRefs.current[item.title] = el)}
                                            className="mt-1 ml-3 pl-6 border-l-2 border-border/30 space-y-1 overflow-hidden"
                                            style={{
                                                height: expandedMenus[item.title] ? 'auto' : 0,
                                                opacity: expandedMenus[item.title] ? 1 : 0,
                                            }}
                                        >
                                            {item.submenu.map((subitem, subindex) => {
                                                const isSubActive = location.pathname === subitem.path;

                                                return (
                                                    <li key={subindex}>
                                                        <div
                                                            onMouseEnter={(e) => {
                                                                gsap.to(e.currentTarget.querySelector('.submenu-btn'), {
                                                                    x: 4,
                                                                    duration: 0.3,
                                                                    ease: 'power2.out',
                                                                });
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                gsap.to(e.currentTarget.querySelector('.submenu-btn'), {
                                                                    x: 0,
                                                                    duration: 0.3,
                                                                    ease: 'power2.out',
                                                                });
                                                            }}
                                                        >
                                                            <Link
                                                                to={subitem.path}
                                                                className={`submenu-btn sidebar-text flex items-center px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${isSubActive
                                                                    ? 'text-primary bg-primary/5 font-medium'
                                                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                                                                    }`}
                                                            >
                                                                <span className="truncate">{subitem.title}</span>
                                                            </Link>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="h-16 border-t border-border/30 flex items-center px-6">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                            JD
                        </div>
                        {isOpen && (
                            <div className="sidebar-text min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                    John Doe
                                </p>
                                <p className="text-xs text-muted-foreground truncate">Admin</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;