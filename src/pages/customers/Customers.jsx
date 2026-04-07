import { useMemo, useState } from "react";
import Layout from "../../components/layout/Layout";
import "../../styles/pages/customers.css";

function Customers({ setPage, setIsAuthenticated }) {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openOrderIndex, setOpenOrderIndex] = useState(null);

  const customers = [
    {
      mobile: "9876543210",
      email: "user1@gmail.com",
      orders: 5,
      spending: 1200,
      lastOrder: new Date(),
    },
    {
      mobile: "9123456780",
      email: "user2@gmail.com",
      orders: 12,
      spending: 5400,
      lastOrder: new Date(),
    },
    {
      mobile: "9988776655",
      email: "",
      orders: 2,
      spending: 400,
      lastOrder: new Date(),
    },
  ];

  // 🔥 Sort by highest spending automatically
  const sortedCustomers = useMemo(() => {
    return [...customers].sort((a, b) => b.spending - a.spending);
  }, []);

  const filteredCustomers = sortedCustomers.filter((c) =>
    c.mobile.includes(search),
  );

  // 📊 Summary Data
  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.spending, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);

  const topSpender = sortedCustomers[0];

  return (
    <Layout
      setPage={setPage}
      setIsAuthenticated={setIsAuthenticated}
      activePage="customers"
    >
      <div className="customers-page">
        {/* Header */}
        <div className="customers-header">
          <h1>Customers</h1>

          <input
            type="text"
            placeholder="Search by mobile..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="customers-table">
          <table>
            <thead>
              <tr>
                <th>Mobile</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Spending</th>
                <th>Last Order</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((c, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedCustomer(c)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {c.mobile}
                    {c.mobile === topSpender.mobile && (
                      <span className="top-badge">🔥 Top</span>
                    )}
                  </td>
                  <td>{c.email || "-"}</td>
                  <td>{c.orders}</td>
                  <td>₹{c.spending}</td>
                  <td>{c.lastOrder.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedCustomer && (
          <div
            className="customer-drawer-overlay"
            onClick={() => setSelectedCustomer(null)}
          >
            <div
              className="customer-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <h2>Customer Details</h2>
                <button onClick={() => setSelectedCustomer(null)}>✕</button>
              </div>

              <div className="drawer-content">
                <div className="customer-info">
                  <div>
                    <span>Mobile</span>
                    <strong>{selectedCustomer.mobile}</strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>{selectedCustomer.email || "-"}</strong>
                  </div>

                  <div>
                    <span>Total Orders</span>
                    <strong>{selectedCustomer.orders}</strong>
                  </div>

                  <div>
                    <span>Total Spending</span>
                    <strong>₹{selectedCustomer.spending}</strong>
                  </div>

                  <div>
                    <span>Last Order</span>
                    <strong>
                      {selectedCustomer.lastOrder.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="order-history">
                  <div className="history-header">
                    <h3>Orders</h3>
                    <span className="order-count">
                      {selectedCustomer.orders} Orders
                    </span>
                  </div>

                  <div className="history-list">
                    {[
                      {
                        id: "ORD101",
                        description: "Pizza + Coke",
                        payment: "UPI",
                        time: new Date(),
                      },
                      {
                        id: "ORD102",
                        description: "Burger Combo",
                        payment: "Cash",
                        time: new Date(),
                      },
                      {
                        id: "ORD103",
                        description: "Pasta",
                        payment: "Card",
                        time: new Date(),
                      },
                    ].map((order, i) => (
                      <OrderRow
                        key={i}
                        order={order}
                        isOpen={openOrderIndex === i}
                        onToggle={() =>
                          setOpenOrderIndex(openOrderIndex === i ? null : i)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function OrderRow({ order, isOpen, onToggle }) {
  const [note, setNote] = useState(order.note || "");

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setNote(value);

    // 🔥 Auto trigger (API call or logic here)
    console.log("Saving note:", value, "for order:", order.id);

    // Example:
    // saveOrderNote(order.id, value);
  };

  return (
    <div className={`order-row ${isOpen ? "active" : ""}`}>
      <div className="order-row-top" onClick={onToggle}>
        <span className="order-id">{order.id}</span>
        <span className="order-time">
          {order.time.toLocaleString()}
        </span>
      </div>

      {isOpen && (
        <div className="order-details">
          <p><strong>Payment: {order.payment}</strong></p>
          
          <p><strong>Description:</strong></p>
          <p>{order.description}</p>

          {/* ✅ Admin Note */}
          <p><strong>Note:</strong></p>
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Write note (e.g. returned order, delayed...)"
            className="order-note-input"
          />
        </div>
      )}
    </div>
  );
}

export default Customers;
