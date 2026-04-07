import "../../styles/layout/sidebar.css";
import logo from "../../assets/logo.png";

function Sidebar({ setPage, activePage }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "orders", label: "Order Insights" },
    { id: "customers", label: "Customers" },
    { id: "reports", label: "Reports" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="RestroAdmin Logo" width={100} />
      </div>

      <nav className="sidebar__menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar__item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setPage(item.id)}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
