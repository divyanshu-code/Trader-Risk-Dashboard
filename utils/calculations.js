export function calculateTotalPnL(trades) {
  if (!Array.isArray(trades) || trades.length === 0) return 0;
  return trades.reduce((sum, trade) => sum + (Number(trade.pnl) || 0), 0);
}

export function calculateCurrentBalance(startingBalance, trades) {
  const start = Number(startingBalance) || 0;
  return start + calculateTotalPnL(trades);
}

export function calculateWinningTrades(trades) {
  if (!Array.isArray(trades)) return 0;
  return trades.filter(trade => (Number(trade.pnl) || 0) > 0).length;
}

export function calculateLosingTrades(trades) {
  if (!Array.isArray(trades)) return 0;
  return trades.filter(trade => (Number(trade.pnl) || 0) < 0).length;
}

export function calculateWinRate(trades) {
  if (!Array.isArray(trades) || trades.length === 0) return 0;
  const wins = calculateWinningTrades(trades);
  return (wins / trades.length) * 100;
}

export function calculateLargestWinningTrade(trades) {
  if (!Array.isArray(trades) || trades.length === 0) return 0;
  const wins = trades.map(t => Number(t.pnl) || 0).filter(pnl => pnl > 0);
  return wins.length > 0 ? Math.max(...wins) : 0;
}

export function calculateLargestLosingTrade(trades) {
  if (!Array.isArray(trades) || trades.length === 0) return 0;
  const losses = trades.map(t => Number(t.pnl) || 0).filter(pnl => pnl < 0);
  return losses.length > 0 ? Math.min(...losses) : 0;
}

export function calculateCurrentDrawdown(startingBalance, trades) {
  if (!Array.isArray(trades)) return 0;
  const start = Number(startingBalance) || 0;
  let currentBalance = start;
  let peakBalance = start;

  const sortedTrades = [...trades].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  for (const trade of sortedTrades) {
    currentBalance += (Number(trade.pnl) || 0);
    if (currentBalance > peakBalance) {
      peakBalance = currentBalance;
    }
  }

  return Math.max(0, peakBalance - currentBalance);
}

export function calculateRemainingDrawdown(startingBalance, trades, maxDrawdownLimit) {
  const limit = Number(maxDrawdownLimit) || 0;
  const currentDD = calculateCurrentDrawdown(startingBalance, trades);
  return Math.max(0, limit - currentDD);
}

export function calculateCurrentDayLoss(trades) {
  if (!Array.isArray(trades) || trades.length === 0) return 0;

  const today = new Date().toISOString().split('T')[0];
  
  const dailyTrades = trades.filter(trade => {
    if (!trade.timestamp) return false;
    return trade.timestamp.startsWith(today);
  });

  const dailyPnL = calculateTotalPnL(dailyTrades);

  return dailyPnL < 0 ? Math.abs(dailyPnL) : 0;
}

export function calculateRemainingDailyLoss(trades, dailyLossLimit) {
  const limit = Number(dailyLossLimit) || 0;
  const currentDayLoss = calculateCurrentDayLoss(trades);
  return Math.max(0, limit - currentDayLoss);
}
