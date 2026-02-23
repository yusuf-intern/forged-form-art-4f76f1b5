import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { paymentsApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-600/20 text-green-600";
    case "pending": return "bg-amber-600/20 text-amber-600";
    case "failed": return "bg-red-600/20 text-red-600";
    case "refunded": return "bg-blue-600/20 text-blue-600";
    default: return "bg-muted text-muted-foreground";
  }
};

const AdminPayments = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["payments", { page, status: statusFilter }],
    queryFn: () => paymentsApi.list({ page, page_size: 20, status: statusFilter === "all" ? undefined : statusFilter }),
  });

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-bebas text-4xl text-foreground tracking-wide">PAYMENTS</h1>
            <p className="text-muted-foreground font-space text-sm mt-1">{data?.total ?? 0} total payments</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 font-space text-sm">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {["completed", "pending", "failed", "refunded"].map((s) => (
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
                  {["Payment #", "Order #", "Customer", "Amount", "Method", "Status", "Date"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-space text-xs tracking-wider text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.items.map((payment) => (
                  <tr key={payment.id} className="border-t border-muted-foreground/10 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-4 font-space text-sm text-foreground">{payment.payment_number}</td>
                    <td className="px-4 py-4 font-space text-sm text-muted-foreground">ORD-{payment.order_id}</td>
                    <td className="px-4 py-4 font-space text-sm text-foreground">{payment.customer?.name ?? "—"}</td>
                    <td className="px-4 py-4 font-bebas text-lg text-foreground">${payment.amount.toFixed(2)}</td>
                    <td className="px-4 py-4 font-space text-sm text-muted-foreground">{payment.method}</td>
                    <td className="px-4 py-4">
                      <span className={`font-space text-xs tracking-wider uppercase px-2 py-1 ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-space text-xs text-muted-foreground">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data && data.total > 20 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-muted-foreground/10">
                <p className="font-space text-xs text-muted-foreground">
                  Page {page} of {Math.ceil(data.total / 20)}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-3 py-1 font-space text-xs border border-muted-foreground/20 disabled:opacity-40 hover:border-accent">Prev</button>
                  <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(data.total / 20)}
                    className="px-3 py-1 font-space text-xs border border-muted-foreground/20 disabled:opacity-40 hover:border-accent">Next</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPayments;