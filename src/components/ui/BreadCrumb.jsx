import { useRef, useEffect } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

export default function AdminBreadcrumb({
    title,
    items = [],
    currentPage,
    backText = "Back",
    showBack = false,
    className = "",
}) {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!hasAnimated.current && containerRef.current) {
            hasAnimated.current = true;

            gsap.fromTo(
                containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={`
                sticky top-0 z-10
                border-b bg-background/95 backdrop-blur-sm
                supports-[backdrop-filter]:bg-background/80
                ${className}
            `}
        >
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Left - Back + Title */}
                <div className="flex items-center gap-3 min-w-0">
                    {showBack && (
                        <>
                            <button
                                onClick={() => navigate(-1)}
                                className="
                                    flex items-center gap-1.5 
                                    px-2.5 py-1.5 rounded-md text-sm
                                    text-muted-foreground hover:text-foreground
                                    hover:bg-muted/50 
                                    transition-colors duration-200
                                    focus-visible:outline-none focus-visible:ring-2 
                                    focus-visible:ring-primary focus-visible:ring-offset-2
                                    focus-visible:ring-offset-background
                                    flex-shrink-0
                                "
                                aria-label="Go back"
                            >
                                <IoChevronBack size={18} />
                                <span className="hidden sm:inline">{backText}</span>
                            </button>
                            <div className="h-6 w-px bg-border hidden sm:block" />
                        </>
                    )}

                    <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                        {title}
                    </h1>
                </div>

                {/* Right - Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="overflow-x-auto scrollbar-hide">
                    <ol className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-center gap-1.5">
                                {index > 0 && (
                                    <IoChevronForward
                                        size={14}
                                        className="text-muted-foreground/60 flex-shrink-0"
                                    />
                                )}

                                {item.href ? (
                                    <Link
                                        to={item.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-muted-foreground">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        ))}

                        {/* Current page */}
                        <li className="flex items-center gap-1.5">
                            {items.length > 0 && (
                                <IoChevronForward
                                    size={14}
                                    className="text-muted-foreground/60 flex-shrink-0"
                                />
                            )}
                            <span className="font-medium text-foreground">
                                {currentPage || items[items.length - 1]?.label || title}
                            </span>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    );
}