import React, { useState, useMemo } from "react";
import "../../styles/components/modal.css";

const PRODUCTS = [
  { id: 1, name: "Veg Burger", price: 120, category: "Food" },
  { id: 2, name: "Chicken Burger", price: 180, category: "Food" },
  { id: 3, name: "Pizza Margherita", price: 250, category: "Food" },
  { id: 4, name: "Cold Drink", price: 60, category: "Drinks" },
  { id: 5, name: "French Fries", price: 90, category: "Snacks" },
  { id: 6, name: "Paneer Wrap", price: 140, category: "Food" },
  { id: 7, name: "Coffee", price: 80, category: "Drinks" },
  { id: 8, name: "Ice Cream", price: 110, category: "Dessert" },
  { id: 9, name: "Chocolate Shake", price: 150, category: "Drinks" },
  { id: 10, name: "Sandwich", price: 130, category: "Food" },
];

export default function CreateOrderModal({ isOpen, onClose, onCreate }) {
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(0);

  const [selectedItems, setSelectedItems] = useState([]);

  const [form, setForm] = useState({
    customer: "",
    description: "",
    priority: "Normal Priority",
  });

  if (!isOpen) return null;

  // 🔍 Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  // ➕ Add item
  const addItem = (product) => {
    const exists = selectedItems.find((i) => i.id === product.id);

    if (exists) {
      const updated = selectedItems.map((i) =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
      );
      setSelectedItems(updated);
    } else {
      setSelectedItems([...selectedItems, { ...product, qty: 1 }]);
    }
  };

  // ➖ Decrease item
  const decreaseItem = (product) => {
    const exists = selectedItems.find((i) => i.id === product.id);

    if (!exists) return;

    if (exists.qty === 1) {
      setSelectedItems(selectedItems.filter((i) => i.id !== product.id));
    } else {
      const updated = selectedItems.map((i) =>
        i.id === product.id ? { ...i, qty: i.qty - 1 } : i,
      );
      setSelectedItems(updated);
    }
  };

  // 💰 Total calculation
  const total =
    Object.values(selectedItems).reduce(
      (acc, item) => acc + item.price * item.qty,
      0,
    ) - discount;

  const handleDiscountChange = (value) => {
    const discountValue = Number(value) || 0;
    setDiscount(discountValue);

    let desc = form.description || "";

    // Remove old discount line if exists
    desc = desc.replace(/\n?Discount Applied: ₹\d+/g, "");

    if (discountValue > 0) {
      desc += `\nDiscount Applied: ₹${discountValue}`;
    }

    setForm({ ...form, description: desc });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box order-modal-pro"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="modal-header">
          <h2>Create New Order</h2>
          <span className="close-x" onClick={onClose}>
            ×
          </span>
        </div>

        {/* MAIN LAYOUT */}
        <div className="order-container">
          {/* LEFT - PRODUCTS */}
          <div className="products-section">
            {/* SEARCH */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* PRODUCT LIST */}
            <div className="product-list">
              {filteredProducts.map((product) => {
                const selected = selectedItems.find((i) => i.id === product.id);

                return (
                  <div key={product.id} className="product-card">
                    <div className="product-info">
                      <div className="product-name">{product.name}</div>
                      <div className="product-meta">
                        ₹{product.price} • {product.category}
                      </div>
                    </div>

                    {/* ACTION */}
                    <div className="product-action">
                      {!selected ? (
                        <button
                          className="add-btn"
                          onClick={() => addItem(product)}
                        >
                          Add
                        </button>
                      ) : (
                        <div className="qty-control">
                          <button onClick={() => decreaseItem(product)}>
                            -
                          </button>
                          <span>{selected.qty}</span>
                          <button onClick={() => addItem(product)}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT - ORDER PANEL */}
          <div className="order-section">
            {/* CUSTOMER */}
            <div className="form-group">
              <label>Customer Mobile</label>
              <input
                placeholder="Enter mobile number"
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
              />
            </div>

            {/* SELECTED ITEMS */}
            <div className="selected-section">
              <h4>Order Items</h4>

              {selectedItems.length === 0 && (
                <div className="empty-state">No items selected</div>
              )}

              {selectedItems.map((item) => (
                <div key={item.id} className="selected-row">
                  <div className="left">
                    <span className="name">{item.name}</span>
                    <span className="qty">x{item.qty}</span>
                  </div>

                  <div className="right">₹{item.price * item.qty}</div>
                </div>
              ))}
            </div>

            <div className="discount-box">
              <label>Extra Discount</label>
              <div className="discount-input">
                <span>₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={discount}
                  onChange={(e) => handleDiscountChange(e.target.value)}
                />
              </div>
            </div>

            {/* TOTAL */}
            <div className="total-section">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="description-box"
                placeholder="Write order notes..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* PRIORITY */}
            <div className="form-group">
              <label>Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option>Low Priority</option>
                <option>Normal Priority</option>
                <option>High Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-actions">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn primary"
            onClick={() => {
              if (!form.customer || selectedItems.length === 0) return;

              const order = {
                id: "ORD" + Date.now(),
                customer: form.customer,
                items: selectedItems,
                amount: total,
                description: form.description,
                status: "Pending",
                payment: "Unpaid",
                time: new Date(),
                priority: form.priority,
              };

              onCreate(order);
              onClose();
            }}
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}
