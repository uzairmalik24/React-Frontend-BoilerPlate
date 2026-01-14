import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaRocket,
    FaShieldAlt,
    FaChartLine,
    FaUsersCog,
    FaMoon,
    FaDesktop,
    FaArrowRight,
    FaCheck
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: FaShieldAlt,
        title: "Enterprise-Grade Security",
        description: "Role-based access control, audit logs, two-factor authentication, and data encryption by default."
    },
    {
        icon: FaRocket,
        title: "Lightning Fast Performance",
        description: "Built with Vite + React 19, optimized data fetching, and lazy loading out of the box."
    },
    {
        icon: FaChartLine,
        title: "Powerful Analytics",
        description: "Real-time dashboards, customizable reports, and beautiful data visualization components."
    },
    {
        icon: FaUsersCog,
        title: "Team & User Management",
        description: "Invite team members, manage permissions, track activity, and maintain full control."
    },
    {
        icon: FaMoon,
        title: "Perfect Dark & Light Mode",
        description: "Seamless theme switching with system preference detection and smooth transitions."
    },
    {
        icon: FaDesktop,
        title: "Fully Responsive Design",
        description: "Works beautifully on desktop, tablet, and mobile — built with modern Tailwind utilities."
    },
];

const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Uptime", value: "99.9%" },
    { label: "Countries", value: "50+" },
    { label: "Support", value: "24/7" }
];

const Home = () => {
    const heroRef = useRef(null);
    const featuresRef = useRef([]);
    const statsRef = useRef([]);
    const ctaRef = useRef(null);

    useEffect(() => {
        // Hero animation
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(
            heroElements,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            }
        );

        // Stats animation
        gsap.fromTo(
            statsRef.current,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: statsRef.current[0],
                    start: 'top 80%',
                }
            }
        );

        // Features animation
        featuresRef.current.forEach((feature, index) => {
            if (feature) {
                gsap.fromTo(
                    feature,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: feature,
                            start: 'top 85%',
                        }
                    }
                );
            }
        });

        // CTA animation
        gsap.fromTo(
            ctaRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    return (
        <div className="bg-background text-foreground overflow-hidden">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-6xl mx-auto text-center">
                    {/* Badge */}
                    <div className="hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm text-muted-foreground font-medium">Production Ready</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="hero-animate text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
                        Modern Admin Panel
                        <br />
                        <span className="text-primary">
                            Built for Real Work
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-animate text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                        Clean, fast, professional admin dashboard solution.
                        <br className="hidden sm:block" />
                        Everything you need — nothing you don't.
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link
                             to='/login'
                            className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:opacity-90 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-primary/20"
                        >
                            Start Free Trial
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                        </Link>

                        <Link
                             to='/login'
                            className="inline-flex items-center justify-center bg-secondary text-secondary-foreground border border-border hover:bg-muted px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                        >
                            Log In
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="hero-animate grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                ref={(el) => (statsRef.current[index] = el)}
                                className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors"
                            >
                                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary border-y border-border">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                            Built for Productivity
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                            Professional features focused on real admin panel needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                ref={(el) => (featuresRef.current[index] = el)}
                                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                                    <feature.icon className="h-7 w-7 text-primary" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3 text-foreground">
                                    {feature.title}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover indicator */}
                                <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <FaArrowRight className="text-primary-foreground" size={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            Why Teams Choose Us
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Built with modern standards and best practices
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            { title: "Clean Architecture", items: ["Component-based structure", "Type-safe codebase", "Modular design system"] },
                            { title: "Developer Experience", items: ["Hot module replacement", "Instant feedback", "Clear documentation"] },
                            { title: "Performance First", items: ["Optimized bundle size", "Lazy loading", "Efficient rendering"] },
                            { title: "Production Ready", items: ["Error boundaries", "Logging system", "SEO optimized"] }
                        ].map((section, index) => (
                            <div
                                key={index}
                                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-colors"
                            >
                                <h3 className="text-xl font-bold mb-6 text-foreground">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <FaCheck className="text-primary" size={10} />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section ref={ctaRef} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary border-t border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                        Ready to manage better?
                    </h2>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-12">
                        Join teams who already chose efficiency and clarity.
                    </p>

                    <Link
                        to='/login'
                        className="group inline-flex items-center gap-3 bg-primary text-primary-foreground hover:opacity-90 px-12 py-6 rounded-xl text-xl font-semibold shadow-lg shadow-primary/20 transition-all duration-300"
                    >
                        Create Your Dashboard Now
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </Link>

                    <p className="text-sm text-muted-foreground mt-6">
                        No credit card required • 14-day free trial
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;