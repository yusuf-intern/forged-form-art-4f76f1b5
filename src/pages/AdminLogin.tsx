import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, ArrowRight } from "lucide-react";
import alamdarLogo from '@/assets/alamdar-logo.png';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Static demo - any credentials work
    if (email && password) {
      navigate("/admin/dashboard");
    } else {
      setError("Please enter credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-accent rotate-45" />
          <div className="absolute bottom-40 right-10 w-96 h-96 border border-accent/50 rotate-12" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-accent/20" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <div className="flex items-center gap-4">
              <img src={alamdarLogo} alt="Alamdar logo" className="h-14 w-auto" />
              <h1 className="font-bebas text-5xl text-background tracking-wider">
                ALAM<span className="text-accent">DAR</span>
              </h1>
            </div>
            <p className="text-background/60 font-space text-sm mt-2 tracking-wide">
              ADMIN CONTROL CENTER
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-2 border-accent pl-6">
              <p className="text-background/80 font-space text-lg leading-relaxed">
                "Industrial-grade management for industrial-grade hardware."
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="font-bebas text-4xl text-accent">2.4K</p>
                <p className="text-background/50 font-space text-xs tracking-wider">PRODUCTS</p>
              </div>
              <div>
                <p className="font-bebas text-4xl text-accent">847</p>
                <p className="text-background/50 font-space text-xs tracking-wider">ORDERS</p>
              </div>
              <div>
                <p className="font-bebas text-4xl text-accent">99.8%</p>
                <p className="text-background/50 font-space text-xs tracking-wider">UPTIME</p>
              </div>
            </div>
          </div>
          
          <p className="text-background/40 font-space text-xs">
            © 2024 ALAMDAR INDUSTRIAL SUPPLY
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12">
            <div className="flex items-center gap-3">
              <img src={alamdarLogo} alt="Alamdar logo" className="h-12 w-auto" />
              <h1 className="font-bebas text-4xl text-foreground tracking-wider">
                ALAM<span className="text-accent">DAR</span>
              </h1>
            </div>
            <p className="text-muted-foreground font-space text-sm tracking-wide">
              ADMIN PORTAL
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bebas text-3xl text-foreground tracking-wide">
              SECURE ACCESS
            </h2>
            <p className="text-muted-foreground font-space text-sm mt-2">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-space text-xs tracking-wider text-muted-foreground">
                EMAIL ADDRESS
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alamdar.com"
                  className="pl-12 h-12 bg-muted/30 border-muted-foreground/20 focus:border-accent font-space"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-space text-xs tracking-wider text-muted-foreground">
                PASSWORD
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="pl-12 h-12 bg-muted/30 border-muted-foreground/20 focus:border-accent font-space"
                />
              </div>
            </div>

            {error && (
              <p className="text-destructive font-space text-sm">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bebas text-lg tracking-wider group"
            >
              ACCESS DASHBOARD
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-muted-foreground/10">
            <p className="text-muted-foreground font-space text-xs text-center">
              Demo Mode: Enter any credentials to access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
