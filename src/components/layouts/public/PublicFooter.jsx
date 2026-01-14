// src/components/layout/PublicFooter.jsx
import { Link } from 'react-router-dom';

const PublicFooter = () => {
    return (
        <footer className="
      border-t border-border 
      bg-background/80 
      backdrop-blur-sm 
      mt-auto
    ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand & Description */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="
                flex h-10 w-10 
                items-center justify-center 
                rounded-lg 
                bg-primary 
                text-primary-foreground 
                font-bold text-2xl
              ">
                                AF
                            </div>
                            <span className="font-semibold text-xl tracking-tight text-foreground">
                                AdminFlow
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-md">
                            Modern admin dashboard solution built for speed, scalability,
                            and exceptional user experience.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-medium text-foreground mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link to="/features" className="hover:text-foreground transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="hover:text-foreground transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/docs" className="hover:text-foreground transition-colors">
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-medium text-foreground mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link to="/about" className="hover:text-foreground transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="hover:text-foreground transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="
          mt-12 pt-8 
          border-t border-border 
          flex flex-col sm:flex-row 
          justify-between items-center 
          gap-4 
          text-sm text-muted-foreground
        ">
                    <div>
                        © {new Date().getFullYear()} AdminFlow. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-foreground transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-foreground transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;