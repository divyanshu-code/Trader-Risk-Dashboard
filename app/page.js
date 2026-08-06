import React from 'react';
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";
import AccountOverview from "@/components/dashboard/AccountOverview";
import RiskAnalysis from "@/components/dashboard/RiskAnalysis";
import TradingPerformance from "@/components/dashboard/TradingPerformance";
import TradesTable from "@/components/dashboard/TradesTable";
import EquityCurve from "@/components/dashboard/EquityCurve";

import { accountData } from "@/data/account";
import { tradesData } from "@/data/trades";

import {
  calculateTotalPnL,
  calculateCurrentBalance,
  calculateWinningTrades,
  calculateLosingTrades,
  calculateWinRate,
  calculateLargestWinningTrade,
  calculateLargestLosingTrade,
  calculateCurrentDrawdown,
  calculateRemainingDrawdown,
  calculateCurrentDayLoss,
  calculateRemainingDailyLoss
} from "@/utils/calculations";
import { getRiskStatus } from "@/utils/risk";

const formatCurrency = (value) => {
  const num = Number(value);
  if (isNaN(num)) return "$0.00"; 
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

const formatPercentage = (value) => {
  const num = Number(value);
  if (isNaN(num)) return "0.00%"; 
  return `${num.toFixed(2)}%`;
};

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Unknown Time";
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function DashboardPage() {
  
  const safeAccountData = accountData || {};
  const startingBalance = safeAccountData.startingBalance || 0;
  const maximumDrawdown = safeAccountData.maximumDrawdown || 0;
  const dailyLossLimit = safeAccountData.dailyLossLimit || 0;
  
  const trades = Array.isArray(tradesData) ? tradesData : [];

  const currentBalance = calculateCurrentBalance(startingBalance, trades);
  const totalPnL = calculateTotalPnL(trades);
  
  const winningTrades = calculateWinningTrades(trades);
  const losingTrades = calculateLosingTrades(trades);
  const winRate = calculateWinRate(trades);
  
  const largestWin = calculateLargestWinningTrade(trades);
  const largestLoss = calculateLargestLosingTrade(trades);
  
  const currentDrawdown = calculateCurrentDrawdown(startingBalance, trades);
  const remainingDrawdown = calculateRemainingDrawdown(startingBalance, trades, maximumDrawdown);
  
  const todaysLoss = calculateCurrentDayLoss(trades);
  const remainingDailyLoss = calculateRemainingDailyLoss(trades, dailyLossLimit);
  
  const risk = getRiskStatus(currentDrawdown, maximumDrawdown, todaysLoss, dailyLossLimit);

  const drawdownPercentage = maximumDrawdown > 0 ? (currentDrawdown / maximumDrawdown) * 100 : 0;
  const dailyLossPercentage = dailyLossLimit > 0 ? (todaysLoss / dailyLossLimit) * 100 : 0;

  const formattedTrades = trades.map(trade => ({
    id: trade.id || Math.random().toString(), 
    asset: trade.asset || "Unknown",
    direction: trade.side || "-",
    pnl: formatCurrency(trade.pnl),
    timestamp: formatTimestamp(trade.timestamp)
  })).reverse(); 

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

          <div className="col-span-1 md:col-span-2 lg:col-span-3 h-full">
            <AccountOverview 
              startingBalance={formatCurrency(startingBalance)}
              currentBalance={formatCurrency(currentBalance)}
              maximumDrawdown={formatCurrency(maximumDrawdown)}
              dailyLossLimit={formatCurrency(dailyLossLimit)}
            />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2 h-full flex flex-col">
            <EquityCurve startingBalance={startingBalance} trades={trades} />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1 h-full flex flex-col">
            <RiskAnalysis 
              currentDrawdown={formatCurrency(currentDrawdown)}
              remainingDrawdown={formatCurrency(remainingDrawdown)}
              drawdownPercentage={drawdownPercentage}
              todaysLoss={formatCurrency(todaysLoss)}
              remainingDailyLoss={formatCurrency(remainingDailyLoss)}
              dailyLossPercentage={dailyLossPercentage}
              riskStatus={risk.status}
              warningMessage={risk.statusMessage}
            />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <TradingPerformance 
              currentBalance={formatCurrency(currentBalance)}
              totalPnL={formatCurrency(totalPnL)}
              winningTrades={winningTrades}
              losingTrades={losingTrades}
              winRate={formatPercentage(winRate)}
              largestWinningTrade={formatCurrency(largestWin)}
              largestLosingTrade={formatCurrency(largestLoss)}
            />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <TradesTable trades={formattedTrades} />
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
