// src/components/ui/Modal.jsx
import { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import gsap from 'gsap';

export const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    children,
    submitText = 'Submit',
    cancelText = 'Cancel',
    showFooter = true,
    showCancel = true,
    size = 'md', // sm, md, lg, xl
    closeOnOverlayClick = true,
    submitDisabled = false,
}) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const isAnimating = useRef(false);

    // Size classes
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    // Animate modal open
    useEffect(() => {
        if (isOpen && modalRef.current && overlayRef.current) {
            document.body.style.overflow = 'hidden';
            isAnimating.current = true;

            // Animate overlay
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                }
            );

            // Animate modal
            gsap.fromTo(
                modalRef.current,
                {
                    opacity: 0,
                    scale: 0.9,
                    y: 20
                },
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
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen && !isAnimating.current) {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Animated close function
    const handleClose = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        // Animate modal out
        gsap.to(modalRef.current, {
            opacity: 0,
            scale: 0.9,
            y: 20,
            duration: 0.2,
            ease: 'power2.in'
        });

        // Animate overlay out
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                isAnimating.current = false;
                onClose();
            }
        });
    };

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && overlayRef.current === e.target && !isAnimating.current) {
            handleClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
            <div
                ref={modalRef}
                className={`
                    relative w-full ${sizeClasses[size]}
                    bg-card border border-border rounded-lg shadow-2xl
                    flex flex-col max-h-[90vh]
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border">
                    <h2 className="text-xl font-semibold text-card-foreground">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="
                            flex-shrink-0 p-1.5 rounded-lg
                            text-muted-foreground hover:text-foreground
                            hover:bg-muted/50
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary/20
                        "
                    >
                        <IoClose size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {children}
                </div>

                {/* Footer */}
                {showFooter && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
                        {showCancel && (
                            <button
                                type="button"
                                onClick={handleClose}
                                className="
                                    px-4 py-2 rounded-lg
                                    text-sm font-medium
                                    text-foreground bg-secondary
                                    border border-border
                                    hover:bg-muted
                                    transition-all duration-200
                                    focus:outline-none focus:ring-2 focus:ring-primary/20
                                "
                            >
                                {cancelText}
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={submitDisabled}
                            className="
                                px-4 py-2 rounded-lg
                                text-sm font-medium
                                text-primary-foreground bg-primary
                                hover:bg-primary/90
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-primary/20
                            "
                        >
                            {submitText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Example usage:
/*
const [isOpen, setIsOpen] = useState(false);

// Simple text modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={() => {
    console.log('Submitted!');
    setIsOpen(false);
  }}
  title="Confirm Action"
>
  <p className="text-foreground/80">
    Are you sure you want to proceed with this action?
  </p>
</Modal>

// Form modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={handleFormSubmit}
  title="Create New Item"
  submitText="Create"
  size="lg"
>
  <form className="space-y-4">
    <TextInput
      label="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <TextareaInput
      label="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </form>
</Modal>
*/