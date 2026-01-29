import { Link } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
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
                {/* 1️⃣ Settings */}
                <button className="btn btn-ghost btn-circle">
                    <Settings className="w-5 h-5" />
                </button>

                {authUser && (
                    <>
                        {/* 2️⃣ Profile */}
                        <Link to="/profile" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                <User />
                            </div>
                        </Link>

                        {/* 3️⃣ Logout */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="btn btn-ghost flex items-center gap-2 text-error"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;