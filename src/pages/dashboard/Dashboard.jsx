import { useState } from "react";
import Layout from "../../components/layout/Layout";
import StatsGrid from "../../components/dashboard/StatsGrid";
import OrdersTable from "../../components/dashboard/OrdersTable";
import CreateOrderModal from "../../components/dashboard/CreateOrderModal";

function Dashboard({ setPage, setIsAuthenticated }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "9876543210",
      description: "2x Burger",
      status: "Pending",
      payment: "Unpaid",
      time: new Date(),
      priority: "Normal",
    },
    {
      id: "ORD002",
      customer: "9123456780",
      description: "Pizza + Coke",
      status: "Completed",
      payment: "Paid",
      time: new Date(),
      priority: "High",
    },
  ]);

  return (
    <Layout
      setPage={setPage}
      setIsAuthenticated={setIsAuthenticated}
      activePage="dashboard"
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          position: "relative",
        }}
      >
        <h1 style={{ fontSize: "22px", fontWeight: "600" }}>Overview</h1>
      </div>

      <StatsGrid />
      <OrdersTable
        orders={orders}
        onCreate={() => setModalOpen(true)} // 👈 open modal
        onRefresh={() => setOrders((prev) => [...prev])}
        onReport={() => setPage("reports")}
      />
      <CreateOrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(newOrder) => {
          setOrders((prev) => [newOrder, ...prev]); // add on top
        }}
      />
    </Layout>
  );
}

export default Dashboard;
