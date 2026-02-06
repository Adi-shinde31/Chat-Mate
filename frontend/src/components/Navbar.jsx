import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="navbar bg-base-100 shadow-md px-4">
            {/* Left */}
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    <span className="text-primary">Chat</span>App
                </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                {authUser && (
                    <>
                        {/* Logout */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="btn btn-ghost flex items-center gap-2 text-error"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>

                        {/* Profile */}
                        <Link to="/profile" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                <User />
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;