import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-20 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl font-bold mb-4">
              IRON<span className="text-accent">GRIP</span>
            </h2>
            <p className="text-background/60 text-sm mb-6">
              Professional-grade hardware and fasteners. Serving contractors, manufacturers, and DIY enthusiasts since 1952.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-background/10 hover:bg-accent hover:text-foreground flex items-center justify-center transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-background/10 hover:bg-accent hover:text-foreground flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-6">
              Products
            </h3>
            <ul className="space-y-3">
              {['Screws', 'Fasteners', 'Bolts', 'Nuts', 'Washers', 'Anchors'].map(item => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-background/60 hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Partners', 'Press', 'Blog'].map(item => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-background/60 hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-background/60">Sales & Support</p>
                  <p className="font-medium">1-800-HARDWARE</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-background/60">Email</p>
                  <p className="font-medium">sales@irongrip.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-background/60">Warehouse</p>
                  <p className="font-medium">Detroit, MI 48201</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © 2024 IronGrip Industrial Hardware. All rights reserved.
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
