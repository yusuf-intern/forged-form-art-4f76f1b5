import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Store, 
  Bell, 
  Shield, 
  Mail, 
  CreditCard, 
  Truck,
  Save
} from "lucide-react";

const AdminSettings = () => {
  const handleSave = () => {
    alert("Demo: Settings would be saved");
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-foreground tracking-wide">SETTINGS</h1>
          <p className="text-muted-foreground font-space text-sm mt-1">
            Configure your store preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Store Settings */}
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                <Store className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-bebas text-xl text-foreground tracking-wide">STORE INFORMATION</h2>
                <p className="font-space text-xs text-muted-foreground">Basic store details</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Store Name</Label>
                <Input 
                  defaultValue="IronGrip Industrial Supply" 
                  className="bg-background border-muted-foreground/20 font-space mt-1"
                />
              </div>
              <div>
                <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Contact Email</Label>
                <Input 
                  defaultValue="contact@irongrip.com" 
                  className="bg-background border-muted-foreground/20 font-space mt-1"
                />
              </div>
              <div>
                <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Phone Number</Label>
                <Input 
                  defaultValue="+1 (555) 123-4567" 
                  className="bg-background border-muted-foreground/20 font-space mt-1"
                />
              </div>
              <div>
                <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Currency</Label>
                <Input 
                  defaultValue="USD" 
                  className="bg-background border-muted-foreground/20 font-space mt-1"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-bebas text-xl text-foreground tracking-wide">NOTIFICATIONS</h2>
                <p className="font-space text-xs text-muted-foreground">Email and alert preferences</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-muted-foreground/10">
                <div>
                  <p className="font-space text-sm text-foreground">New Order Alerts</p>
                  <p className="font-space text-xs text-muted-foreground">Get notified for every new order</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-muted-foreground/10">
                <div>
                  <p className="font-space text-sm text-foreground">Low Stock Warnings</p>
                  <p className="font-space text-xs text-muted-foreground">Alert when products fall below threshold</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-space text-sm text-foreground">Weekly Reports</p>
                  <p className="font-space text-xs text-muted-foreground">Receive weekly performance summary</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-bebas text-xl text-foreground tracking-wide">SECURITY</h2>
                <p className="font-space text-xs text-muted-foreground">Account security settings</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-muted-foreground/10">
                <div>
                  <p className="font-space text-sm text-foreground">Two-Factor Authentication</p>
                  <p className="font-space text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-space text-sm text-foreground">Session Timeout</p>
                  <p className="font-space text-xs text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <Separator className="my-6 bg-muted-foreground/10" />

            <div>
              <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Change Password</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input 
                  type="password" 
                  placeholder="Current password"
                  className="bg-background border-muted-foreground/20 font-space"
                />
                <Input 
                  type="password" 
                  placeholder="New password"
                  className="bg-background border-muted-foreground/20 font-space"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-bebas text-xl text-foreground tracking-wide">PAYMENT</h2>
                <p className="font-space text-xs text-muted-foreground">Payment gateway configuration</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-muted-foreground/10">
                <div>
                  <p className="font-space text-sm text-foreground">Accept Credit Cards</p>
                  <p className="font-space text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-muted-foreground/10">
                <div>
                  <p className="font-space text-sm text-foreground">Accept PayPal</p>
                  <p className="font-space text-xs text-muted-foreground">PayPal checkout integration</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-space text-sm text-foreground">Invoice/Net Terms</p>
                  <p className="font-space text-xs text-muted-foreground">Allow business accounts to pay later</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-muted/30 border border-muted-foreground/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                <Truck className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-bebas text-xl text-foreground tracking-wide">SHIPPING</h2>
                <p className="font-space text-xs text-muted-foreground">Shipping and fulfillment options</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Free Shipping Threshold</Label>
                <Input 
                  defaultValue="$100.00" 
                  className="bg-background border-muted-foreground/20 font-space mt-1"
                />
              </div>
              <div>
                <Label className="font-space text-xs text-muted-foreground uppercase tracking-wider">Default Shipping Rate</Label>
                <Input 
                  defaultValue="$9.99" 
                  className="bg-background border-muted-foreground/20 font-space mt-1"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bebas tracking-wider px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              SAVE SETTINGS
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
