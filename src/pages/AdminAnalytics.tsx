import AdminLayout from "@/components/admin/AdminLayout";
import { mockAnalytics, mockOrders } from "@/data/adminMockData";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const COLORS = ['hsl(25, 85%, 50%)', 'hsl(25, 85%, 60%)', 'hsl(25, 85%, 70%)', 'hsl(30, 20%, 40%)', 'hsl(30, 15%, 50%)', 'hsl(30, 10%, 60%)'];

const AdminAnalytics = () => {
  // Calculate some stats
  const totalRevenue = mockAnalytics.revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalOrders = mockAnalytics.orders.reduce((sum, item) => sum + item.count, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-foreground tracking-wide">ANALYTICS</h1>
          <p className="text-muted-foreground font-space text-sm mt-1">
            Detailed insights into your store performance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-accent/10 border border-accent/30 p-4 flex items-center gap-4">
            <DollarSign className="h-8 w-8 text-accent" />
            <div>
              <p className="font-bebas text-2xl text-foreground">${(totalRevenue / 1000).toFixed(0)}K</p>
              <p className="text-muted-foreground font-space text-xs">Total Revenue</p>
            </div>
          </div>
          <div className="bg-muted/30 border border-muted-foreground/10 p-4 flex items-center gap-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-bebas text-2xl text-foreground">{totalOrders.toLocaleString()}</p>
              <p className="text-muted-foreground font-space text-xs">Total Orders</p>
            </div>
          </div>
          <div className="bg-muted/30 border border-muted-foreground/10 p-4 flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-bebas text-2xl text-foreground">${avgOrderValue.toFixed(0)}</p>
              <p className="text-muted-foreground font-space text-xs">Avg Order Value</p>
            </div>
          </div>
          <div className="bg-muted/30 border border-muted-foreground/10 p-4 flex items-center gap-4">
            <Users className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-bebas text-2xl text-foreground">892</p>
              <p className="text-muted-foreground font-space text-xs">Active Customers</p>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <h2 className="font-bebas text-2xl text-foreground tracking-wide mb-6">REVENUE OVERVIEW</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalytics.revenue}>
                  <defs>
                    <linearGradient id="analyticsRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25, 85%, 50%)" stopOpacity={0.4}/>
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
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(25, 85%, 50%)"
                    strokeWidth={2}
                    fill="url(#analyticsRevenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <h2 className="font-bebas text-2xl text-foreground tracking-wide mb-6">ORDER VOLUME</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalytics.orders}>
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
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(30, 10%, 12%)',
                      border: 'none',
                      borderRadius: 0,
                      fontFamily: 'Space Grotesk',
                    }}
                    labelStyle={{ color: 'hsl(40, 20%, 96%)' }}
                    formatter={(value: number) => [value, 'Orders']}
                  />
                  <Bar dataKey="count" fill="hsl(25, 85%, 50%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Distribution */}
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <h2 className="font-bebas text-2xl text-foreground tracking-wide mb-6">CATEGORY SALES</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockAnalytics.categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {mockAnalytics.categories.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(30, 10%, 12%)',
                      border: 'none',
                      borderRadius: 0,
                      fontFamily: 'Space Grotesk',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Products */}
          <div className="lg:col-span-2 bg-muted/30 border border-muted-foreground/10 p-6">
            <h2 className="font-bebas text-2xl text-foreground tracking-wide mb-6">TOP PRODUCTS</h2>
            <div className="space-y-4">
              {mockAnalytics.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <span className="font-bebas text-2xl text-accent w-8">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-space text-sm text-foreground">{product.name}</p>
                    <div className="flex gap-4 mt-1">
                      <span className="text-muted-foreground font-space text-xs">
                        {product.sales.toLocaleString()} units
                      </span>
                      <span className="text-accent font-space text-xs">
                        ${product.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-32 h-2 bg-muted-foreground/20">
                    <div 
                      className="h-full bg-accent" 
                      style={{ width: `${(product.sales / mockAnalytics.topProducts[0].sales) * 100}%` }}
                    />
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

export default AdminAnalytics;
