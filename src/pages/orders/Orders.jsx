import { useState } from "react";
import Layout from "../../components/layout/Layout";
import "../../styles/pages/orders.css";

function Orders({ setPage, setIsAuthenticated }) {
  const [orderId, setOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  // 🔥 REAL STATE (IMPORTANT FIX)
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "9876543210",
      description: "2x Burger",
      status: "Pending",
      payment: "Unpaid",
      amount: 250,
      time: new Date(),
    },
    {
      id: "ORD002",
      customer: "9123456780",
      description: "Pizza + Coke",
      status: "Pending",
      payment: "Unpaid",
      amount: 450,
      time: new Date(),
    },
  ]);

  // 🔍 FETCH ORDER (FIXED)
  const handleFetch = () => {
    const id = orderId.trim().toUpperCase();

    if (!id) {
      setSelectedOrder(null);
      return;
    }

    const found = orders.find((o) => o.id === id);

    setSelectedOrder(found || null);
  };

  // ✅ UPDATE ORDER (REAL STATE UPDATE)
  const updateOrder = (updates) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === selectedOrder.id ? { ...o, ...updates } : o)),
    );

    setSelectedOrder((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // 🔍 FILTER FIX (IMPORTANT)
  const analyticsOrders = orders.filter((o) => {
    return (
      (statusFilter === "All" || o.status === statusFilter) &&
      (paymentFilter === "All" || o.payment === paymentFilter)
    );
  });

  // 📊 STATS
  const totalOrders = analyticsOrders.length;
  const totalRevenue = analyticsOrders.reduce(
    (sum, o) => sum + (o.payment !== "Unpaid" ? o.amount : 0),
    0,
  );

  const completedOrders = analyticsOrders.filter(
    (o) => o.status === "Completed",
  ).length;

  const pendingOrders = analyticsOrders.filter(
    (o) => o.status === "Pending",
  ).length;

  return (
    <Layout
      setPage={setPage}
      setIsAuthenticated={setIsAuthenticated}
      activePage="orders"
    >
      <div className="orders-page">
        {/* HEADER */}
        {/* HEADER */}
        <div className="page-header">
          <h1>This Month</h1>
          <p>Track orders, revenue, and performance for the current month</p>
        </div>

        <div className="orders-content">
          <div className="analytics-container">
            {/* FILTERS */}
            <div className="analytics-top">
              <h4>Analytics</h4>

              <div className="analytics-filters">
                <select onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <select onChange={(e) => setPaymentFilter(e.target.value)}>
                  <option value="All">All Payments</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
            </div>

            {/* CARDS */}
            <div className="analytics-grid">
              <div className="analytics-card">
                <span>Total Orders</span>
                <h2>{totalOrders}</h2>
              </div>

              <div className="analytics-card">
                <span>Revenue</span>
                <h2>₹{totalRevenue}</h2>
              </div>

              <div className="analytics-card">
                <span>Completed</span>
                <h2>{completedOrders}</h2>
              </div>

              <div className="analytics-card">
                <span>Pending</span>
                <h2>{pendingOrders}</h2>
              </div>
            </div>

            {/* LIST */}
            <div className="analytics-list">
              {analyticsOrders.map((o, i) => (
                <div className="analytics-row" key={o.id}>
                  <div className="row-left">
                    <span>#{i + 1}</span>
                    <div>
                      <strong>{o.id}</strong>
                      <p>{o.customer}</p>
                    </div>
                  </div>

                  <div className="row-center">
                    <span className={`badge ${o.status}`}>{o.status}</span>
                    <span className="badge payment">{o.payment}</span>
                  </div>

                  <div className="row-right">₹{o.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
