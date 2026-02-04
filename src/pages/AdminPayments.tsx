import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockPayments } from "@/data/adminMockData";
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
import { Search, Eye, CheckCircle, Clock, XCircle, RotateCcw, DollarSign } from "lucide-react";
import type { Payment } from "@/data/adminMockData";

const statusConfig = {
  completed: { label: 'Completed', icon: CheckCircle, className: 'bg-green-600/20 text-green-600' },
  pending: { label: 'Pending', icon: Clock, className: 'bg-amber-600/20 text-amber-600' },
  failed: { label: 'Failed', icon: XCircle, className: 'bg-red-600/20 text-red-600' },
  refunded: { label: 'Refunded', icon: RotateCcw, className: 'bg-muted text-muted-foreground' },
};

const AdminPayments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Filter payments
  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate totals
  const totalCompleted = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = mockPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalRefunded = mockPayments
    .filter(p => p.status === 'refunded')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleView = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  const handleRefund = (payment: Payment) => {
    alert(`Demo: Would refund payment ${payment.id} for $${payment.amount.toFixed(2)}`);
  };

  const getStatusInfo = (status: Payment['status']) => statusConfig[status];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-foreground tracking-wide">PAYMENTS</h1>
          <p className="text-muted-foreground font-space text-sm mt-1">
            Track and manage payment transactions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-600/10 border border-green-600/20 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-bebas text-3xl text-green-600">${totalCompleted.toLocaleString()}</p>
                <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-600/10 border border-amber-600/20 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-600/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="font-bebas text-3xl text-amber-600">${totalPending.toLocaleString()}</p>
                <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted flex items-center justify-center">
                <RotateCcw className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bebas text-3xl text-muted-foreground">${totalRefunded.toLocaleString()}</p>
                <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Refunded</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payments..."
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

        {/* Payments Table */}
        <div className="bg-muted/30 border border-muted-foreground/10">
          <Table>
            <TableHeader>
              <TableRow className="border-muted-foreground/10 hover:bg-transparent">
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">PAYMENT ID</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">ORDER</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">CUSTOMER</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">DATE</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">METHOD</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">AMOUNT</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">STATUS</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => {
                const statusInfo = getStatusInfo(payment.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <TableRow key={payment.id} className="border-muted-foreground/10">
                    <TableCell className="font-space text-sm text-foreground">{payment.id}</TableCell>
                    <TableCell className="font-space text-sm text-accent">{payment.orderId}</TableCell>
                    <TableCell className="font-space text-sm text-foreground">{payment.customer}</TableCell>
                    <TableCell className="font-space text-sm text-muted-foreground">{payment.date}</TableCell>
                    <TableCell className="font-space text-xs text-muted-foreground">{payment.method}</TableCell>
                    <TableCell>
                      <p className="font-bebas text-lg text-foreground">${payment.amount.toFixed(2)}</p>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 font-space text-[10px] tracking-wider uppercase ${statusInfo.className}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleView(payment)}
                          className="h-8 w-8 p-0 hover:bg-accent/20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {payment.status === 'completed' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRefund(payment)}
                            className="h-8 px-2 text-xs font-space hover:bg-destructive/20 text-destructive"
                          >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Refund
                          </Button>
                        )}
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
              <DialogTitle className="font-bebas text-2xl tracking-wide">PAYMENT DETAILS</DialogTitle>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-muted-foreground/10">
                  <div>
                    <p className="font-bebas text-xl text-foreground">{selectedPayment.id}</p>
                    <p className="font-space text-xs text-muted-foreground">{selectedPayment.date}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-space text-xs tracking-wider uppercase ${getStatusInfo(selectedPayment.status).className}`}>
                    {getStatusInfo(selectedPayment.status).label}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Order ID</p>
                    <p className="font-space text-accent">{selectedPayment.orderId}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Customer</p>
                    <p className="font-space text-foreground">{selectedPayment.customer}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Payment Method</p>
                    <p className="font-space text-foreground">{selectedPayment.method}</p>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/30 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent/20 flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Amount</p>
                      <p className="font-bebas text-4xl text-accent">${selectedPayment.amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {selectedPayment.status === 'completed' && (
                  <Button 
                    onClick={() => handleRefund(selectedPayment)}
                    variant="outline"
                    className="w-full font-space text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Issue Refund
                  </Button>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminPayments;
