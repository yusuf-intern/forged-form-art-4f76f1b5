import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { 
  categories, 
  screwTypes, 
  fastenerTypes, 
  materials, 
  finishes, 
  headTypes 
} from '@/data/products';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterSection {
  id: string;
  name: string;
  options: { id: string; name: string }[];
}

export interface ActiveFilters {
  categories: string[];
  subTypes: string[];
  materials: string[];
  finishes: string[];
  headTypes: string[];
}

interface ProductFiltersProps {
  activeFilters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
  productCounts?: Record<string, number>;
}

export const ProductFilters = ({ 
  activeFilters, 
  onFilterChange,
  productCounts = {}
}: ProductFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'categories', 'subTypes', 'materials'
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleFilter = (category: keyof ActiveFilters, value: string) => {
    const current = activeFilters[category];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    onFilterChange({
      ...activeFilters,
      [category]: updated
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      subTypes: [],
      materials: [],
      finishes: [],
      headTypes: []
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);
  const totalActiveFilters = Object.values(activeFilters).flat().length;

  const filterSections: FilterSection[] = [
    {
      id: 'categories',
      name: 'Category',
      options: categories.map(c => ({ id: c.id, name: c.name }))
    },
    {
      id: 'subTypes',
      name: 'Product Type',
      options: [
        ...screwTypes.map(t => ({ id: t.id, name: t.name })),
        ...fastenerTypes.map(t => ({ id: t.id, name: t.name }))
      ]
    },
    {
      id: 'materials',
      name: 'Material',
      options: materials.map(m => ({ id: m.id, name: m.name }))
    },
    {
      id: 'finishes',
      name: 'Finish',
      options: finishes.map(f => ({ id: f.id, name: f.name }))
    },
    {
      id: 'headTypes',
      name: 'Head Type',
      options: headTypes.map(h => ({ id: h.id, name: h.name }))
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold uppercase tracking-wide">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-accent hover:underline underline-offset-2 flex items-center gap-1"
          >
            Clear all ({totalActiveFilters})
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pb-4 border-b border-border/30">
          {Object.entries(activeFilters).map(([category, values]) =>
            values.map(value => (
              <button
                key={`${category}-${value}`}
                onClick={() => toggleFilter(category as keyof ActiveFilters, value)}
                className="text-xs bg-accent/20 text-accent px-2 py-1 flex items-center gap-1 hover:bg-accent/30 transition-colors"
              >
                {value.replace(/-/g, ' ')}
                <X className="w-3 h-3" />
              </button>
            ))
          )}
        </div>
      )}

      {/* Filter Sections */}
      {filterSections.map(section => (
        <div key={section.id} className="border-b border-border/30 pb-4">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between py-2 text-left"
          >
            <span className="font-medium text-sm uppercase tracking-wide">
              {section.name}
            </span>
            {expandedSections.includes(section.id) ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          {expandedSections.includes(section.id) && (
            <div className="mt-2 space-y-2">
              {section.options.map(option => {
                const filterKey = section.id as keyof ActiveFilters;
                const isActive = activeFilters[filterKey]?.includes(option.id);
                const count = productCounts[option.id] || 0;

                return (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer group py-1"
                  >
                    <Checkbox
                      checked={isActive}
                      onCheckedChange={() => toggleFilter(filterKey, option.id)}
                      className="border-border/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <span className={`text-sm transition-colors ${
                      isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {option.name}
                    </span>
                    {count > 0 && (
                      <span className="text-xs text-muted-foreground ml-auto font-mono">
                        ({count})
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
