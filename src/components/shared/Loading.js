'use client';

import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium', type = 'default', text = 'Loading...' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const variants = {
    default: (
      <div className="flex flex-col items-center justify-center">
        <motion.div
          className={`border-2 border-gray-200 rounded-full ${sizes[size]}`}
          style={{ borderTopColor: '#000' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
      </div>
    ),

    dots: (
      <div className="flex flex-col items-center justify-center">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`bg-black rounded-full ${size === 'small' ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}
              animate={{
                y: [0, -10, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
        {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
      </div>
    ),

    pulse: (
      <div className="flex flex-col items-center justify-center">
        <motion.div
          className={`bg-black rounded-full ${sizes[size]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.4, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
      </div>
    ),

    progress: (
      <div className="flex flex-col items-center justify-center w-full max-w-xs">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <motion.div
            className="h-full bg-black rounded-full"
            animate={{
              width: ['0%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
        {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
      </div>
    )
  };

  return (
    <div className="flex items-center justify-center p-4">
      {variants[type]}
    </div>
  );
};

// Optional fullscreen overlay version
export const LoadingOverlay = ({ ...props }) => (
  <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
    <LoadingSpinner {...props} />
  </div>
);

export default LoadingSpinner;