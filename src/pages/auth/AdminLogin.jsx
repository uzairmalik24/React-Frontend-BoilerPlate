import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useApi } from '../../hooks/useApi';
import { toast } from 'toasticom';
import { useNavigate } from 'react-router-dom';
import { setAdminToken } from '../../store/slices/AdminSlice';
import { useDispatch } from 'react-redux';
import { TextInput, PasswordInput, CheckboxInput } from '../../components/ui/FormInputs';


const AdminLogin = () => {
    const [form, setForm] = useState({
        email: 'admin@gmail.com',
        password: '12345678',
        rememberMe: false,
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { post, isLoading, error, clearError } = useApi();
    const dispatch = useDispatch();

    const logoRef = useRef(null);
    const headingRef = useRef(null);
    const cardRef = useRef(null);
    const formRef = useRef(null);
    const footerRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Logo animation with rotation and scale
        tl.fromTo(
            logoRef.current,
            { scale: 0, rotation: -180, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
        );

        // Heading animation
        tl.fromTo(
            headingRef.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
            '-=0.4'
        );

        // Card animation with scale
        tl.fromTo(
            cardRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7 },
            '-=0.3'
        );

        // Form fields animation with stagger
        tl.fromTo(
            formRef.current.children,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
            '-=0.4'
        );

        // Footer animation
        tl.fromTo(
            footerRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.2'
        );

        // Continuous floating animation for logo
        gsap.to(logoRef.current, {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Subtle pulse animation for primary button
        gsap.to(buttonRef.current, {
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Login attempt:', form);

            // const resp = await post('/admin/login', form, { showSuccessToast: false });
            // console.log(resp);

            // if (resp.data.isSuccess) {
                toast('success', 'Login successful');
                // dispatch(setAdminToken(resp.data.token));
                navigate('/dashboard');
            // }

            // Button click animation
            gsap.to(buttonRef.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        } else {
            // Shake animation on error
            gsap.to(cardRef.current, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.4,
                ease: 'power2.inOut'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div
                        ref={logoRef}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-2xl font-bold shadow-lg shadow-primary/20 mb-6 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                        <span className="relative">AF</span>
                    </div>
                    <div ref={headingRef}>
                        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Sign in to access your admin portal
                        </p>
                    </div>
                </div>

                {/* Login Card */}
                <div
                    ref={cardRef}
                    className="bg-card/80 backdrop-blur-xl text-card-foreground rounded-2xl border border-border/50 shadow-2xl shadow-black/5 overflow-hidden"
                >
                    <div className="p-8">
                        <div className="space-y-5">
                            <div ref={formRef} className="space-y-5">
                                {/* Email */}
                                <TextInput
                                    label="Email Address"
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    error={errors.email}
                                    required
                                    autoFocus
                                />

                                {/* Password */}
                                <PasswordInput
                                    label="Password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    error={errors.password}
                                    required
                                />

                                {/* Remember & Forgot */}
                                <div className="flex items-center justify-between pt-1">
                                    <CheckboxInput
                                        label="Remember me"
                                        checked={form.rememberMe}
                                        onChange={(e) =>
                                            setForm({ ...form, rememberMe: e.target.checked })
                                        }
                                    />

                                    <a
                                        href="#"
                                        className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                                    >
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <button
                                    ref={buttonRef}
                                    onClick={handleSubmit}
                                    className="
                                        w-full bg-gradient-to-r from-primary to-primary/90
                                        text-primary-foreground 
                                        hover:shadow-lg hover:shadow-primary/25
                                        py-3 rounded-xl font-medium
                                        transition-all duration-300
                                        transform hover:scale-[1.01]
                                        active:scale-[0.99]
                                        relative overflow-hidden
                                        group
                                        mt-6
                                    "
                                >
                                    <span className="relative z-10">Sign In</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Alternative actions */}
                    <div className="px-8 py-5 bg-muted/20 border-t border-border/30 text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <a
                                href="#"
                                className="text-primary font-semibold hover:text-primary/80 transition-colors"
                            >
                                Create one
                            </a>
                        </p>
                    </div>
                </div>

                {/* Security note */}
                <div
                    ref={footerRef}
                    className="flex items-center justify-center gap-2 mt-8 text-xs text-muted-foreground/60"
                >
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                        <span>Secured with encryption</span>
                    </div>
                    <span>•</span>
                    <span>Admin access only</span>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;