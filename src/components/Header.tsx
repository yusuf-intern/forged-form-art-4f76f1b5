import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Phone, Truck } from 'lucide-react';
import alamdarLogo from '@/assets/alamdar-logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  cartCount?: number;
  onNavigate?: (section: string) => void;
}

export const Header = ({ cartCount = 0, onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Catalog', href: 'catalog' },
    { label: 'Screws', href: 'screws' },
    { label: 'Fasteners', href: 'fasteners' },
    { label: 'Bolts & Nuts', href: 'bolts' },
    { label: 'Anchors', href: 'anchors' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-foreground text-background py-2">
        <div className="container flex items-center justify-between text-xs tracking-wider uppercase">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              1-800-HARDWARE
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Truck className="w-3 h-3" />
              Free shipping over $99
            </span>
          </div>
          <span className="text-muted-foreground">Est. 1952</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="glass-header">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer" 
              onClick={() => onNavigate?.('home')}
            >
              <div className="flex items-center gap-3">
                <img src={alamdarLogo} alt="Alamdar logo" className="h-10 w-auto" />
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    ALAM<span className="text-accent">DAR</span>
                  </h1>
                  <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase -mt-1">
                    Industrial Hardware
                  </p>
                </div>
              </div>
            </div>

            {/* Search - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search screws, bolts, fasteners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-secondary/50 border-border/50 focus:border-accent text-sm"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => onNavigate?.(link.href)}
                  className="text-sm font-medium tracking-wide text-foreground/80 hover:text-accent transition-colors uppercase"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 hover:bg-secondary/50 rounded-sm transition-colors">
                <Search className="w-5 h-5" />
              </button>
              
              <button className="relative p-2 hover:bg-secondary/50 rounded-sm transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="lg:hidden p-2 hover:bg-secondary/50 rounded-sm transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-border/30">
          <div className="container py-4">
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/50"
              />
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    onNavigate?.(link.href);
                    setIsMenuOpen(false);
                  }}
                  className="py-3 px-4 text-left font-medium tracking-wide hover:bg-secondary/50 transition-colors uppercase text-sm"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
