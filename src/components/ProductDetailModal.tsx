import { useState, useMemo } from 'react';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Type1Product, Type2Variant, Type3Variant } from '@/data/catalogData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ProductDetailModalProps {
  product: Type1Product;
  onClose: () => void;
}

export const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  const { toast } = useToast();
  const [selectedType2, setSelectedType2] = useState<Type2Variant | null>(null);
  const [selectedType3, setSelectedType3] = useState<Type3Variant | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Current display price: selected type3 price, or cheapest base
  const displayPrice = useMemo(() => {
    if (selectedType3) return selectedType3.price;
    return product.basePrice;
  }, [selectedType3, product.basePrice]);

  const displayImage = selectedType2?.image || selectedType3?.image || product.image;
  const displayName = product.name + (selectedType2 ? ` — ${selectedType2.label}` : '');
  const displayStock = selectedType3?.stock;

  const handleType2Select = (type2Id: string) => {
    const t2 = product.type2Options.find(o => o.id === type2Id) || null;
    setSelectedType2(t2);
    setSelectedType3(null); // reset type3
  };

  const handleType3Select = (type3Id: string) => {
    if (!selectedType2) return;
    const t3 = selectedType2.type3Options.find(o => o.id === type3Id) || null;
    setSelectedType3(t3);
  };

  const handleAddToCart = () => {
    if (!selectedType2 || !selectedType3) return;
    toast({
      title: "Added to cart",
      description: `${quantity}× ${displayName} — ${selectedType3.label}`,
    });
    onClose();
  };

  const cheapestType2 = Math.min(...product.type2Options.map(o => o.priceModifier));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-border shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square bg-secondary/50 flex items-center justify-center">
            <img src={displayImage} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-5">
            <div>
              {product.material && (
                <span className="text-xs text-gold uppercase tracking-wider font-medium">{product.material}</span>
              )}
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">{product.name}</h2>
              <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 pb-4 border-b border-border/30">
              <span className="font-display text-3xl font-bold text-accent">${displayPrice.toFixed(2)}</span>
              {!selectedType3 && <span className="text-sm text-muted-foreground">starting from</span>}
              {selectedType3 && displayStock !== undefined && (
                <span className={`text-xs ml-auto px-2 py-0.5 ${displayStock > 500 ? 'bg-green-100 text-green-700' : 'bg-accent/10 text-accent'}`}>
                  {displayStock > 500 ? 'In Stock' : `${displayStock} left`}
                </span>
              )}
            </div>

            {/* Type 2 Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-wide">{product.type2Label}</label>
              {product.type2Display === 'radio' ? (
                <div className="flex flex-wrap gap-2">
                  {product.type2Options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleType2Select(opt.id)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        selectedType2?.id === opt.id
                          ? 'border-accent bg-accent/10 text-accent font-medium'
                          : 'border-border hover:border-foreground/30'
                      }`}
                    >
                      {opt.label}
                      {opt.priceModifier !== 0 && (
                        <span className={`ml-1 text-xs ${opt.priceModifier > 0 ? 'text-accent' : 'text-green-600'}`}>
                          {opt.priceModifier > 0 ? `+$${opt.priceModifier.toFixed(2)}` : `-$${Math.abs(opt.priceModifier).toFixed(2)}`}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <Select value={selectedType2?.id || ''} onValueChange={handleType2Select}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder={`Select ${product.type2Label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {product.type2Options.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.label}
                        {opt.priceModifier !== 0 && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            {opt.priceModifier > 0 ? `+$${opt.priceModifier.toFixed(2)}` : `-$${Math.abs(opt.priceModifier).toFixed(2)}`}
                          </span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Type 3 Selector - only shows after Type 2 is selected */}
            {selectedType2 && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-sm font-medium uppercase tracking-wide">{product.type3Label}</label>
                {product.type3Display === 'radio' ? (
                  <div className="flex flex-col gap-2">
                    {selectedType2.type3Options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleType3Select(opt.id)}
                        className={`px-4 py-3 text-sm border text-left flex justify-between items-center transition-colors ${
                          selectedType3?.id === opt.id
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-foreground/30'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className="font-display font-bold">${opt.price.toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <Select value={selectedType3?.id || ''} onValueChange={handleType3Select}>
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder={`Select ${product.type3Label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedType2.type3Options.map((opt) => (
                        <SelectItem key={opt.id} value={opt.id}>
                          {opt.label} — ${opt.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            {/* SKU */}
            {selectedType3 && (
              <p className="text-xs text-muted-foreground font-mono">SKU: {selectedType3.sku}</p>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/30">
              <div className="flex items-center bg-secondary/50">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                variant="accent"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!selectedType2 || !selectedType3}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {!selectedType2 ? `Select ${product.type2Label}` : !selectedType3 ? `Select ${product.type3Label}` : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
