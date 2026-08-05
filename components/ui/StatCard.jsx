'use client';

import React from 'react';
import Card from './Card';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  delay = 0 
}) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow flex flex-col justify-center" delay={delay}>
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        {Icon && (
          <div className="p-2 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 rounded-lg">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>

      {trend && trendValue && (
        <div className="mt-2 flex items-center gap-1.5 text-sm">
          <span className={`font-medium ${trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-gray-500'}`}>
            {trendValue}
          </span>
          <span className="text-gray-400 dark:text-gray-500 text-xs">vs last period</span>
        </div>
      )}
    </Card>
  );
}
