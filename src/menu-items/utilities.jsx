// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  GiftOutlined,
  FileTextOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  GiftOutlined,
  FileTextOutlined
};

// ==============================|| MENU ITEMS - OPERATIONS ||============================== //

const operations = {
  id: 'operations',
  title: 'Operations',
  type: 'group',
  children: [
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.ShoppingCartOutlined
    },
    {
      id: 'customers',
      title: 'Customers',
      type: 'item',
      url: '/customers',
      icon: icons.UserOutlined
    },
    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.GiftOutlined
    },
    {
      id: 'reports',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.FileTextOutlined
    }
  ]
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/typography',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/color',
      icon: icons.BgColorsOutlined
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/shadow',
      icon: icons.BarcodeOutlined
    }
  ]
};

export { operations };
export default utilities;

