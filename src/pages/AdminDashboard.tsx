import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart,
  Package, BarChart3, ArrowUpRight, Clock, Loader2
} from "lucide-react";
import { analyticsApi, ordersApi } from "@/lib/api";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const StatCard = ({
  title, value, change, icon: Icon, prefix = ""
}: {
  title: string; value: number | string; change: number; icon: React.ElementType; prefix?: string;
}) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-muted/30 border border-muted-foreground/10 p-6 hover:border-accent/30 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground font-space text-xs tracking-wider uppercase">{title}</p>
          <p className="font-bebas text-4xl text-foreground mt-2">
            {prefix}{typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {isPositive ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
        <span className={`font-space text-sm ${isPositive ? "text-green-600" : "text-red-500"}`}>
          {isPositive ? "+" : ""}{change}%
        </span>
        <span className="text-muted-foreground font-space text-sm">vs last month</span>
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered": return "bg-green-600/20 text-green-600";
    case "shipped": return "bg-blue-600/20 text-blue-600";
    case "processing": return "bg-amber-600/20 text-amber-600";
    case "pending": return "bg-muted text-muted-foreground";
    case "cancelled": return "bg-red-600/20 text-red-600";
    default: return "bg-muted text-muted-foreground";
  }
};

const AdminDashboard = () => {
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: analyticsApi.get,
  });

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders", { page: 1, page_size: 5 }],
    queryFn: () => ordersApi.list({ page: 1, page_size: 5 }),
  });

  const isLoading = analyticsLoading || ordersLoading;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </AdminLayout>
    );
  }

  const stats = analytics?.stats;
  const recentOrders = ordersData?.items ?? [];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-foreground tracking-wide">DASHBOARD</h1>
          <p className="text-muted-foreground font-space text-sm mt-1">Overview of your store performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value={stats?.total_revenue ?? 0} change={stats?.revenue_change ?? 0} icon={DollarSign} prefix="$" />
          <StatCard title="Total Orders" value={stats?.total_orders ?? 0} change={stats?.orders_change ?? 0} icon={ShoppingCart} />
          <StatCard title="Products" value={stats?.total_products ?? 0} change={stats?.products_change ?? 0} icon={Package} />
          <StatCard title="Avg Order Value" value={Math.round(stats?.avg_order_value ?? 0)} change={stats?.avg_order_change ?? 0} icon={BarChart3} prefix="$" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bebas text-2xl text-foreground tracking-wide">REVENUE TREND</h2>
                <p className="text-muted-foreground font-space text-xs">Last 7 months</p>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <ArrowUpRight className="h-4 w-4" />
                <span className="font-space text-sm">+{stats?.revenue_change ?? 0}%</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.revenue ?? []}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 80%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(0, 80%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false}
                    tick={{ fill: "hsl(30, 10%, 50%)", fontSize: 12, fontFamily: "Space Grotesk" }} />
                  <YAxis axisLine={false} tickLine={false}
                    tick={{ fill: "hsl(30, 10%, 50%)", fontSize: 12, fontFamily: "Space Grotesk" }}
                    tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ background: "hsl(30, 10%, 12%)", border: "none", borderRadius: 0, fontFamily: "Space Grotesk" }}
                    labelStyle={{ color: "hsl(40, 20%, 96%)" }}
                    itemStyle={{ color: "hsl(0, 80%, 50%)" }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="amount" stroke="hsl(0, 80%, 50%)" strokeWidth={2} fill="url(#revenueGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bebas text-2xl text-foreground tracking-wide">RECENT ORDERS</h2>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-muted-foreground font-space text-sm">No orders yet.</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-muted-foreground/10 last:border-0">
                    <div>
                      <p className="font-space text-sm text-foreground">{order.customer.name}</p>
                      <p className="font-space text-xs text-muted-foreground">{order.order_number}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bebas text-lg text-foreground">${order.total.toFixed(2)}</p>
                      <span className={`font-space text-[10px] tracking-wider uppercase px-2 py-0.5 ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;