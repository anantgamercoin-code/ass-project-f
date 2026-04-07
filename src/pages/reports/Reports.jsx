import { useState } from "react";
import Layout from "../../components/layout/Layout";
import "../../styles/pages/reports.css";

function Reports({ setPage, setIsAuthenticated }) {
  const [month, setMonth] = useState("");

  return (
    <Layout
      setPage={setPage}
      setIsAuthenticated={setIsAuthenticated}
      activePage="reports"
    >
      <div className="reports-page">
        {/* Header */}
        <div className="reports-header">
          <h1>Monthly Report</h1>

          <div className="reports-actions">
            <input
              type="number"
              placeholder="Enter month (1-12)"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min="1"
              max="12"
            />

            <button className="btn primary">
              Download Report (PDF)
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="reports-cards">
          <div className="report-card">
            <span>Total Orders</span>
            <strong>120</strong>
          </div>

          <div className="report-card">
            <span>Completed Orders</span>
            <strong>95</strong>
          </div>

          <div className="report-card">
            <span>Pending Orders</span>
            <strong>25</strong>
          </div>

          <div className="report-card">
            <span>New Customers</span>
            <strong>40</strong>
          </div>

          <div className="report-card">
            <span>Total Sales</span>
            <strong>₹45,000</strong>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Reports;