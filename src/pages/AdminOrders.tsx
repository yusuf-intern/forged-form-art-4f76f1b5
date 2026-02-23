import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { ordersApi, type Order } from "@/lib/api";
import { Loader2 } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS: Order["status"][] = ["pending", "processing", "shipped", "delivered", "cancelled"];

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

const AdminOrders = () => {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["orders", { page, status: statusFilter }],
    queryFn: () => ordersApi.list({ page, page_size: 20, status: statusFilter === "all" ? undefined : statusFilter }),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: Order["status"] }) =>
      ordersApi.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-bebas text-4xl text-foreground tracking-wide">ORDERS</h1>
            <p className="text-muted-foreground font-space text-sm mt-1">
              {data?.total ?? 0} total orders
            </p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 font-space text-sm">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="border border-muted-foreground/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {["Order #", "Customer", "Items", "Total", "Method", "Status", "Date"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-space text-xs tracking-wider text-muted-foreground uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.items.map((order) => (
                  <tr key={order.id} className="border-t border-muted-foreground/10 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-4 font-space text-sm text-foreground">{order.order_number}</td>
                    <td className="px-4 py-4">
                      <p className="font-space text-sm text-foreground">{order.customer.name}</p>
                      <p className="font-space text-xs text-muted-foreground">{order.customer.email}</p>
                    </td>
                    <td className="px-4 py-4 font-space text-sm text-foreground">{order.items.length}</td>
                    <td className="px-4 py-4 font-bebas text-lg text-foreground">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-4 font-space text-sm text-muted-foreground">{order.payment_method}</td>
                    <td className="px-4 py-4">
                      <Select
                        value={order.status}
                        onValueChange={(val) => updateStatus.mutate({ id: order.id, status: val as Order["status"] })}
                      >
                        <SelectTrigger className={`w-32 font-space text-xs h-7 border-0 ${getStatusColor(order.status)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s} className="capitalize font-space text-xs">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-4 font-space text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {data && data.total > 20 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-muted-foreground/10">
                <p className="font-space text-xs text-muted-foreground">
                  Page {page} of {Math.ceil(data.total / 20)}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-3 py-1 font-space text-xs border border-muted-foreground/20 disabled:opacity-40 hover:border-accent">
                    Prev
                  </button>
                  <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(data.total / 20)}
                    className="px-3 py-1 font-space text-xs border border-muted-foreground/20 disabled:opacity-40 hover:border-accent">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;