'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { FiShield, FiAlertTriangle, FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function RiskAnalysis({
  currentDrawdown = "-",
  remainingDrawdown = "-",
  drawdownPercentage = 0,
  todaysLoss = "-",
  remainingDailyLoss = "-",
  dailyLossPercentage = 0,
  riskStatus = "Safe",
  warningMessage = "Your account is currently in good standing."
}) {
  const statusStyles = {
    safe: {
      badge: "bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
      icon: "text-emerald-500",
      progress: "bg-emerald-500",
      message: "bg-transparent border-emerald-100 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300",
      IconComponent: FiShield
    },
    approaching: {
      badge: "bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
      icon: "text-amber-500",
      progress: "bg-amber-500",
      message: "bg-transparent border-amber-100 dark:border-amber-500/20 text-amber-800 dark:text-amber-300",
      IconComponent: FiAlertTriangle
    },
    risk: {
      badge: "bg-rose-50 text-rose-700 border border-rose-200/50 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
      icon: "text-rose-500",
      progress: "bg-rose-500",
      message: "bg-transparent border-rose-100 dark:border-rose-500/20 text-rose-800 dark:text-rose-300",
      IconComponent: FiXCircle
    }
  };

  let activeStyle = statusStyles.safe;
  if (riskStatus.toLowerCase() === "approaching limit") activeStyle = statusStyles.approaching;
  else if (riskStatus.toLowerCase() === "at risk") activeStyle = statusStyles.risk;

  const { badge, icon, progress, message, IconComponent } = activeStyle;

  return (
    <Card className="p-6 flex flex-col h-full" delay={0.2}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Risk Analysis</h2>
        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${badge}`}>
          <IconComponent className="w-3.5 h-3.5" />
          {riskStatus}
        </span>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-gray-500 dark:text-gray-400">Current Drawdown</span>
            <span className="text-gray-900 dark:text-white font-bold tracking-tight tabular-nums">{currentDrawdown}</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(0, drawdownPercentage))}%` }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className={`h-1.5 rounded-full ${progress}`}
            />
          </div>
          <div className="flex justify-end text-xs font-medium mt-2">
            <span className="text-gray-400">Remaining: <span className="text-gray-600 dark:text-gray-300 tabular-nums">{remainingDrawdown}</span></span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-gray-500 dark:text-gray-400">Today's Loss</span>
            <span className="text-gray-900 dark:text-white font-bold tracking-tight tabular-nums">{todaysLoss}</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(0, dailyLossPercentage))}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className={`h-1.5 rounded-full ${progress}`}
            />
          </div>
          <div className="flex justify-end text-xs font-medium mt-2">
            <span className="text-gray-400">Remaining: <span className="text-gray-600 dark:text-gray-300 tabular-nums">{remainingDailyLoss}</span></span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`mt-6 p-4 rounded-xl border flex gap-3 items-start ${message}`}
      >

        <p className="text-[13px] font-medium leading-relaxed">
          {warningMessage}
        </p>
      </motion.div>
    </Card>
  );
}
