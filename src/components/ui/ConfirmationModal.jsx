// src/components/ui/ConfirmationModal.jsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import {
    FiAlertTriangle,
    FiCheckCircle,
    FiInfo,
    FiAlertCircle,
} from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    type = 'warning', // 'warning', 'danger', 'success', 'info'
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmButtonVariant = 'primary', // 'primary', 'danger', 'success'
    showCancelButton = true,
    loading = false,
}) => {
    const overlayRef = useRef(null);
    const modalRef = useRef(null);
    const isAnimating = useRef(false);

    // Icon based on type
    const icons = {
        warning: {
            icon: FiAlertTriangle,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20',
        },
        danger: {
            icon: FiAlertCircle,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
        },
        success: {
            icon: FiCheckCircle,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
        },
        info: {
            icon: FiInfo,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
        },
    };

    const IconComponent = icons[type]?.icon || FiAlertTriangle;
    const iconColor = icons[type]?.color || 'text-yellow-500';
    const iconBgColor = icons[type]?.bgColor || 'bg-yellow-500/10';
    const iconBorderColor = icons[type]?.borderColor || 'border-yellow-500/20';

    // Button variants
    const buttonVariants = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
    };

    // Animate modal open
    useEffect(() => {
        if (isOpen && overlayRef.current && modalRef.current) {
            // Prevent body scroll
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            isAnimating.current = true;

            // Animate overlay
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.2, ease: 'power2.out' }
            );

            // Animate modal
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.9, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'back.out(1.5)',
                    onComplete: () => {
                        isAnimating.current = false;
                    }
                }
            );
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e) => {
            if (e.key === 'Escape' && !isAnimating.current) {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    // Handle close with animation
    const handleClose = () => {
        if (isAnimating.current || loading) return;
        isAnimating.current = true;

        if (modalRef.current && overlayRef.current) {
            // Animate modal out
            gsap.to(modalRef.current, {
                opacity: 0,
                scale: 0.9,
                y: 20,
                duration: 0.2,
                ease: 'power2.in',
            });

            // Animate overlay out
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    isAnimating.current = false;
                    onClose();
                },
            });
        } else {
            isAnimating.current = false;
            onClose();
        }
    };

    // Handle confirm with animation
    const handleConfirm = async () => {
        if (loading || isAnimating.current) return;

        if (onConfirm) {
            await onConfirm();
        }
        handleClose();
    };

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (overlayRef.current === e.target && !isAnimating.current && !loading) {
            handleClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
        >
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                onClick={handleOverlayClick}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className="relative w-full max-w-md bg-card rounded-lg border border-border shadow-2xl"
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    disabled={loading}
                    className="
                        absolute top-4 right-4 p-1.5 rounded-lg 
                        text-muted-foreground hover:text-foreground
                        hover:bg-muted/50
                        transition-all duration-200 
                        focus:outline-none focus:ring-2 focus:ring-primary/20
                        disabled:opacity-50 disabled:cursor-not-allowed
                        z-10
                    "
                >
                    <IoClose size={20} />
                </button>

                {/* Content */}
                <div className="px-6 py-6">
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div
                            className={`
                                w-14 h-14 rounded-full 
                                ${iconBgColor} 
                                border ${iconBorderColor}
                                flex items-center justify-center
                            `}
                        >
                            <IconComponent className={iconColor} size={28} />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-card-foreground text-center mb-2">
                        {title}
                    </h3>

                    {/* Message */}
                    <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
                        {message}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                        {showCancelButton && (
                            <button
                                onClick={handleClose}
                                disabled={loading}
                                className="
                                    flex-1 px-4 py-2.5 rounded-lg 
                                    text-sm font-medium
                                    border border-border
                                    bg-secondary text-foreground
                                    hover:bg-muted
                                    transition-all duration-200 
                                    focus:outline-none focus:ring-2 focus:ring-primary/20
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                "
                            >
                                {cancelText}
                            </button>
                        )}
                        <button
                            onClick={handleConfirm}
                            disabled={loading}
                            className={`
                                flex-1 px-4 py-2.5 rounded-lg 
                                text-sm font-medium
                                transition-all duration-200 
                                focus:outline-none focus:ring-2 focus:ring-primary/20
                                disabled:opacity-50 disabled:cursor-not-allowed
                                ${buttonVariants[confirmButtonVariant]} 
                                ${loading ? 'cursor-wait' : ''}
                            `}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                confirmText
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render modal using Portal at document body level
    return createPortal(modalContent, document.body);
};

export default ConfirmationModal;