import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface StoreBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const StoreBreadcrumbs = ({ items }: StoreBreadcrumbsProps) => {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="breadcrumb" className="bg-secondary/40 border-b border-border/30">
      <div className="container py-3">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-2">
                {idx === 0 && <Home className="w-3.5 h-3.5 text-muted-foreground" />}
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                {isLast ? (
                  <span className="font-medium text-foreground">{item.label}</span>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
