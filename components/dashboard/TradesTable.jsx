'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { motion } from 'framer-motion';

const TableRow = ({ asset, direction, pnl, timestamp }) => {
  const isLong = direction?.toLowerCase() === 'long';
  const directionClass = isLong 
    ? 'bg-blue-50/50 text-blue-600 border-blue-100/50 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' 
    : 'bg-orange-50/50 text-orange-600 border-orange-100/50 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20';

  const numString = String(pnl).replace(/[^0-9.-]+/g, "");
  const numValue = parseFloat(numString);
  
  let pnlClass = 'text-gray-900 dark:text-white';
  if (!isNaN(numValue) && numValue !== 0) {
    if (numValue > 0) pnlClass = 'text-emerald-600 dark:text-emerald-400';
    else if (numValue < 0) pnlClass = 'text-rose-600 dark:text-rose-400';
  }

  return (
    <motion.tr 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-gray-100 dark:border-gray-800/60 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors group"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
        {asset}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${directionClass}`}>
          {direction}
        </span>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold tracking-tight tabular-nums ${pnlClass}`}>
        {pnl}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors tabular-nums">
        {timestamp}
      </td>
    </motion.tr>
  );
};

export default function TradesTable({ trades = [] }) {
  return (
    <Card className="w-full overflow-hidden" delay={0.4}>
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800/60">
        <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Recent Trades</h2>
      </div>
      
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800/60">
          <thead className="bg-gray-50/50 dark:bg-gray-800/20">
            <tr>
              {['Asset', 'Direction', 'Profit & Loss', 'Timestamp'].map((heading) => (
                <th key={heading} scope="col" className="px-6 py-3.5 text-left text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800/30 divide-y divide-gray-100 dark:divide-gray-800/60">
            {trades.length > 0 ? (
              trades.map((trade, index) => (
                <TableRow 
                  key={trade.id || index}
                  asset={trade.asset}
                  direction={trade.direction}
                  pnl={trade.pnl}
                  timestamp={trade.timestamp}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-[13px] font-medium text-gray-500 dark:text-gray-400">
                  No trades found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
