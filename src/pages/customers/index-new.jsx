import { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/pages/customers.css";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sample customers data
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      email: "john@example.com",
      totalOrders: 12,
      totalSpent: 4500,
      lastOrder: "2024-01-15",
      status: "Active",
      orders: [
        {
          id: "ORD001",
          date: "2024-01-15",
          items: "2x Grilled Salmon, 1x Spring Rolls",
          amount: 650,
          status: "Completed"
        },
        {
          id: "ORD002",
          date: "2024-01-10",
          items: "1x Ribeye Steak, 2x Chocolate Cake",
          amount: 950,
          status: "Completed"
        },
        {
          id: "ORD003",
          date: "2024-01-05",
          items: "3x Mozzarella Sticks",
          amount: 300,
          status: "Completed"
        }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "9123456780",
      email: "jane@example.com",
      totalOrders: 8,
      totalSpent: 3200,
      lastOrder: "2024-01-12",
      status: "Active",
      orders: [
        {
          id: "ORD004",
          date: "2024-01-12",
          items: "1x Grilled Salmon, 1x Caesar Salad",
          amount: 550,
          status: "Completed"
        },
        {
          id: "ORD005",
          date: "2024-01-08",
          items: "2x Chicken Wings, 1x Fries",
          amount: 400,
          status: "Completed"
        }
      ]
    },
    {
      id: 3,
      name: "Mike Johnson",
      phone: "9988776655",
      email: "mike@example.com",
      totalOrders: 15,
      totalSpent: 6200,
      lastOrder: "2024-01-14",
      status: "Active",
      orders: [
        {
          id: "ORD006",
          date: "2024-01-14",
          items: "1x Ribeye Steak, 1x Mashed Potatoes",
          amount: 850,
          status: "Completed"
        },
        {
          id: "ORD007",
          date: "2024-01-09",
          items: "2x Grilled Salmon, 1x Wine",
          amount: 1200,
          status: "Completed"
        }
      ]
    }
  ]);

  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <motion.div
      className="customers-page"
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      {/* Header */}
      <div className="page-header">
        <h1>Customers</h1>
        <p>Manage your customer database and view order history</p>
      </div>

      {/* Customers Table */}
      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.totalOrders}</td>
                <td>₹{customer.totalSpent}</td>
                <td>{customer.lastOrder}</td>
                <td>
                  <span className={`status-badge ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => openCustomerDetails(customer)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Details Drawer */}
      {isDrawerOpen && selectedCustomer && (
        <div className="drawer-overlay" onClick={closeDrawer}>
          <motion.div
            className="customer-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <h2>{selectedCustomer.name}</h2>
              <button className="close-btn" onClick={closeDrawer}>×</button>
            </div>

            <div className="drawer-content">
              {/* Customer Info */}
              <div className="customer-info">
                <div className="info-grid">
                  <div>
                    <span>Phone</span>
                    <strong>{selectedCustomer.phone}</strong>
                  </div>
                  <div>
                    <span>Email</span>
                    <strong>{selectedCustomer.email}</strong>
                  </div>
                  <div>
                    <span>Total Orders</span>
                    <strong>{selectedCustomer.totalOrders}</strong>
                  </div>
                  <div>
                    <span>Total Spent</span>
                    <strong>₹{selectedCustomer.totalSpent}</strong>
                  </div>
                  <div>
                    <span>Last Order</span>
                    <strong>{selectedCustomer.lastOrder}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <span className={`status-badge ${selectedCustomer.status.toLowerCase()}`}>
                      {selectedCustomer.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="order-history">
                <h3>Order History</h3>
                <div className="orders-list">
                  {selectedCustomer.orders.map((order) => (
                    <div key={order.id} className="order-item">
                      <div className="order-header">
                        <strong>{order.id}</strong>
                        <span className={`order-status ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="order-date">{order.date}</p>
                      <p className="order-items">{order.items}</p>
                      <p className="order-amount">₹{order.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default CustomersPage;