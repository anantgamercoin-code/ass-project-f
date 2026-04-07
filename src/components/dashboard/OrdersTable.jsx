import { useState } from "react";
import "../../styles/components/table.css";
import OrdersHeader from "./OrdersHeader";

function OrdersTable({ orders, onCreate, onRefresh, onReport }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // 🔍 Search handler
  const handleSearch = (value) => {
    setSearch(value);
  };

  // 📊 Filter orders
  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(search.toLowerCase()),
  );

  // 🔥 Priority sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const priorityMap = { High: 3, Normal: 2, Low: 1 };
    return priorityMap[b.priority] - priorityMap[a.priority];
  });

  return (
    <div className="table-container">
      <OrdersHeader
        onSearch={() => {}}
        onCreate={onCreate}
        onRefresh={onRefresh}
        onReport={onReport}
      />

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Description</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.description}</td>
              <td>{order.status}</td>
              <td>{order.payment}</td>
              <td>{order.time.toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
