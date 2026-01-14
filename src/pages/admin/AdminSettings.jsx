// src/pages/admin/Settings.jsx
import { useState, useRef, useEffect } from 'react';
import { FaCamera, FaUser, FaLock, FaSave } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { PasswordInput, TextInput } from '../../components/ui/FormInputs';
import AdminBreadcrumb from '../../components/ui/BreadCrumb';
import gsap from 'gsap';

const AdminSettings = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@adminflow.com',
        role: 'Administrator',
        profileImage: null,
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fileInputRef = useRef(null);
    const profileSectionRef = useRef(null);
    const passwordSectionRef = useRef(null);
    const imageContainerRef = useRef(null);
    const successRef = useRef(null);

    // GSAP entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(profileSectionRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: 'power2.out',
            });

            gsap.from(passwordSectionRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: 0.1,
                ease: 'power2.out',
            });
        });

        return () => ctx.revert();
    }, []);

    // Success message animation
    useEffect(() => {
        if (successMessage && successRef.current) {
            gsap.fromTo(
                successRef.current,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
            );

            const timer = setTimeout(() => {
                gsap.to(successRef.current, {
                    opacity: 0,
                    y: -10,
                    duration: 0.2,
                    onComplete: () => setSuccessMessage(''),
                });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, image: 'Image size should be less than 5MB' });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setProfileData({ ...profileData, profileImage: file });
                setErrors({ ...errors, image: null });

                // GSAP animation for image change
                if (imageContainerRef.current) {
                    gsap.fromTo(
                        imageContainerRef.current,
                        { scale: 0.8, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
                    );
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('Profile updated successfully!');
        }, 1000);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!passwordData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!passwordData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (passwordData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setSuccessMessage('Password updated successfully!');
        }, 1000);
    };

    return (
        <>
            {/* Breadcrumb */}
            <AdminBreadcrumb
                title="Settings"
                items={[{ label: 'Dashboard', href: '/dashboard' }]}
                currentPage="Settings"
                showBack={true}
            />

            <div className="p-4 sm:p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Success Message */}
                    {successMessage && (
                        <div
                            ref={successRef}
                            className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3"
                        >
                            <IoCheckmarkCircle className="text-green-500 text-xl flex-shrink-0" />
                            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                                {successMessage}
                            </p>
                        </div>
                    )}

                    {/* Profile Settings */}
                    <div
                        ref={profileSectionRef}
                        className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
                    >
                        <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <FaUser className="text-primary text-lg" />
                                </div>
                                <h2 className="text-lg font-semibold text-card-foreground">
                                    Profile Information
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleProfileSubmit} className="p-4 sm:p-6">
                            {/* Profile Image Upload */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                                <div className="flex flex-col items-center gap-3">
                                    <div
                                        ref={imageContainerRef}
                                        className="relative group cursor-pointer"
                                        onClick={handleImageClick}
                                    >
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-border bg-muted flex items-center justify-center">
                                            {previewImage ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <FaUser className="text-4xl sm:text-5xl text-muted-foreground" />
                                            )}
                                        </div>

                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                            <FaCamera className="text-white text-xl sm:text-2xl" />
                                        </div>
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleImageClick}
                                        className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                    >
                                        Change Photo
                                    </button>

                                    {errors.image && (
                                        <p className="text-xs text-red-600 dark:text-red-400 text-center">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>

                                <div className="flex-1 w-full space-y-4">
                                    <TextInput
                                        label="Name"
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, name: e.target.value })
                                        }
                                        placeholder="Enter your name"
                                        required
                                    />

                                    <TextInput
                                        label="Email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, email: e.target.value })
                                        }
                                        placeholder="Enter your email"
                                        required
                                    />

                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.role}
                                            disabled
                                            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-muted-foreground cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-border">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                                >
                                    <FaSave />
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Password Settings */}
                    <div
                        ref={passwordSectionRef}
                        className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
                    >
                        <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <FaLock className="text-primary text-lg" />
                                </div>
                                <h2 className="text-lg font-semibold text-card-foreground">
                                    Change Password
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="p-4 sm:p-6 space-y-4">
                            <PasswordInput
                                label="Current Password"
                                value={passwordData.currentPassword}
                                onChange={(e) => {
                                    setPasswordData({ ...passwordData, currentPassword: e.target.value });
                                    if (errors.currentPassword) {
                                        setErrors({ ...errors, currentPassword: '' });
                                    }
                                }}
                                error={errors.currentPassword}
                                placeholder="Enter current password"
                                required
                            />

                            <PasswordInput
                                label="New Password"
                                value={passwordData.newPassword}
                                onChange={(e) => {
                                    setPasswordData({ ...passwordData, newPassword: e.target.value });
                                    if (errors.newPassword) {
                                        setErrors({ ...errors, newPassword: '' });
                                    }
                                }}
                                error={errors.newPassword}
                                placeholder="Enter new password"
                                required
                            />

                            <PasswordInput
                                label="Confirm New Password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => {
                                    setPasswordData({ ...passwordData, confirmPassword: e.target.value });
                                    if (errors.confirmPassword) {
                                        setErrors({ ...errors, confirmPassword: '' });
                                    }
                                }}
                                error={errors.confirmPassword}
                                placeholder="Confirm new password"
                                required
                            />

                            <div className="pt-2">
                                <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        <strong className="text-foreground">Password requirements:</strong> Must be at least 8 characters long and include a mix of letters, numbers, and special characters.
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                                    >
                                        <FaLock />
                                        {isLoading ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSettings;