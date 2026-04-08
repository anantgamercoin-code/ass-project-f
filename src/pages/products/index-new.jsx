import { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/pages/products.css";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Sample products data
  const [products] = useState([
    {
      id: 1,
      name: "Grilled Salmon",
      category: "Main Course",
      price: 450,
      status: "Available",
      description: "Fresh Atlantic salmon grilled to perfection with herbs",
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Ribeye Steak",
      category: "Main Course",
      price: 650,
      status: "Available",
      description: "Premium ribeye steak cooked to your preference",
      image: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Caesar Salad",
      category: "Appetizer",
      price: 250,
      status: "Available",
      description: "Crisp romaine lettuce with Caesar dressing and croutons",
      image: "/api/placeholder/60/60"
    },
    {
      id: 4,
      name: "Chocolate Cake",
      category: "Dessert",
      price: 300,
      status: "Out of Stock",
      description: "Rich chocolate cake with vanilla frosting",
      image: "/api/placeholder/60/60"
    },
    {
      id: 5,
      name: "Mozzarella Sticks",
      category: "Appetizer",
      price: 200,
      status: "Available",
      description: "Golden fried mozzarella sticks with marinara sauce",
      image: "/api/placeholder/60/60"
    },
    {
      id: 6,
      name: "Spring Rolls",
      category: "Appetizer",
      price: 180,
      status: "Available",
      description: "Crispy vegetable spring rolls with sweet chili sauce",
      image: "/api/placeholder/60/60"
    }
  ]);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // Stats
  const totalProducts = products.length;
  const availableProducts = products.filter(p => p.status === "Available").length;
  const outOfStockProducts = products.filter(p => p.status === "Out of Stock").length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <motion.div
      className="products-page"
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      {/* Header */}
      <div className="page-header">
        <h1>Products</h1>
        <p>Manage your menu items and inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="products-stats">
        <div className="stat-card">
          <span>Total Products</span>
          <h2>{totalProducts}</h2>
        </div>
        <div className="stat-card">
          <span>Available</span>
          <h2>{availableProducts}</h2>
        </div>
        <div className="stat-card">
          <span>Out of Stock</span>
          <h2>{outOfStockProducts}</h2>
        </div>
        <div className="stat-card">
          <span>Total Value</span>
          <h2>₹{totalValue}</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="products-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td data-label="Product">
                  <div className="product-info">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div>
                      <strong>{product.name}</strong>
                    </div>
                  </div>
                </td>
                <td data-label="Category">{product.category}</td>
                <td data-label="Price">₹{product.price}</td>
                <td data-label="Status">
                  <span className={`status-badge ${product.status === "Available" ? "available" : "out-of-stock"}`}>
                    {product.status}
                  </span>
                </td>
                <td data-label="Description" className="description-cell">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          No products found matching your criteria.
        </div>
      )}
    </motion.div>
  );
}

export default ProductsPage;