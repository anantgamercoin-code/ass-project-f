import { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/pages/orders.css";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function OrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("process");

  // Sample orders data
  const [orders] = useState([
    {
      id: "ORD001",
      customer: "9876543210",
      description: "2x Grilled Salmon, 1x Spring Rolls",
      status: "Pending",
      payment: "Unpaid",
      amount: 650,
      time: new Date(),
    },
    {
      id: "ORD002",
      customer: "9123456780",
      description: "1x Ribeye Steak, 2x Chocolate Cake",
      status: "Completed",
      payment: "Paid",
      amount: 950,
      time: new Date(),
    },
    {
      id: "ORD003",
      customer: "9988776655",
      description: "3x Mozzarella Sticks, 1x Grilled Salmon",
      status: "Ready",
      payment: "Paid",
      amount: 750,
      time: new Date(),
    },
  ]);

  // Find order
  const handleFetch = () => {
    const id = orderId.trim().toUpperCase();
    if (!id) {
      setSelectedOrder(null);
      return;
    }
    const found = orders.find((o) => o.id === id);
    setSelectedOrder(found || null);
  };

  // Update order
  const updateOrder = (updates) => {
    // In real app, this would update the backend
    console.log("Updating order:", updates);
  };

  // Filter analytics orders
  const analyticsOrders = orders.filter((o) => {
    return (
      (statusFilter === "All" || o.status === statusFilter) &&
      (paymentFilter === "All" || o.payment === paymentFilter)
    );
  });

  // Stats
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
    <motion.div
      className="orders-page"
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      {/* Header */}
      <div className="page-header">
        <h1>This Month</h1>
        <p>Track orders, revenue, and performance for the current month</p>
      </div>

      {/* Tabs */}
      <div className="orders-tabs">
        <button
          className={activeTab === "process" ? "active" : ""}
          onClick={() => setActiveTab("process")}
        >
          Process Order
        </button>
        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {/* Process Order Tab */}
      {activeTab === "process" && (
        <div className="process-container">
          {/* Search */}
          <div className="process-search">
            <input
              type="text"
              placeholder="Enter Order ID (e.g., ORD001)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={handleFetch}>Find Order</button>
          </div>

          {/* Order Card */}
          {selectedOrder ? (
            <div className="order-card">
              <div className="order-card-header">
                <h2>{selectedOrder.id}</h2>
                <p>{selectedOrder.customer}</p>
              </div>

              <div className="order-grid">
                <div>
                  <span>Description</span>
                  <strong>{selectedOrder.description}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <span className={`badge ${selectedOrder.status}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <span>Payment</span>
                  <span className="badge payment">{selectedOrder.payment}</span>
                </div>
                <div>
                  <span>Amount</span>
                  <strong>₹{selectedOrder.amount}</strong>
                </div>
              </div>

              <div className="order-actions">
                <button
                  onClick={() => updateOrder({ status: "Ready" })}
                  disabled={selectedOrder.status === "Completed"}
                >
                  Mark Ready
                </button>
                <button
                  onClick={() => updateOrder({ status: "Completed", payment: "Paid" })}
                  disabled={selectedOrder.status === "Completed"}
                >
                  Complete Order
                </button>
              </div>
            </div>
          ) : (
            <div className="no-order">
              {orderId ? "Order not found" : "Enter an Order ID to get started"}
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="analytics-container">
          {/* Filters */}
          <div className="analytics-top">
            <h4>Analytics</h4>
            <div className="analytics-filters">
              <select onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Ready">Ready</option>
                <option value="Completed">Completed</option>
              </select>
              <select onChange={(e) => setPaymentFilter(e.target.value)}>
                <option value="All">All Payments</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Cards */}
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

          {/* List */}
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
      )}
    </motion.div>
  );
}

export default OrdersPage;