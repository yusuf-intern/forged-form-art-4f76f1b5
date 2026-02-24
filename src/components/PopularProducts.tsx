import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPopularProducts, Type1Product } from '@/data/catalogData';

interface PopularProductsProps {
  onProductClick: (product: Type1Product & { groupId: string; productName: string }) => void;
}

export const PopularProducts = ({ onProductClick }: PopularProductsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const popular = getPopularProducts();

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (popular.length === 0) return null;

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-xs">
                Most Popular
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Best Sellers
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-1.5 px-1.5">
          {popular.map((item) => (
            <button
              key={item.id}
              onClick={() => onProductClick(item)}
              className="group flex-shrink-0 w-[280px] text-left"
            >
              <div className="glass-card overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <div className="aspect-[4/3] bg-secondary/50 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.productName}</span>
                  <h3 className="font-display text-xl font-bold group-hover:text-accent transition-colors">{item.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-muted-foreground">from</span>
                    <span className="font-display text-2xl font-bold text-accent">${item.basePrice.toFixed(2)}</span>
                  </div>
                  {item.material && (
                    <span className="inline-block text-xs bg-secondary px-2 py-0.5 text-muted-foreground">{item.material}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
