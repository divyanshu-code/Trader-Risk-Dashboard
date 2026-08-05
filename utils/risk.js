const WARNING_THRESHOLD_PERCENT = 75;
const CRITICAL_THRESHOLD_PERCENT = 90;

export function getRiskStatus(currentDrawdown, maximumDrawdown, currentDayLoss, dailyLossLimit) {
  
  const maxDD = Number(maximumDrawdown) || 0;
  const maxDaily = Number(dailyLossLimit) || 0;
  const currDD = Number(currentDrawdown) || 0;
  const currDaily = Number(currentDayLoss) || 0;

  const drawdownPercentage = maxDD > 0 
    ? (currDD / maxDD) * 100 
    : (currDD > 0 ? 100 : 0);

  const dailyLossPercentage = maxDaily > 0 
    ? (currDaily / maxDaily) * 100 
    : (currDaily > 0 ? 100 : 0);

  const percentageUsed = Math.max(drawdownPercentage, dailyLossPercentage);

  let status = "Safe";
  let statusColor = "green";
  let statusMessage = "Account is well within risk limits. Keep executing your edge.";

  if (percentageUsed >= CRITICAL_THRESHOLD_PERCENT) {
    status = "At Risk";
    statusColor = "red";
    statusMessage = "Critical Risk! You are extremely close to a limit violation. Halt trading.";
  } else if (percentageUsed >= WARNING_THRESHOLD_PERCENT) {
    status = "Approaching Limit";
    statusColor = "yellow";
    statusMessage = "Approaching risk limits. Reduce position sizing and exercise extreme caution.";
  }

  return {
    status,
    
    percentageUsed: Number(percentageUsed.toFixed(2)),
    statusColor,
    statusMessage
  };
}
