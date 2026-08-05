'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  className = "", 
  animate = true, 
  delay = 0, 
  ...props 
}) {
  
  const baseClasses = "bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-200/60 dark:border-gray-700/50 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] backdrop-blur-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 ease-out";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] }} 
        className={combinedClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
}
