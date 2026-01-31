import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

interface CategoryGridProps {
  onCategorySelect?: (category: string) => void;
}

const categoryIcons: Record<string, string> = {
  screws: '🔩',
  fasteners: '📎',
  bolts: '🔧',
  nuts: '⚙️',
  washers: '⭕',
  anchors: '⚓',
};

const categoryDescriptions: Record<string, string> = {
  screws: 'Wood, machine, self-tapping, drywall, and deck screws',
  fasteners: 'Rivets, pins, clips, staples, and cable ties',
  bolts: 'Hex bolts, carriage bolts, lag bolts, and more',
  nuts: 'Hex nuts, lock nuts, wing nuts, and specialty nuts',
  washers: 'Flat, lock, fender, and specialty washers',
  anchors: 'Concrete, hollow wall, and expansion anchors',
};

export const CategoryGrid = ({ onCategorySelect }: CategoryGridProps) => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-16 bg-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">
                Shop by Category
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Browse Our Inventory
            </h2>
          </div>
          <button 
            onClick={() => onCategorySelect?.('all')}
            className="hidden md:flex items-center gap-2 text-accent hover:underline underline-offset-4 font-medium"
          >
            View All Products
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Grid - Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect?.(category.id)}
              className={`group relative overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }`}
            >
              <div className={`glass-card h-full p-6 md:p-8 flex flex-col justify-between ${
                index === 0 ? 'min-h-[280px]' : 'min-h-[140px]'
              }`}>
                {/* Icon & Count */}
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{categoryIcons[category.id]}</span>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1">
                    {category.count} types
                  </span>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {categoryDescriptions[category.id]}
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
