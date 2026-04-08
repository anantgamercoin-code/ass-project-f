import { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/pages/reports.css";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function ReportsPage() {
  const [timeFilter, setTimeFilter] = useState("This Month");

  // Sample analytics data
  const analyticsData = {
    "This Month": {
      totalRevenue: 125000,
      totalOrders: 245,
      avgOrderValue: 510,
      topItems: [
        { name: "Grilled Salmon", orders: 45, revenue: 20250 },
        { name: "Ribeye Steak", orders: 32, revenue: 20800 },
        { name: "Caesar Salad", orders: 28, revenue: 7000 },
        { name: "Chocolate Cake", orders: 25, revenue: 7500 },
        { name: "Mozzarella Sticks", orders: 22, revenue: 4400 }
      ],
      dailyRevenue: [
        { day: "01", revenue: 8500 },
        { day: "02", revenue: 9200 },
        { day: "03", revenue: 7800 },
        { day: "04", revenue: 10200 },
        { day: "05", revenue: 8900 },
        { day: "06", revenue: 11500 },
        { day: "07", revenue: 12800 },
        { day: "08", revenue: 9600 },
        { day: "09", revenue: 11200 },
        { day: "10", revenue: 13400 },
        { day: "11", revenue: 9800 },
        { day: "12", revenue: 12100 },
        { day: "13", revenue: 10800 },
        { day: "14", revenue: 14200 },
        { day: "15", revenue: 13600 }
      ]
    },
    "Last Month": {
      totalRevenue: 118000,
      totalOrders: 223,
      avgOrderValue: 529,
      topItems: [
        { name: "Ribeye Steak", orders: 38, revenue: 24700 },
        { name: "Grilled Salmon", orders: 35, revenue: 15750 },
        { name: "Caesar Salad", orders: 30, revenue: 7500 },
        { name: "Spring Rolls", orders: 28, revenue: 5040 },
        { name: "Chocolate Cake", orders: 24, revenue: 7200 }
      ],
      dailyRevenue: [
        { day: "01", revenue: 8200 },
        { day: "02", revenue: 8800 },
        { day: "03", revenue: 7500 },
        { day: "04", revenue: 9800 },
        { day: "05", revenue: 8500 },
        { day: "06", revenue: 10800 },
        { day: "07", revenue: 12200 },
        { day: "08", revenue: 9200 },
        { day: "09", revenue: 10500 },
        { day: "10", revenue: 12800 },
        { day: "11", revenue: 9500 },
        { day: "12", revenue: 11800 },
        { day: "13", revenue: 10200 },
        { day: "14", revenue: 13800 },
        { day: "15", revenue: 13200 }
      ]
    }
  };

  const currentData = analyticsData[timeFilter];
  const maxRevenue = Math.max(...currentData.dailyRevenue.map(d => d.revenue));

  return (
    <motion.div
      className="reports-page"
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      {/* Header */}
      <div className="page-header">
        <h1>Reports</h1>
        <p>Analyze your restaurant performance and sales data</p>
      </div>

      {/* Time Filter */}
      <div className="time-filter">
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span>Total Revenue</span>
          <h2>₹{currentData.totalRevenue.toLocaleString()}</h2>
        </div>
        <div className="metric-card">
          <span>Total Orders</span>
          <h2>{currentData.totalOrders}</h2>
        </div>
        <div className="metric-card">
          <span>Average Order Value</span>
          <h2>₹{currentData.avgOrderValue}</h2>
        </div>
        <div className="metric-card">
          <span>Growth</span>
          <h2 className="growth">+12.5%</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Revenue Chart */}
        <div className="chart-card">
          <h3>Daily Revenue</h3>
          <div className="chart-container">
            <div className="chart-bars">
              {currentData.dailyRevenue.map((data, index) => (
                <div key={index} className="chart-bar">
                  <div
                    className="bar"
                    style={{
                      height: `${(data.revenue / maxRevenue) * 100}%`,
                      background: data.revenue > 12000 ? '#10b981' : data.revenue > 10000 ? '#3b82f6' : '#f59e0b'
                    }}
                  >
                    <span className="bar-value">₹{Math.round(data.revenue / 100) / 10}k</span>
                  </div>
                  <span className="bar-label">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Items */}
        <div className="chart-card">
          <h3>Top Selling Items</h3>
          <div className="top-items-list">
            {currentData.topItems.map((item, index) => (
              <div key={index} className="top-item">
                <div className="item-info">
                  <span className="item-rank">#{index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.orders} orders</p>
                  </div>
                </div>
                <div className="item-revenue">₹{item.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="detailed-table-container">
        <h3>Revenue Breakdown</h3>
        <table className="detailed-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Revenue</th>
              <th>Orders</th>
              <th>Avg Order Value</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>
            {currentData.dailyRevenue.map((data, index) => {
              const orders = Math.floor(data.revenue / currentData.avgOrderValue);
              const avgValue = Math.round(data.revenue / orders);
              const growth = index > 0 ?
                ((data.revenue - currentData.dailyRevenue[index - 1].revenue) /
                 currentData.dailyRevenue[index - 1].revenue * 100).toFixed(1) : 0;

              return (
                <tr key={index}>
                  <td>Day {data.day}</td>
                  <td>₹{data.revenue.toLocaleString()}</td>
                  <td>{orders}</td>
                  <td>₹{avgValue}</td>
                  <td className={growth >= 0 ? 'positive' : 'negative'}>
                    {growth >= 0 ? '+' : ''}{growth}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ReportsPage;