// src/components/layout/PublicNavbar.jsx
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../store';
import { Link } from 'react-router-dom';
import {
    FaBars,
    FaTimes,
    FaSun,
    FaMoon
} from 'react-icons/fa';
import gsap from 'gsap';

const PublicNavbar = () => {
    const dispatch = useDispatch();
    const { current: theme } = useSelector((state) => state.theme);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Refs for GSAP animations
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    const authButtonsRef = useRef(null);
    const themeButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    // Initial entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            tl.from(navbarRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.6,
            })
                .from(logoRef.current, {
                    opacity: 0,
                    x: -10,
                    duration: 0.4,
                }, '-=0.3')
                .from(navLinksRef.current, {
                    opacity: 0,
                    y: -5,
                    stagger: 0.05,
                    duration: 0.4,
                }, '-=0.3')
                .from([themeButtonRef.current, authButtonsRef.current], {
                    opacity: 0,
                    duration: 0.4,
                }, '-=0.3');
        });

        return () => ctx.revert();
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (mobileMenuRef.current) {
            if (isMenuOpen) {
                gsap.fromTo(
                    mobileMenuRef.current,
                    { height: 0, opacity: 0 },
                    {
                        height: 'auto',
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    }
                );

                gsap.from(mobileMenuRef.current.querySelectorAll('a, .mobile-auth-section'), {
                    x: -20,
                    opacity: 0,
                    stagger: 0.08,
                    duration: 0.3,
                    delay: 0.1,
                    ease: 'power2.out',
                });
            } else {
                gsap.to(mobileMenuRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                });
            }
        }
    }, [isMenuOpen]);

    // Theme toggle animation
    const handleThemeToggle = () => {
        gsap.to(themeButtonRef.current, {
            rotation: '+=180',
            duration: 0.4,
            ease: 'power2.inOut',
        });
        dispatch(toggleTheme());
    };

    // Hover animations for nav links
    const handleNavLinkHover = (e, isEntering) => {
        gsap.to(e.currentTarget, {
            color: isEntering ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
            duration: 0.2,
            ease: 'power1.out',
        });
    };

    // Hover animation for buttons
    const handleButtonHover = (e, isEntering) => {
        gsap.to(e.currentTarget, {
            opacity: isEntering ? 0.9 : 1,
            duration: 0.2,
            ease: 'power1.out',
        });
    };

    return (
        <header
            ref={navbarRef}
            className="
                sticky top-0 z-50 w-full
                border-b border-border
                bg-background/80 backdrop-blur-md
                transition-colors duration-300
            "
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    to="/"
                    ref={logoRef}
                    className="flex items-center gap-2.5"
                >
                    <div className="
                        flex h-9 w-9 items-center justify-center
                        rounded-lg bg-primary text-primary-foreground
                        font-bold text-xl
                    ">
                        AF
                    </div>
                    <span className="
                        font-semibold text-lg tracking-tight
                        text-foreground
                    ">
                        AdminFlow
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            ref={(el) => (navLinksRef.current[index] = el)}
                            className="
                                text-sm font-medium
                                text-muted-foreground
                                hover:text-foreground
                                transition-colors duration-200
                            "
                            onMouseEnter={(e) => handleNavLinkHover(e, true)}
                            onMouseLeave={(e) => handleNavLinkHover(e, false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Right side - Theme + Auth buttons */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        ref={themeButtonRef}
                        onClick={handleThemeToggle}
                        className="
                            p-2 rounded-md
                            text-muted-foreground
                            hover:bg-muted hover:text-foreground
                            transition-colors duration-200
                        "
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <FaSun className="h-5 w-5" />
                        ) : (
                            <FaMoon className="h-5 w-5" />
                        )}
                    </button>

                    {/* Auth buttons - Desktop */}
                    <div
                        ref={authButtonsRef}
                        className="hidden md:flex items-center gap-3"
                    >
                        <Link
                            to="/login"
                            className="
                                text-sm font-medium
                                text-muted-foreground
                                hover:text-foreground
                                transition-colors
                            "
                            onMouseEnter={(e) => handleButtonHover(e, true)}
                            onMouseLeave={(e) => handleButtonHover(e, false)}
                        >
                            Log in
                        </Link>

                        <Link
                            to="/login"
                            className="
                                inline-flex items-center justify-center
                                rounded-md bg-primary px-5 py-2.5
                                text-sm font-medium text-primary-foreground
                                shadow-sm hover:bg-primary/90
                                transition-colors duration-200
                            "
                            onMouseEnter={(e) => handleButtonHover(e, true)}
                            onMouseLeave={(e) => handleButtonHover(e, false)}
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-muted"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <FaTimes className="h-6 w-6" />
                        ) : (
                            <FaBars className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="
                        md:hidden border-t border-border
                        bg-background
                        py-5 px-4
                        overflow-hidden
                    "
                >
                    <nav className="flex flex-col gap-5">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="
                                    text-base font-medium
                                    text-muted-foreground
                                    hover:text-foreground
                                    transition-colors
                                "
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="mobile-auth-section pt-4 border-t border-border flex flex-col gap-4">
                            <Link
                                to="/login"
                                className="
                                    text-base font-medium text-muted-foreground
                                    hover:text-foreground transition-colors
                                "
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Log in
                            </Link>

                            <Link
                                to="/login"
                                className="
                                    inline-flex justify-center
                                    rounded-md bg-primary px-5 py-3
                                    text-base font-medium text-primary-foreground
                                    hover:bg-primary/90 transition-colors
                                "
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default PublicNavbar;