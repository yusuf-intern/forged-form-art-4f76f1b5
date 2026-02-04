import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockOrders } from "@/data/adminMockData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import type { Order } from "@/data/adminMockData";

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, className: 'bg-muted text-muted-foreground' },
  processing: { label: 'Processing', icon: Package, className: 'bg-amber-600/20 text-amber-600' },
  shipped: { label: 'Shipped', icon: Truck, className: 'bg-blue-600/20 text-blue-600' },
  delivered: { label: 'Delivered', icon: CheckCircle, className: 'bg-green-600/20 text-green-600' },
  cancelled: { label: 'Cancelled', icon: XCircle, className: 'bg-red-600/20 text-red-600' },
};

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Filter orders
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (order: Order, newStatus: string) => {
    alert(`Demo: Would update order ${order.id} status to "${newStatus}"`);
  };

  const getStatusInfo = (status: Order['status']) => statusConfig[status];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-foreground tracking-wide">ORDERS</h1>
          <p className="text-muted-foreground font-space text-sm mt-1">
            Manage customer orders ({mockOrders.length} total)
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(statusConfig).map(([key, config]) => {
            const count = mockOrders.filter(o => o.status === key).length;
            const Icon = config.icon;
            return (
              <div 
                key={key}
                className={`p-4 border border-muted-foreground/10 ${statusFilter === key ? 'bg-accent/10 border-accent/30' : 'bg-muted/30'} cursor-pointer hover:border-accent/30 transition-colors`}
                onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-bebas text-2xl text-foreground">{count}</span>
                </div>
                <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">{config.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-muted-foreground/20 font-space"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 bg-muted/30 border-muted-foreground/20 font-space">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.entries(statusConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>{config.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="bg-muted/30 border border-muted-foreground/10">
          <Table>
            <TableHeader>
              <TableRow className="border-muted-foreground/10 hover:bg-transparent">
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">ORDER ID</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">CUSTOMER</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">DATE</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">ITEMS</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">TOTAL</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">PAYMENT</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">STATUS</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <TableRow key={order.id} className="border-muted-foreground/10">
                    <TableCell className="font-space text-sm text-accent">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-space text-sm text-foreground">{order.customer}</p>
                        <p className="font-space text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-space text-sm text-muted-foreground">{order.date}</TableCell>
                    <TableCell className="font-space text-sm text-foreground">{order.items}</TableCell>
                    <TableCell>
                      <p className="font-bebas text-lg text-foreground">${order.total.toFixed(2)}</p>
                    </TableCell>
                    <TableCell className="font-space text-xs text-muted-foreground">{order.paymentMethod}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 font-space text-[10px] tracking-wider uppercase ${statusInfo.className}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleView(order)}
                          className="h-8 w-8 p-0 hover:bg-accent/20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select onValueChange={(v) => handleUpdateStatus(order, v)}>
                          <SelectTrigger className="w-28 h-8 bg-muted/30 border-muted-foreground/20 font-space text-xs">
                            <SelectValue placeholder="Update" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(([key, config]) => (
                              <SelectItem key={key} value={key} disabled={key === order.status}>
                                {config.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-background border-muted-foreground/20 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-bebas text-2xl tracking-wide">ORDER DETAILS</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-muted-foreground/10">
                  <div>
                    <p className="font-bebas text-xl text-accent">{selectedOrder.id}</p>
                    <p className="font-space text-xs text-muted-foreground">{selectedOrder.date}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-space text-xs tracking-wider uppercase ${getStatusInfo(selectedOrder.status).className}`}>
                    {getStatusInfo(selectedOrder.status).label}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Customer</p>
                    <p className="font-space text-foreground">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                    <p className="font-space text-foreground text-sm">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Items</p>
                    <p className="font-space text-foreground">{selectedOrder.items} products</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Payment</p>
                    <p className="font-space text-foreground text-sm">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-muted-foreground/10">
                  <div className="flex items-center justify-between">
                    <p className="font-space text-muted-foreground">Order Total</p>
                    <p className="font-bebas text-3xl text-accent">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
