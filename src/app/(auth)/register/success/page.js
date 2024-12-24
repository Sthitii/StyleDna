'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 p-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-wider mb-4">Welcome to STYLEDNA</h2>
          <p className="text-gray-600 mb-8">
            Your account has been successfully created. Start exploring our collection now.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-widest hover:bg-gray-900 transition-colors"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </motion.div>
    </div>
  );
}