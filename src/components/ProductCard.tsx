import { Plus, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart, onQuickView }: ProductCardProps) => {
  const formatMaterial = (material: string) => {
    return material.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="group relative">
      <div className="glass-card overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        {/* Image Area */}
        <div className="relative aspect-square bg-secondary/50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Stock Badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-mono px-2 py-1 ${
              product.stock > 1000 
                ? 'bg-green-500/20 text-green-400' 
                : product.stock > 100 
                  ? 'bg-accent/20 text-accent' 
                  : 'bg-red-500/20 text-red-400'
            }`}>
              {product.stock > 1000 ? 'In Stock' : `${product.stock} left`}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={() => onQuickView?.(product)}
              className="w-10 h-10 bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart?.(product)}
              className="w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Category & Type */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-accent uppercase tracking-wider font-medium">
              {product.category}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground capitalize">
              {product.subType.replace('-', ' ')}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Specs */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-secondary px-2 py-0.5 text-muted-foreground">
              {product.size}
            </span>
            {product.length && (
              <span className="text-xs bg-secondary px-2 py-0.5 text-muted-foreground">
                {product.length}
              </span>
            )}
            <span className="text-xs bg-secondary px-2 py-0.5 text-muted-foreground">
              {formatMaterial(product.material)}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between pt-2 border-t border-border/30">
            <div>
              <span className="font-display text-xl font-bold">${product.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground ml-1">/{product.priceUnit}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => onAddToCart?.(product)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
