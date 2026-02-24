import { Mail, Phone, MapPin } from 'lucide-react';
import alamdarLogo from '@/assets/alamdar-logo.png';
import alamFastenersLogo from '@/assets/alam-fasteners-logo.png';
import alamTechLogo from '@/assets/alam-tech-logo.png';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-20 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={alamdarLogo} alt="Alamdar logo" className="h-10 w-auto" />
              <h2 className="font-display text-2xl font-bold">
                ALAM<span className="text-accent">DAR</span>
              </h2>
            </div>
            <p className="text-background/60 text-sm mb-6">
              Professional-grade hardware and fasteners. Serving contractors, manufacturers, and DIY enthusiasts across the U.A.E.
            </p>
            {/* Sub-brands */}
            <div className="flex items-center gap-3 mb-6">
              <img src={alamFastenersLogo} alt="Alam Fasteners" className="h-8 w-auto opacity-80" />
              <img src={alamTechLogo} alt="Alam Tech" className="h-8 w-auto opacity-80" />
            </div>
            {/* Social */}
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/alamdar_hardware" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Head Office */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-6">
              Head Office — Sharjah
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-background/60">P.O. BOX 150316, Sharjah - U.A.E.</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+97165354751" className="hover:text-accent transition-colors">+971 6 5354751</a>
                  <span className="text-background/40 text-xs ml-1">(EXT: 101, 102, 104)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:sales@alamdarhardware.com" className="hover:text-accent transition-colors">sales@alamdarhardware.com</a>
              </li>
            </ul>
          </div>

          {/* Sharjah Showroom */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-6">
              Showroom — Sharjah
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-background/60">Near Bin Ladin Signal, Ind. Area No. 11, Sharjah</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+97165354751" className="hover:text-accent transition-colors">+971 6 5354751</a>
                  <span className="text-background/40 text-xs ml-1">(EXT: 201, 202)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:shjsales@alamdarhardware.com" className="hover:text-accent transition-colors">shjsales@alamdarhardware.com</a>
              </li>
            </ul>
          </div>

          {/* Ajman Showroom */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-6">
              Showroom — Ajman
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-background/60">Br. Al Jurf Shop No.12, Behind China Mall, Al Jerf Industrial Area 3, Ajman</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+97165354751" className="hover:text-accent transition-colors">+971 6 5354751</a>
                  <span className="text-background/40 text-xs ml-1">(EXT: 401, 402)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:jurfsales@alamdarhardware.com" className="hover:text-accent transition-colors">jurfsales@alamdarhardware.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} Alamdar Hardware Trading LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-background/40">
            <a href="#" className="hover:text-background transition-colors">Privacy</a>
            <a href="#" className="hover:text-background transition-colors">Terms</a>
            <a href="#" className="hover:text-background transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
