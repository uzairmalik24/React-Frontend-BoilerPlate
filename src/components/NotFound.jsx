import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

export default function NotFound() {

    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-5">
            <div className="text-center space-y-8 max-w-md w-full">
                <h1 className="text-8xl sm:text-9xl font-black text-primary/30 tracking-tight select-none">
                    404
                </h1>

                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                    Page Not Found
                </h2>

                <p className="text-xl text-muted-foreground leading-relaxed">
                    Sorry, we couldn't find that page.
                </p>

                <div className="pt-6">
                    <Link
                        onClick={() => navigate(-1)}
                        className="
              inline-flex items-center gap-2 
              px-10 py-4 
              bg-primary text-primary-foreground 
              rounded-xl 
              text-lg font-medium
              hover:bg-primary/90 
              transition-all 
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary/40
            "
                    >
                        <FaArrowLeft className="text-xl" />
                        Back to previous page
                    </Link>
                </div>
            </div>
        </div>
    );
}