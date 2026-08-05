'use client';

import React from 'react';
import { Card } from '@/components/ui';
import {
  FiDollarSign,
  FiActivity,
  FiTrendingDown,
  FiAlertTriangle
} from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, delay = 0 }) => {
  return (
    <Card delay={delay} className="p-4 xl:p-6 flex items-center gap-3 xl:gap-4 overflow-hidden">
      <div className="p-2.5 xl:p-3 bg-gray-50/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shrink-0">
        <Icon className="w-4 h-4 xl:w-5 xl:h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400 whitespace-nowrap truncate">{title}</p>
        <p className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-0.5 whitespace-nowrap tabular-nums">{value}</p>
      </div>
    </Card>
  );
};

export default function AccountOverview({
  startingBalance,
  currentBalance,
  maximumDrawdown,
  dailyLossLimit,
}) {

  const stats = [
    { title: 'Starting Balance', value: startingBalance, icon: FiDollarSign, delay: 0.05 },
    { title: 'Current Balance', value: currentBalance, icon: FiActivity, delay: 0.1 },
    { title: 'Max Drawdown', value: maximumDrawdown, icon: FiTrendingDown, delay: 0.15 },
    { title: 'Daily Limit', value: dailyLossLimit, icon: FiAlertTriangle, delay: 0.2 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full h-full">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          delay={stat.delay}
        />
      ))}
    </div>
  );
}
