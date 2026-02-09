import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
    const { logout, authUser, isLoggingOut } = useAuthStore();

    return (
        <header className="navbar bg-base-100 shadow-md px-4">
            {/* Left */}
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    <span className="text-primary">Chat</span>App
                </Link>
            </div>

            {/* Right */}
            {authUser && (
                <div className="flex items-center gap-2">
                    {/* Profile */}
                    <Link
                        to="/profile"
                        className="btn btn-ghost btn-circle tooltip tooltip-bottom"
                        data-tip="Profile"
                    >
                        <User className="w-5 h-5" />
                    </Link>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        disabled={isLoggingOut}
                        className="btn btn-ghost btn-circle tooltip tooltip-bottom text-error"
                        data-tip="Logout"
                    >
                        {isLoggingOut ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            <LogOut className="w-5 h-5" />
                        )}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
