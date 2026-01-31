import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';

interface ProductQuickViewProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductQuickView = ({ product, onClose, onAddToCart }: ProductQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);

  const formatMaterial = (material: string) => {
    return material.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Image */}
          <div className="aspect-square bg-secondary/50 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <span className="text-accent uppercase tracking-wider font-medium">
                  {product.category}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground capitalize">
                  {product.subType.replace(/-/g, ' ')}
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                {product.name}
              </h2>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold">${product.price.toFixed(2)}</span>
              <span className="text-muted-foreground">/{product.priceUnit}</span>
            </div>

            {/* Stock Status */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 text-sm ${
              product.stock > 1000 
                ? 'bg-green-500/10 text-green-400' 
                : product.stock > 100 
                  ? 'bg-accent/10 text-accent' 
                  : 'bg-red-500/10 text-red-400'
            }`}>
              <span className="w-2 h-2 rounded-full bg-current" />
              {product.stock > 1000 ? 'In Stock' : `${product.stock} units available`}
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary/50 p-3">
                <span className="text-xs text-muted-foreground block">Size</span>
                <span className="font-medium">{product.size}</span>
              </div>
              {product.length && (
                <div className="bg-secondary/50 p-3">
                  <span className="text-xs text-muted-foreground block">Length</span>
                  <span className="font-medium">{product.length}</span>
                </div>
              )}
              <div className="bg-secondary/50 p-3">
                <span className="text-xs text-muted-foreground block">Material</span>
                <span className="font-medium">{formatMaterial(product.material)}</span>
              </div>
              <div className="bg-secondary/50 p-3">
                <span className="text-xs text-muted-foreground block">Finish</span>
                <span className="font-medium capitalize">{product.finish.replace(/-/g, ' ')}</span>
              </div>
              {product.headType && (
                <div className="bg-secondary/50 p-3">
                  <span className="text-xs text-muted-foreground block">Head Type</span>
                  <span className="font-medium capitalize">{product.headType}</span>
                </div>
              )}
              {product.threadPitch && (
                <div className="bg-secondary/50 p-3">
                  <span className="text-xs text-muted-foreground block">Thread Pitch</span>
                  <span className="font-medium">{product.threadPitch}</span>
                </div>
              )}
            </div>

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="border-t border-border/30 pt-4">
                <h4 className="font-medium text-sm uppercase tracking-wide mb-3">
                  Specifications
                </h4>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/30">
              <div className="flex items-center bg-secondary/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button 
                variant="accent" 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
