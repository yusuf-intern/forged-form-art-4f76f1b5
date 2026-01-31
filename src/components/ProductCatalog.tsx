import { useState, useMemo } from 'react';
import { Grid3X3, LayoutList, SlidersHorizontal, X } from 'lucide-react';
import { products, Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ProductFilters, ActiveFilters } from './ProductFilters';
import { ProductQuickView } from './ProductQuickView';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductCatalogProps {
  initialCategory?: string;
}

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'stock-desc';

export const ProductCatalog = ({ initialCategory }: ProductCatalogProps) => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: initialCategory && initialCategory !== 'all' ? [initialCategory] : [],
    subTypes: [],
    materials: [],
    finishes: [],
    headTypes: []
  });
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (activeFilters.categories.length > 0 && 
          !activeFilters.categories.includes(product.category)) {
        return false;
      }

      // SubType filter
      if (activeFilters.subTypes.length > 0 && 
          !activeFilters.subTypes.includes(product.subType)) {
        return false;
      }

      // Material filter
      if (activeFilters.materials.length > 0 && 
          !activeFilters.materials.includes(product.material)) {
        return false;
      }

      // Finish filter
      if (activeFilters.finishes.length > 0 && 
          !activeFilters.finishes.includes(product.finish)) {
        return false;
      }

      // Head type filter
      if (activeFilters.headTypes.length > 0 && 
          product.headType && 
          !activeFilters.headTypes.includes(product.headType)) {
        return false;
      }

      return true;
    });
  }, [activeFilters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'stock-desc':
        sorted.sort((a, b) => b.stock - a.stock);
        break;
    }
    
    return sorted;
  }, [filteredProducts, sortBy]);

  // Calculate product counts for filters
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    products.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1;
      counts[product.subType] = (counts[product.subType] || 0) + 1;
      counts[product.material] = (counts[product.material] || 0) + 1;
      counts[product.finish] = (counts[product.finish] || 0) + 1;
      if (product.headType) {
        counts[product.headType] = (counts[product.headType] || 0) + 1;
      }
    });
    
    return counts;
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <section className="py-24" id="catalog">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-16 bg-accent" />
            <span className="text-accent font-medium tracking-widest uppercase text-sm">
              Product Catalog
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              All Products
            </h2>
            <p className="text-muted-foreground">
              Showing {sortedProducts.length} of {products.length} products
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <ProductFilters
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
                productCounts={productCounts}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border/30">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileFilters(true)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-40 bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                    <SelectItem value="price-desc">Price (High-Low)</SelectItem>
                    <SelectItem value="stock-desc">Availability</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-1 bg-secondary/50 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products match your filters</p>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveFilters({
                    categories: [],
                    subTypes: [],
                    materials: [],
                    finishes: [],
                    headTypes: []
                  })}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-secondary/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ProductFilters
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              productCounts={productCounts}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </section>
  );
};
