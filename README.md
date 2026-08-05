# Trader Risk Dashboard

## What I Built
I built a clean, easy-to-use web dashboard for traders to track their performance and manage their risk. It acts as a safety control center that automatically calculates your profit, loss, and account balance. If a trader gets too close to losing too much money, the dashboard will flash warning messages to tell them to slow down or stop trading. 

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charting:** Recharts

## Additional Feature: Premium Equity Curve
I implemented a **Dynamic Equity Curve** utilizing `Recharts`. This visualization plots the trader's cumulative account balance after every trade, rather than just showing a static total PnL. It features flawless responsive scaling, an elegant animated SVG gradient area, and a custom glassmorphism hover tooltip that explicitly highlights the trade number, balance, and isolated PnL of individual trades. 

## How to Run the Project
1. Ensure you have Node.js installed.
2. Clone this repository and navigate into the root directory.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Product Questions

### 1. What is drawdown in trading?
Drawdown is the measure of how much an account has lost from its absolute highest peak balance. For example, if a trader grows their account from $10,000 to $15,000, but then loses $3,000 to drop down to $12,000, their current drawdown is $3,000. It measures the peak-to-trough decline.

### 2. Why do you think a trader would care about their remaining drawdown rather than just their current P&L?
Current P&L only tells a trader how much money they have made or lost overall. However, remaining drawdown tells a trader *how close they are to violating their hard risk limits*. A professional trader could be up $50,000 on the year (great P&L!), but if their max allowable drawdown is $10,000 and they are currently down $9,000 from a recent peak, they are one bad trade away from blowing their account. Remaining drawdown dictates their immediate survival.

### 3. If you had another day to work on this dashboard, what would you improve?
Given another day, I would improve the dashboard by adding:
- **Interactive Filtering:** A date-range picker and asset-class filter so traders can isolate their performance on specific days or specific symbols (e.g., "Show me my stats for only BTC trades this month").
- **Live Data Integration:** Hooking the dashboard up to a WebSocket (like Binance or Alpaca) to stream real-time PnL updates instead of relying on static mock data.
- **Advanced Trade Analytics:** Adding more granular statistics like the Sharpe Ratio, Average Win/Loss Ratio, Profit Factor, or a scatter plot of trade durations to help the trader deeply analyze their actual edge in the market.
