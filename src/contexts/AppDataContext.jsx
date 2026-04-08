import { createContext, useContext, useState, useCallback } from 'react';

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Main Course' },
    { id: 2, name: 'Appetizers' },
    { id: 3, name: 'Desserts' }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Grilled Salmon', price: 24.99, categoryId: 1 },
    { id: 2, name: 'Ribeye Steak', price: 34.99, categoryId: 1 },
    { id: 3, name: 'Spring Rolls', price: 8.99, categoryId: 2 },
    { id: 4, name: 'Mozzarella Sticks', price: 7.99, categoryId: 2 },
    { id: 5, name: 'Chocolate Cake', price: 9.99, categoryId: 3 }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', mobile: '9876543210', email: 'john@example.com', totalSpent: 250.50 },
    { id: 2, name: 'Jane Smith', mobile: '9876543211', email: 'jane@example.com', totalSpent: 180.75 },
    { id: 3, name: 'Bob Johnson', mobile: '9876543212', email: 'bob@example.com', totalSpent: 320.25 }
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD001', customerMobile: '9876543210', items: [{ name: 'Grilled Salmon', qty: 2 }, { name: 'Spring Rolls', qty: 1 }], total: 57.97, status: 'Completed', paymentMethod: 'Card', paymentStatus: 'Paid', createdAt: '2024-12-15T18:30:00Z' },
    { id: 'ORD002', customerMobile: '9876543211', items: [{ name: 'Ribeye Steak', qty: 1 }, { name: 'Chocolate Cake', qty: 2 }], total: 79.97, status: 'Ready', paymentMethod: 'Cash', paymentStatus: 'Pending', createdAt: '2024-12-16T19:15:00Z' },
    { id: 'ORD003', customerMobile: '9876543212', items: [{ name: 'Mozzarella Sticks', qty: 3 }, { name: 'Grilled Salmon', qty: 1 }], total: 48.96, status: 'Pending', paymentMethod: 'UPI', paymentStatus: 'Paid', createdAt: '2024-12-16T20:00:00Z' }
  ]);

  const addCategory = useCallback((category) => {
    const newCategory = { id: Date.now(), ...category };
    setCategories((prev) => [...prev, newCategory]);
  }, []);

  const addProduct = useCallback((product) => {
    const newProduct = { id: Date.now(), ...product };
    setProducts((prev) => [...prev, newProduct]);
  }, []);

  const addCustomer = useCallback((customer) => {
    const newCustomer = { id: Date.now(), totalSpent: 0, ...customer };
    setCustomers((prev) => [...prev, newCustomer]);
  }, []);

  const addOrder = useCallback((order) => {
    const newOrder = { id: `ORD${String(orders.length + 1).padStart(3, '0')}`, createdAt: new Date().toISOString(), paymentStatus: 'Pending', ...order };
    setOrders((prev) => [...prev, newOrder]);
  }, [orders.length]);

  return (
    <AppDataContext.Provider value={{ categories, products, customers, orders, addCategory, addProduct, addCustomer, addOrder }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
}
