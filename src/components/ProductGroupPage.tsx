import { ArrowRight } from 'lucide-react';
import { ToolGroup, CatalogProduct, Type1Product } from '@/data/catalogData';

interface ProductGroupPageProps {
  group: ToolGroup;
  onProductSelect: (product: CatalogProduct) => void;
  onType1Click: (type1: Type1Product) => void;
}

export const ProductGroupPage = ({ group, onProductSelect, onType1Click }: ProductGroupPageProps) => {
  return (
    <div className="space-y-12">
      {/* Group Header */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{group.icon}</span>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">{group.name}</h2>
            <p className="text-muted-foreground mt-1">{group.description}</p>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      {group.products.map((product) => (
        <div key={product.id} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border/30 pb-3">
            <h3 className="font-display text-2xl font-bold">{product.name}</h3>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5">{product.type1Items.length} products</span>
          </div>

          {/* Type 1 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.type1Items.map((type1) => (
              <button
                key={type1.id}
                onClick={() => onType1Click(type1)}
                className="group text-left"
              >
                <div className="glass-card overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className="aspect-[4/3] bg-secondary/50 overflow-hidden relative">
                    <img src={type1.image} alt={type1.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {type1.popular && (
                      <span className="absolute top-3 left-3 text-xs bg-accent text-accent-foreground px-2 py-1 font-medium uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <h4 className="font-display text-lg font-bold group-hover:text-accent transition-colors">
                      {type1.name}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{type1.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-muted-foreground">from</span>
                        <span className="font-display text-xl font-bold">${type1.basePrice.toFixed(2)}</span>
                      </div>
                      <span className="text-xs text-accent flex items-center gap-1 group-hover:underline">
                        Configure <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
