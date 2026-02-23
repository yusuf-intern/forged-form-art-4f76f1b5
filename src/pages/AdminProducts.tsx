import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { productsApi } from "@/lib/api";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const CATEGORIES = ["screws", "fasteners", "bolts", "nuts", "washers", "anchors"];

const AdminProducts = () => {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["products", { page, search, category }],
    queryFn: () => productsApi.list({
      page,
      page_size: 20,
      search: search || undefined,
      category: category === "all" ? undefined : category,
    }),
  });

  const deactivate = useMutation({
    mutationFn: (id: number) => productsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-bebas text-4xl text-foreground tracking-wide">PRODUCTS</h1>
            <p className="text-muted-foreground font-space text-sm mt-1">{data?.total ?? 0} active products</p>
          </div>
          <div className="flex gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="pl-9 w-56 font-space text-sm h-9"
              />
            </form>
            <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1); }}>
              <SelectTrigger className="w-36 font-space text-sm h-9">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
                  {["SKU", "Name", "Category", "Material", "Size", "Price", "Stock", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-space text-xs tracking-wider text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.items.map((product) => (
                  <tr key={product.id} className="border-t border-muted-foreground/10 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-4 font-space text-xs text-muted-foreground">{product.sku}</td>
                    <td className="px-4 py-4">
                      <p className="font-space text-sm text-foreground">{product.name}</p>
                      <p className="font-space text-xs text-muted-foreground">{product.sub_type}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-space text-xs capitalize px-2 py-1 bg-accent/10 text-accent">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-space text-sm text-muted-foreground capitalize">
                      {product.material.replace("-", " ")}
                    </td>
                    <td className="px-4 py-4 font-space text-sm text-foreground">{product.size}</td>
                    <td className="px-4 py-4 font-bebas text-lg text-foreground">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <span className={`font-space text-sm ${product.stock < 100 ? "text-red-500" : "text-foreground"}`}>
                        {product.stock.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => deactivate.mutate(product.id)}
                        className="font-space text-xs text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        Deactivate
                      </button>
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

export default AdminProducts;