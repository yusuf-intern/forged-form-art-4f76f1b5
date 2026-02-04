import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { products, categories, materials, finishes, headTypes } from "@/data/products";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import type { Product } from "@/data/products";

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    // Static demo - would show confirmation in real app
    alert(`Demo: Would delete ${product.name}`);
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="font-bebas text-3xl md:text-4xl text-foreground tracking-wide">PRODUCTS</h1>
            <p className="text-muted-foreground font-space text-sm mt-1">
              Manage your product catalog ({products.length} items)
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bebas tracking-wider w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                ADD PRODUCT
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background border-muted-foreground/20 max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
              <DialogHeader>
                <DialogTitle className="font-bebas text-2xl tracking-wide">ADD NEW PRODUCT</DialogTitle>
              </DialogHeader>
              <ProductForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-muted-foreground/20 font-space"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-muted/30 border-muted-foreground/20 font-space">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Table */}
        <div className="bg-muted/30 border border-muted-foreground/10 overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="border-muted-foreground/10 hover:bg-transparent">
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">ID</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">PRODUCT</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">CATEGORY</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">MATERIAL</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">PRICE</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground">STOCK</TableHead>
                <TableHead className="font-bebas text-sm tracking-wider text-muted-foreground text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-muted-foreground/10">
                  <TableCell className="font-space text-xs text-muted-foreground">{product.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-space text-sm text-foreground">{product.name}</p>
                      <p className="font-space text-xs text-muted-foreground">{product.size} {product.length || ''}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-space text-xs uppercase tracking-wider px-2 py-1 bg-muted text-muted-foreground">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="font-space text-sm capitalize">{product.material.replace('-', ' ')}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bebas text-lg text-foreground">${product.price.toFixed(2)}</p>
                      <p className="font-space text-[10px] text-muted-foreground">{product.priceUnit}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-space text-sm ${product.stock < 1000 ? 'text-amber-600' : 'text-foreground'}`}>
                      {product.stock.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleView(product)}
                        className="h-8 w-8 p-0 hover:bg-accent/20"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(product)}
                        className="h-8 w-8 p-0 hover:bg-accent/20"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(product)}
                        className="h-8 w-8 p-0 hover:bg-destructive/20 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-background border-muted-foreground/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-bebas text-2xl tracking-wide">PRODUCT DETAILS</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Name</p>
                    <p className="font-space text-foreground">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">ID</p>
                    <p className="font-space text-foreground">{selectedProduct.id}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Category</p>
                    <p className="font-space text-foreground capitalize">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Sub Type</p>
                    <p className="font-space text-foreground capitalize">{selectedProduct.subType.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Material</p>
                    <p className="font-space text-foreground capitalize">{selectedProduct.material.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Finish</p>
                    <p className="font-space text-foreground capitalize">{selectedProduct.finish.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Price</p>
                    <p className="font-bebas text-2xl text-accent">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="font-space text-xs text-muted-foreground uppercase tracking-wider">Stock</p>
                    <p className="font-bebas text-2xl text-foreground">{selectedProduct.stock.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <p className="font-space text-xs text-muted-foreground uppercase tracking-wider mb-2">Description</p>
                  <p className="font-space text-sm text-foreground">{selectedProduct.description}</p>
                </div>
                <div>
                  <p className="font-space text-xs text-muted-foreground uppercase tracking-wider mb-2">Specifications</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="bg-muted/30 p-2">
                        <p className="font-space text-[10px] text-muted-foreground">{key}</p>
                        <p className="font-space text-sm text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-background border-muted-foreground/20 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-bebas text-2xl tracking-wide">EDIT PRODUCT</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <ProductForm product={selectedProduct} onClose={() => setIsEditDialogOpen(false)} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "screws",
    subType: product?.subType || "",
    material: product?.material || "steel",
    finish: product?.finish || "plain",
    headType: product?.headType || "flat",
    size: product?.size || "",
    length: product?.length || "",
    price: product?.price.toString() || "",
    priceUnit: product?.priceUnit || "each",
    stock: product?.stock.toString() || "",
    description: product?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static demo - just close the form
    alert(`Demo: Would ${product ? 'update' : 'create'} product "${formData.name}"`);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Product Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-muted/30 border-muted-foreground/20 font-space mt-1"
            placeholder="Enter product name"
          />
        </div>
        
        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Category</Label>
          <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v as typeof formData.category })}>
            <SelectTrigger className="bg-muted/30 border-muted-foreground/20 font-space mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Sub Type</Label>
          <Input
            value={formData.subType}
            onChange={(e) => setFormData({ ...formData, subType: e.target.value })}
            className="bg-muted/30 border-muted-foreground/20 font-space mt-1"
            placeholder="e.g., wood-screw"
          />
        </div>

        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Material</Label>
          <Select value={formData.material} onValueChange={(v) => setFormData({ ...formData, material: v as typeof formData.material })}>
            <SelectTrigger className="bg-muted/30 border-muted-foreground/20 font-space mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {materials.map((mat) => (
                <SelectItem key={mat.id} value={mat.id}>{mat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Finish</Label>
          <Select value={formData.finish} onValueChange={(v) => setFormData({ ...formData, finish: v as typeof formData.finish })}>
            <SelectTrigger className="bg-muted/30 border-muted-foreground/20 font-space mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {finishes.map((fin) => (
                <SelectItem key={fin.id} value={fin.id}>{fin.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Head Type</Label>
          <Select value={formData.headType} onValueChange={(v) => setFormData({ ...formData, headType: v as typeof formData.headType })}>
            <SelectTrigger className="bg-muted/30 border-muted-foreground/20 font-space mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {headTypes.map((ht) => (
                <SelectItem key={ht.id} value={ht.id}>{ht.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Size</Label>
          <Input
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="bg-muted/30 border-muted-foreground/20 font-space mt-1"
            placeholder="e.g., #8 or M6"
          />
        </div>

        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Length</Label>
          <Input
            value={formData.length}
            onChange={(e) => setFormData({ ...formData, length: e.target.value })}
            className="bg-muted/30 border-muted-foreground/20 font-space mt-1"
            placeholder="e.g., 1-1/2&quot;"
          />
        </div>

        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Price ($)</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="bg-muted/30 border-muted-foreground/20 font-space mt-1"
            placeholder="0.00"
          />
        </div>

        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Price Unit</Label>
          <Input
            value={formData.priceUnit}
            onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
            className="bg-muted/30 border-muted-foreground/20 font-space mt-1"
            placeholder="e.g., box/100"
          />
        </div>

        <div>
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Stock</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="bg-muted/30 border-muted-foreground/20 font-space mt-1"
            placeholder="0"
          />
        </div>

        <div className="col-span-2">
          <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-muted/30 border-muted-foreground/20 font-space mt-1 min-h-24"
            placeholder="Product description..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-muted-foreground/10">
        <Button type="button" variant="outline" onClick={onClose} className="font-space">
          Cancel
        </Button>
        <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bebas tracking-wider">
          {product ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
        </Button>
      </div>
    </form>
  );
};

export default AdminProducts;
