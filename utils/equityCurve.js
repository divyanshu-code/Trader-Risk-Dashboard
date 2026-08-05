export function generateEquityCurve(startingBalance, trades) {
  const start = Number(startingBalance) || 0;
  
  if (!Array.isArray(trades) || trades.length === 0) {
    return [{
      tradeNumber: 0,
      balance: start,
      pnl: 0,
      timestamp: new Date().toISOString()
    }];
  }

  const validTrades = [...trades].filter(t => t && typeof t === 'object' && t.timestamp);

  validTrades.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const curveData = [];
  let currentBalance = start;

  curveData.push({
    tradeNumber: 0,
    balance: start,
    pnl: 0,
    timestamp: validTrades.length > 0 ? validTrades[0].timestamp : new Date().toISOString()
  });

  validTrades.forEach((trade, index) => {
    const tradePnL = Number(trade.pnl) || 0;
    currentBalance += tradePnL;

    curveData.push({
      tradeNumber: index + 1,
      balance: currentBalance,
      pnl: tradePnL,
      timestamp: trade.timestamp
    });
  });

  return curveData;
}
