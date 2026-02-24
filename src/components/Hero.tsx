import { ArrowRight, Shield, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import alamFastenersLogo from '@/assets/alam-fasteners-logo.png';
import alamTechLogo from '@/assets/alam-tech-logo.png';

interface HeroProps {
  onNavigate?: (section: string) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Accent Shapes */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-2xl" />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">
                Professional Grade
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
              BUILT
              <br />
              <span className="text-stroke">TO LAST</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Over 10,000 precision-engineered fasteners, screws, and hardware. 
              From DIY projects to industrial applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => onNavigate?.('catalog')}
                className="group"
              >
                Browse Catalog
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate?.('contact')}
              >
                Request Quote
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Quality Assured</p>
                  <p className="text-xs text-muted-foreground">ISO 9001 Certified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Fast Shipping</p>
                  <p className="text-xs text-muted-foreground">Same day dispatch</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Trusted Brand</p>
                  <p className="text-xs text-muted-foreground">Industry expertise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual - Stats + Sub-brands */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main Stats Card */}
              <div className="glass-card p-8 space-y-8">
                <div className="space-y-2">
                  <span className="text-accent font-medium tracking-wider uppercase text-xs">
                    Inventory Status
                  </span>
                  <h3 className="font-display text-4xl font-bold">10,847</h3>
                  <p className="text-muted-foreground">Products in Stock</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="font-display text-2xl font-bold">156</p>
                    <p className="text-sm text-muted-foreground">Categories</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-display text-2xl font-bold">24hr</p>
                    <p className="text-sm text-muted-foreground">Dispatch</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-display text-2xl font-bold">99.8%</p>
                    <p className="text-sm text-muted-foreground">In Stock Rate</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-display text-2xl font-bold">4.9★</p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>

                {/* Sub-brand Logos */}
                <div className="pt-6 border-t border-border/30">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Our Brands</p>
                  <div className="flex items-center gap-6">
                    <div className="flex-1 bg-secondary/60 p-3 flex items-center justify-center">
                      <img src={alamFastenersLogo} alt="Alam Fasteners" className="h-10 md:h-12 w-auto object-contain" />
                    </div>
                    <div className="flex-1 bg-secondary/60 p-3 flex items-center justify-center">
                      <img src={alamTechLogo} alt="Alam Tech" className="h-10 md:h-12 w-auto object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tags */}
              <div className="absolute -left-4 top-1/4 glass-card px-4 py-2 text-sm font-medium">
                Screws & Bolts
              </div>
              <div className="absolute -right-4 bottom-1/3 glass-card px-4 py-2 text-sm font-medium">
                Anchors
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
