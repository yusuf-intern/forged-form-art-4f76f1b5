// Mock data for admin dashboard - static demo only

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod: string;
}

export interface Payment {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: string;
  date: string;
}

export interface AnalyticsData {
  revenue: { month: string; amount: number }[];
  orders: { month: string; count: number }[];
  categories: { name: string; value: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
}

export const mockOrders: Order[] = [
  { id: 'ORD-001', customer: 'Marcus Steel', email: 'marcus@construction.com', items: 15, total: 847.50, status: 'delivered', date: '2024-01-15', paymentMethod: 'Credit Card' },
  { id: 'ORD-002', customer: 'BuildRight LLC', email: 'orders@buildright.com', items: 42, total: 2134.00, status: 'shipped', date: '2024-01-14', paymentMethod: 'Invoice' },
  { id: 'ORD-003', customer: 'Sarah Connor', email: 'sconnor@email.com', items: 8, total: 156.99, status: 'processing', date: '2024-01-14', paymentMethod: 'PayPal' },
  { id: 'ORD-004', customer: 'Industrial Works Co', email: 'procurement@iwco.com', items: 128, total: 5420.00, status: 'pending', date: '2024-01-13', paymentMethod: 'Wire Transfer' },
  { id: 'ORD-005', customer: 'Home Depot Pro', email: 'wholesale@hdpro.com', items: 256, total: 12800.00, status: 'processing', date: '2024-01-13', paymentMethod: 'Net 30' },
  { id: 'ORD-006', customer: 'John Smith', email: 'jsmith@gmail.com', items: 3, total: 42.99, status: 'delivered', date: '2024-01-12', paymentMethod: 'Credit Card' },
  { id: 'ORD-007', customer: 'FastFix Repairs', email: 'orders@fastfix.com', items: 24, total: 890.00, status: 'shipped', date: '2024-01-12', paymentMethod: 'Credit Card' },
  { id: 'ORD-008', customer: 'Metro Construction', email: 'supply@metrocon.com', items: 67, total: 3245.50, status: 'cancelled', date: '2024-01-11', paymentMethod: 'Invoice' },
];

export const mockPayments: Payment[] = [
  { id: 'PAY-001', orderId: 'ORD-001', customer: 'Marcus Steel', amount: 847.50, status: 'completed', method: 'Visa ****4242', date: '2024-01-15' },
  { id: 'PAY-002', orderId: 'ORD-002', customer: 'BuildRight LLC', amount: 2134.00, status: 'completed', method: 'Invoice #INV-2024-042', date: '2024-01-14' },
  { id: 'PAY-003', orderId: 'ORD-003', customer: 'Sarah Connor', amount: 156.99, status: 'completed', method: 'PayPal', date: '2024-01-14' },
  { id: 'PAY-004', orderId: 'ORD-004', customer: 'Industrial Works Co', amount: 5420.00, status: 'pending', method: 'Wire Transfer', date: '2024-01-13' },
  { id: 'PAY-005', orderId: 'ORD-005', customer: 'Home Depot Pro', amount: 12800.00, status: 'pending', method: 'Net 30', date: '2024-01-13' },
  { id: 'PAY-006', orderId: 'ORD-006', customer: 'John Smith', amount: 42.99, status: 'completed', method: 'Mastercard ****8888', date: '2024-01-12' },
  { id: 'PAY-007', orderId: 'ORD-007', customer: 'FastFix Repairs', amount: 890.00, status: 'completed', method: 'Amex ****1234', date: '2024-01-12' },
  { id: 'PAY-008', orderId: 'ORD-008', customer: 'Metro Construction', amount: 3245.50, status: 'refunded', method: 'Invoice #INV-2024-038', date: '2024-01-11' },
];

export const mockAnalytics: AnalyticsData = {
  revenue: [
    { month: 'Jul', amount: 42000 },
    { month: 'Aug', amount: 38000 },
    { month: 'Sep', amount: 55000 },
    { month: 'Oct', amount: 48000 },
    { month: 'Nov', amount: 62000 },
    { month: 'Dec', amount: 71000 },
    { month: 'Jan', amount: 58000 },
  ],
  orders: [
    { month: 'Jul', count: 156 },
    { month: 'Aug', count: 142 },
    { month: 'Sep', count: 198 },
    { month: 'Oct', count: 175 },
    { month: 'Nov', count: 224 },
    { month: 'Dec', count: 267 },
    { month: 'Jan', count: 203 },
  ],
  categories: [
    { name: 'Screws', value: 35 },
    { name: 'Bolts', value: 25 },
    { name: 'Fasteners', value: 15 },
    { name: 'Anchors', value: 12 },
    { name: 'Washers', value: 8 },
    { name: 'Nuts', value: 5 },
  ],
  topProducts: [
    { name: 'Hex Bolt - Grade 8', sales: 4250, revenue: 12325 },
    { name: 'Wood Screw - Flat Head', sales: 3890, revenue: 8520 },
    { name: 'Wedge Anchor', sales: 2100, revenue: 9030 },
    { name: 'Nylon Lock Nut', sales: 1850, revenue: 3145 },
    { name: 'Composite Deck Screw', sales: 1640, revenue: 7052 },
  ],
};

export const dashboardStats = {
  totalRevenue: 374000,
  revenueChange: 12.5,
  totalOrders: 1365,
  ordersChange: 8.2,
  totalProducts: 2438,
  productsChange: 3.1,
  avgOrderValue: 274,
  avgOrderChange: 4.8,
};
