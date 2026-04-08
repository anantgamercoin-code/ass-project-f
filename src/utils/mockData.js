const formatTimestamp = (date) => {
  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
  return new Date(date).toLocaleString('en-US', options).replace(',', '');
};

const now = Date.now();

export const initialCategories = [
  { id: 'cat-1', name: 'Burgers' },
  { id: 'cat-2', name: 'Pizza' },
  { id: 'cat-3', name: 'Beverages' }
];

export const initialProducts = [
  { id: 'prod-1', name: 'Classic Cheeseburger', description: 'Beef patty, lettuce, tomato, cheese', price: 9.5, categoryId: 'cat-1' },
  { id: 'prod-2', name: 'Veggie Burger', description: 'Grilled veggie patty with fresh greens', price: 8.25, categoryId: 'cat-1' },
  { id: 'prod-3', name: 'Margherita Pizza', description: 'Tomato, mozzarella, basil', price: 12.75, categoryId: 'cat-2' },
  { id: 'prod-4', name: 'Pepperoni Pizza', description: 'Spicy pepperoni, melted cheese', price: 13.9, categoryId: 'cat-2' },
  { id: 'prod-5', name: 'Iced Lemon Tea', description: 'Refreshing citrus iced tea', price: 4.25, categoryId: 'cat-3' }
];

export const initialCustomers = [
  { id: 'cust-1', name: 'Aisha Khan', mobile: '9812345670', email: 'aisha@example.com' },
  { id: 'cust-2', name: 'Rohit Sharma', mobile: '9876501234', email: 'rohit@example.com' },
  { id: 'cust-3', name: 'Sara Ali', mobile: '9901234567', email: 'sara@example.com' }
];

export const initialOrders = [
  {
    id: 'ORD-1001',
    customerMobile: '9812345670',
    description: 'Classic Cheeseburger with fries',
    status: 'Ready',
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash',
    time: formatTimestamp(now - 1000 * 60 * 18),
    createdAt: now - 1000 * 60 * 18,
    total: 12.8
  },
  {
    id: 'ORD-1002',
    customerMobile: '9876501234',
    description: 'Margherita Pizza and iced tea',
    status: 'Pending',
    paymentStatus: 'Paid',
    paymentMethod: 'Card',
    time: formatTimestamp(now - 1000 * 60 * 45),
    createdAt: now - 1000 * 60 * 45,
    total: 17.0
  },
  {
    id: 'ORD-1003',
    customerMobile: '9901234567',
    description: 'Veggie Burger order',
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    time: formatTimestamp(now - 1000 * 60 * 90),
    createdAt: now - 1000 * 60 * 90,
    total: 9.8
  },
  {
    id: 'ORD-1004',
    customerMobile: '9812345670',
    description: 'Pepperoni Pizza for dine-in',
    status: 'Pending',
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash',
    time: formatTimestamp(now - 1000 * 60 * 15),
    createdAt: now - 1000 * 60 * 15,
    total: 14.6
  }
];

export const generateOrderId = () => `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
export const generateCategoryId = () => `cat-${Math.floor(1000 + Math.random() * 9000)}`;
export const generateProductId = () => `prod-${Math.floor(1000 + Math.random() * 9000)}`;
export const findCategoryName = (categories, categoryId) => categories.find((item) => item.id === categoryId)?.name || 'Uncategorized';

export const initialData = {
  categories: initialCategories,
  products: initialProducts,
  customers: initialCustomers,
  orders: initialOrders
};
