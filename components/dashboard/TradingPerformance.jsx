'use client';

import React from 'react';
import { Card } from '@/components/ui';

const PerformanceCard = ({ title, value, delay = 0 }) => {
  const numString = String(value).replace(/[^0-9.-]+/g, "");
  const numValue = parseFloat(numString);

  let colorClass = "text-gray-900 dark:text-white";

  if (!isNaN(numValue) && numValue !== 0) {
    if (numValue > 0) {
      colorClass = "text-emerald-600 dark:text-emerald-400";
    } else if (numValue < 0) {
      colorClass = "text-rose-600 dark:text-rose-400";
    }
  }

  return (
    <Card delay={delay} className="p-5 flex flex-col justify-center overflow-hidden">
      <p className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400 mb-1.5 whitespace-nowrap truncate">{title}</p>
      <p className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight whitespace-nowrap tabular-nums ${colorClass}`}>
        {value}
      </p>
    </Card>
  );
};

export default function TradingPerformance({
  currentBalance = "-",
  totalPnL = "-",
  winningTrades = "-",
  losingTrades = "-",
  winRate = "-",
  largestWinningTrade = "-",
  largestLosingTrade = "-",
}) {
  const metrics = [
    { title: "Current Balance", value: currentBalance, delay: 0.1 },
    { title: "Total P&L", value: totalPnL, delay: 0.15 },
    { title: "Winning Trades", value: winningTrades, delay: 0.2 },
    { title: "Losing Trades", value: losingTrades, delay: 0.25 },
    { title: "Win Rate", value: winRate, delay: 0.3 },
    { title: "Largest Win", value: largestWinningTrade, delay: 0.35 },
    { title: "Largest Loss", value: largestLosingTrade, delay: 0.4 },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-4">Trading Performance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, idx) => (
          <PerformanceCard
            key={idx}
            title={metric.title}
            value={metric.value}
            delay={metric.delay}
          />
        ))}
      </div>
    </div>
  );
}
