'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signIn, signInWithGoogle } from '@/lib/firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import Image from "next/image";
import imageLogin from "@/assets/login3.jpg";
import googleIcon from "@/assets/google.png"
import { withPublicRoute } from '@/utils/routeProtection';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const { user, error: signInError } = await signIn(
        formData.email,
        formData.password
      );

      if (signInError) {
        setError(signInError);
        return;
      }

      if (user) {
        // Successful login
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const { user, error: signInError } = await signInWithGoogle();

      if (signInError) {
        setError(signInError);
        return;
      }

      if (user) {
        router.push('/');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'An error occurred during Google sign-in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden lg:block w-1/2 bg-neutral-100 relative">
        <Image 
          src={imageLogin}
          alt="Fashion Icon"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-8 left-8">
          <h1 className="text-white text-2xl font-medium tracking-widest">STYLEDNA</h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <nav className="p-8 flex justify-between items-center">
          <div className="lg:hidden">
            <h1 className="text-2xl font-light tracking-widest">STYLEDNA</h1>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/working" className="text-sm tracking-wide">Shop</Link>
            <Link href="/working" className="text-sm tracking-wide">About</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/register" className="text-sm tracking-wide">Sign Up</Link>
            <Link href="/working" className="text-sm tracking-wide">Bag</Link>
          </div>
        </nav>

        <div className="flex-grow flex items-center justify-center px-8 lg:px-16 pb-16">
          <motion.div 
            className="w-full max-w-md space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-2xl font-light mb-2">LOGIN</h2>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="px-2 w-full border-b border-gray-200 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-0"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="px-2 w-full border-b border-gray-200 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="forgot-password" className="text-sm underline">
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 text-sm tracking-widest hover:bg-gray-900 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full border border-gray-200 py-4 text-sm tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Image 
                  src={googleIcon}
                  alt="Google" 
                  className="w-5 h-5"
                />
                <span>Continue with Google</span>
              </button>
            </form>

            <div className="pt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/register" className="underline">
                  Create one
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default withPublicRoute(LoginForm);