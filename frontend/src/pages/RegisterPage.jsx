import React, { useState } from 'react'; 
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare, User, Mail, EyeOff, Eye, Lock, Loader2 } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    namn: "",
    email: "",
    password: "",
  });

  const { register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.namn.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) register(formData);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-800 p-8 rounded-2xl shadow-lg border border-gray-700 backdrop-blur-xl bg-opacity-30">

        {/* Logotyp + text */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-indigo-600/20 flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
              <MessageSquare className="size-6 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold mt-2 text-indigo-300">Create Account</h1>
            <p className="text-sm text-gray-400">Start your journey</p>
          </div>
        </div>

        {/* Formulär */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Namn */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">Full Name</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="input input-bordered w-full pl-10 bg-transparent border-gray-600 text-white placeholder-gray-400"
                placeholder="Your name"
                value={formData.namn}
                onChange={(e) => setFormData({ ...formData, namn: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                className="input input-bordered w-full pl-10 bg-transparent border-gray-600 text-white placeholder-gray-400"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10 bg-transparent border-gray-600 text-white placeholder-gray-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2" disabled={isRegistering}>
            {isRegistering ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center pt-6">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
