import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

function LoginPage() {
  const [visaPass, setVisaPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggarIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-800 p-8 rounded-2xl shadow-lg border border-gray-700 backdrop-blur-xl bg-opacity-30">

        {/* Logo och rubrik */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold mt-2 text-indigo-300">Welcome Back</h1>
            <p className="text-sm text-gray-400">Sign in to your account</p>
          </div>
        </div>

        {/* Inloggningsformulär */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
                type={visaPass ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10 bg-transparent border-gray-600 text-white placeholder-gray-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setVisaPass(!visaPass)}
              >
                {visaPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2" disabled={isLoggarIn}>
            {isLoggarIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Länk till registreringssida */}
        <div className="text-center pt-6">
          <p className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-400 font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
