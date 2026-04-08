import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import MainCard from 'components/MainCard';
import OrdersTable from 'components/OrdersTable';
import CreateOrderModal from 'components/Modal/CreateOrderModal';
import Card from 'components/ui/Card';
import Button from 'components/ui/Button';
import { useAppData } from 'contexts/AppDataContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function DashboardDefault() {
  const navigate = useNavigate();
  const { orders, addOrder } = useAppData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Calculate stats
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'Completed').length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const totalRevenue = orders
      .filter(o => o.paymentStatus === 'Paid')
      .reduce((sum, o) => sum + o.total, 0);

    return {
      totalOrders,
      completedOrders,
      pendingOrders,
      totalRevenue
    };
  }, [orders]);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.customerMobile.includes(search)
  );

  return (
    <motion.div
      className="dashboard"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <CreateOrderModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={addOrder} />

      {/* Hero Section */}
      <motion.div variants={itemVariants} className="dashboard__hero">
        <div className="dashboard__hero-content">
          <h1 className="dashboard__hero-title">Restaurant Pro Dashboard</h1>
          <p className="dashboard__hero-subtitle">
            Advanced restaurant management with real-time analytics and professional insights
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="dashboard__actions">
        <a href="#orders" className="action-card action-card--primary" onClick={(e) => { e.preventDefault(); setModalOpen(true); }}>
          <div className="action-card__icon">
            <ShoppingCartOutlined />
          </div>
          <div className="action-card__content">
            <h3>New Order</h3>
            <p>Create a new customer order</p>
          </div>
        </a>

        <a href="#customers" className="action-card action-card--success" onClick={(e) => { e.preventDefault(); navigate('/customers'); }}>
          <div className="action-card__icon">
            <UserOutlined />
          </div>
          <div className="action-card__content">
            <h3>Add Customer</h3>
            <p>Register new customer</p>
          </div>
        </a>

        <a href="#products" className="action-card action-card--warning" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>
          <div className="action-card__icon">
            <PlusOutlined />
          </div>
          <div className="action-card__content">
            <h3>Manage Menu</h3>
            <p>Update products & categories</p>
          </div>
        </a>

        <a href="#reports" className="action-card action-card--info" onClick={(e) => { e.preventDefault(); navigate('/reports'); }}>
          <div className="action-card__icon">
            <DollarOutlined />
          </div>
          <div className="action-card__content">
            <h3>View Reports</h3>
            <p>Analytics & insights</p>
          </div>
        </a>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="dashboard__stats">
        <div className="stats-overview">
          <Card
            title="Total Orders"
            value={stats.totalOrders}
            subtitle="All time orders"
            variant="primary"
          />
          <Card
            title="Completed Orders"
            value={stats.completedOrders}
            subtitle="Successfully delivered"
            variant="success"
          />
          <Card
            title="Pending Orders"
            value={stats.pendingOrders}
            subtitle="Awaiting completion"
            variant="warning"
          />
          <Card
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toFixed(0)}`}
            subtitle="Paid orders only"
            variant="info"
          />
        </div>
      </motion.div>

      {/* Recent Orders Table */}
      <motion.div variants={itemVariants}>
        <MainCard title="Recent Orders" sx={{ borderRadius: 3 }}>
          <div className="table-container">
            <div className="table-header">
              <h3 className="table-header__title">Order Management</h3>
              <div className="table-header__actions">
                <div className="table-search">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<PlusOutlined />}
                  onClick={() => setModalOpen(true)}
                >
                  New Order
                </Button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Amount</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.slice(0, 10).map((order) => (
                  <tr key={order.id}>
                    <td className="table__cell--primary">{order.id}</td>
                    <td>{order.customerMobile}</td>
                    <td>
                      <span className={`status-badge status-badge--${order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : 'info'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-badge--${order.paymentStatus === 'Paid' ? 'success' : 'danger'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="table__cell--primary">${order.total}</td>
                    <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MainCard>
      </motion.div>
    </motion.div>
  );
}