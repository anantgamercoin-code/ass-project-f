import { useState, useRef } from "react";
import "../../styles/components/orders.css";
import Dropdown from "../ui/Dropdown";

function OrdersHeader({ onSearch, onCreate, onRefresh, onReport }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef();

  const menuItems = [
    { label: "Create New Order", onClick: onCreate },
    { label: "Refresh Data", onClick: onRefresh },
    { label: "View Monthly Report", onClick: onReport },
  ];

  return (
    <div className="orders-header">
      <h2>Orders Overview</h2>

      <div className="orders-header__right">
        <input
          type="text"
          placeholder="Search by Order ID..."
          onChange={(e) => onSearch(e.target.value)}
        />

        <div ref={wrapperRef} style={{ position: "relative" }}>
          <button
            className="menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
          >
            ⋮
          </button>

          <Dropdown
            isOpen={menuOpen}
            items={menuItems}
            onClose={() => setMenuOpen(false)}
            parentRef={wrapperRef} // ✅ pass this
          />
        </div>
      </div>
    </div>
  );
}

export default OrdersHeader;
