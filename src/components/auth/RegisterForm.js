'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signUp, signInWithGoogle } from '@/lib/firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import Image from "next/image";
import imageLogin from "@/assets/login1.png";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    terms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.terms) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    setLoading(true);
    const { result, error } = await signUp(formData.email, formData.password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden lg:block w-1/2 bg-neutral-100 relative">
      <Image
          src={imageLogin}
          alt="Luxury Fashion Items"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-8 left-8 font-bold">
          <h1 className="text-2xl font-medium tracking-widest ">STYLEDNA</h1>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <nav className="p-8 flex justify-between items-center">
          <div className="lg:hidden">
            <h1 className="text-2xl font-light tracking-widest">STYLEDNA</h1>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/women" className="text-sm tracking-wide">Shop</Link>
            <Link href="/about" className="text-sm tracking-wide">About</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-sm tracking-wide">Login</Link>
          </div>
        </nav>

        <div className="flex-grow flex items-center justify-center px-8 lg:px-16">
          <motion.div 
            className="w-full max-w-md space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-2xl font-light mb-2">CREATE ACCOUNT</h2>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="px-2 w-full border-b border-gray-200 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-0"
                    required
                  />
                </div>

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

                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="px-2 w-full border-b border-gray-200 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
            
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="mt-1 border-gray-300 rounded"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the <Link href="/terms" className="underline">Terms & Conditions</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 text-sm tracking-widest hover:bg-gray-900 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="underline">
                  Login here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;