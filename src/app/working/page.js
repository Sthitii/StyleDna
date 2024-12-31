'use client';

import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Working = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Main Content */}
      <motion.div 
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-8"
        >
          <Construction size={48} className="text-black" />
        </motion.div>

        {/* Text Content */}
        <h1 className="text-3xl font-light mb-4 tracking-wide">
          Page Under Construction
        </h1>
        
        <p className="text-gray-600 mb-8">
          We're working hard to bring you something amazing. This page will be available soon.
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-black"
              initial={{ width: "0%" }}
              animate={{ width: "70%" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Back to Home Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Homepage</span>
        </Link>

        {/* Optional Contact Info */}
        <p className="mt-8 text-sm text-gray-500">
          Need assistance? Email us at{' '}
          <a 
            href="mailto:support@styledna.com" 
            className="text-black hover:underline"
          >
            support@styledna.com
          </a>
        </p>
      </motion.div>

      {/* Background Elements - Decorative Lines */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-black opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-black opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default Working;