'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ 
  percentage = 0, 
  colorClass = "bg-blue-500", 
  heightClass = "h-2.5",
  animate = true,
  delay = 0 
}) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden ${heightClass}`}>
      {animate ? (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedPercentage}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`${heightClass} rounded-full ${colorClass}`}
        />
      ) : (
        <div 
          className={`${heightClass} rounded-full ${colorClass}`} 
          style={{ width: `${clampedPercentage}%` }} 
        />
      )}
    </div>
  );
}
