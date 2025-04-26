import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 fixed w-full top-0 z-40 backdrop-blur-lg text-white shadow-md">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-center h-full space-x-8">

          {/* Centered: Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all">
            <div className="size-10 rounded-lg bg-indigo-600/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-xl font-bold text-white">TTYL</h1>
          </Link>

          {/* Centered: Navigation */}
          <div className="flex items-center gap-4">
            <Link
              to="/settings"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-600/30 transition"
            >
              <Settings className="w-5 h-5 text-indigo-300" />
              <span className="hidden sm:inline text-white">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-600/30 transition"
                >
                  <User className="w-5 h-5 text-indigo-300" />
                  <span className="hidden sm:inline text-white">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-600/30 transition text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
