'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { generateEquityCurve } from '@/utils/equityCurve';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg p-3 min-w-[160px]">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
          {data.tradeNumber === 0 ? "Initial Balance" : `Trade #${data.tradeNumber}`}
        </p>
        <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white tabular-nums">
          {formatCurrency(data.balance)}
        </p>
        {data.tradeNumber > 0 && (
          <p className={`text-xs font-semibold mt-1 tabular-nums ${data.pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {data.pnl >= 0 ? '+' : ''}{formatCurrency(data.pnl)}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function EquityCurve({ startingBalance, trades }) {
  const data = generateEquityCurve(startingBalance, trades);

  const balances = data.map(d => d.balance);
  const currentBalance = balances[balances.length - 1] || 0;
  const highestBalance = Math.max(...balances);
  const lowestBalance = Math.min(...balances);
  const netGrowth = currentBalance - (Number(startingBalance) || 0);
  const netGrowthPercent = (Number(startingBalance) || 0) > 0 ? (netGrowth / startingBalance) * 100 : 0;

  return (
    <Card className="w-full flex flex-col overflow-hidden" delay={0.25}>
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800/60">
        <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Equity Curve</h2>
      </div>

      <div className="w-full h-[220px] sm:h-[300px] p-4 group">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
            <XAxis
              dataKey="tradeNumber"
              hide={true}
            />
            <YAxis
              domain={['dataMin', 'dataMax']}
              hide={true}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBalance)"
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
              dot={{ r: 4, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 1 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800/60">
        <div>
          <p className="text-[10px] font-semibold tracking-wider uppercase text-gray-500">Highest Balance</p>
          <p className="text-sm font-bold tracking-tight text-gray-900 dark:text-white tabular-nums mt-0.5">{formatCurrency(highestBalance)}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-wider uppercase text-gray-500">Lowest Balance</p>
          <p className="text-sm font-bold tracking-tight text-gray-900 dark:text-white tabular-nums mt-0.5">{formatCurrency(lowestBalance)}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-wider uppercase text-gray-500">
            {netGrowth >= 0 ? 'Net Growth ($)' : 'Net Loss ($)'}
          </p>
          <p className={`text-sm font-bold tracking-tight tabular-nums mt-0.5 ${netGrowth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {netGrowth >= 0 ? '+' : ''}{formatCurrency(netGrowth)}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-wider uppercase text-gray-500">
            {netGrowthPercent >= 0 ? 'Net Growth (%)' : 'Net Loss (%)'}
          </p>
          <p className={`text-sm font-bold tracking-tight tabular-nums mt-0.5 ${netGrowthPercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {netGrowthPercent >= 0 ? '+' : ''}{netGrowthPercent.toFixed(2)}%
          </p>
        </div>
      </div>
    </Card>
  );
}
