import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          {/* Mobile Header with Trigger */}
          <div className="md:hidden sticky top-0 z-50 bg-foreground p-4 flex items-center gap-3 border-b border-background/10">
            <SidebarTrigger className="text-background hover:text-accent">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <span className="font-bebas text-xl text-background tracking-wider">
              IRON<span className="text-accent">GRIP</span>
            </span>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
