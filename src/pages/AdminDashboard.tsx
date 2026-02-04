import AdminLayout from "@/components/admin/AdminLayout";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  BarChart3,
  ArrowUpRight,
  Clock
} from "lucide-react";
import { dashboardStats, mockOrders, mockAnalytics } from "@/data/adminMockData";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  prefix = "" 
}: { 
  title: string; 
  value: number | string; 
  change: number; 
  icon: React.ElementType;
  prefix?: string;
}) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-muted/30 border border-muted-foreground/10 p-6 hover:border-accent/30 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground font-space text-xs tracking-wider uppercase">
            {title}
          </p>
          <p className="font-bebas text-4xl text-foreground mt-2">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`font-space text-sm ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className="text-muted-foreground font-space text-sm">vs last month</span>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const recentOrders = mockOrders.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-600/20 text-green-600';
      case 'shipped': return 'bg-blue-600/20 text-blue-600';
      case 'processing': return 'bg-amber-600/20 text-amber-600';
      case 'pending': return 'bg-muted text-muted-foreground';
      case 'cancelled': return 'bg-red-600/20 text-red-600';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-foreground tracking-wide">DASHBOARD</h1>
          <p className="text-muted-foreground font-space text-sm mt-1">
            Overview of your store performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Revenue" 
            value={dashboardStats.totalRevenue} 
            change={dashboardStats.revenueChange}
            icon={DollarSign}
            prefix="$"
          />
          <StatCard 
            title="Total Orders" 
            value={dashboardStats.totalOrders} 
            change={dashboardStats.ordersChange}
            icon={ShoppingCart}
          />
          <StatCard 
            title="Products" 
            value={dashboardStats.totalProducts} 
            change={dashboardStats.productsChange}
            icon={Package}
          />
          <StatCard 
            title="Avg Order Value" 
            value={dashboardStats.avgOrderValue} 
            change={dashboardStats.avgOrderChange}
            icon={BarChart3}
            prefix="$"
          />
        </div>

        {/* Charts and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bebas text-2xl text-foreground tracking-wide">REVENUE TREND</h2>
                <p className="text-muted-foreground font-space text-xs">Last 7 months</p>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <ArrowUpRight className="h-4 w-4" />
                <span className="font-space text-sm">+12.5%</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalytics.revenue}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25, 85%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(25, 85%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(30, 10%, 50%)', fontSize: 12, fontFamily: 'Space Grotesk' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(30, 10%, 50%)', fontSize: 12, fontFamily: 'Space Grotesk' }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(30, 10%, 12%)',
                      border: 'none',
                      borderRadius: 0,
                      fontFamily: 'Space Grotesk',
                    }}
                    labelStyle={{ color: 'hsl(40, 20%, 96%)' }}
                    itemStyle={{ color: 'hsl(25, 85%, 50%)' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(25, 85%, 50%)"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bebas text-2xl text-foreground tracking-wide">RECENT ORDERS</h2>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between py-3 border-b border-muted-foreground/10 last:border-0"
                >
                  <div>
                    <p className="font-space text-sm text-foreground">{order.customer}</p>
                    <p className="font-space text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bebas text-lg text-foreground">${order.total.toFixed(2)}</p>
                    <span className={`font-space text-[10px] tracking-wider uppercase px-2 py-0.5 ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
