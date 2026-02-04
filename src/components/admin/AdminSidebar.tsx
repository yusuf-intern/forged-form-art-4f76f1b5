import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
];

const settingsNavItems = [
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const { state, toggleSidebar, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    navigate("/admin");
  };

  const handleNavClick = () => {
    // Close mobile sidebar on navigation
    setOpenMobile(false);
  };

  return (
    <Sidebar
      className="bg-foreground border-r-0"
      collapsible="icon"
    >
      {/* Logo Header */}
      <div className="p-4 border-b border-background/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent flex items-center justify-center flex-shrink-0">
            <Wrench className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="font-bebas text-xl text-background tracking-wider">
              IRON<span className="text-accent">GRIP</span>
            </h1>
            <p className="text-background/50 font-space text-[10px] tracking-wider">
              ADMIN PORTAL
            </p>
          </div>
        </div>
      </div>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-background/40 font-space text-[10px] tracking-widest px-4 mb-2 group-data-[collapsible=icon]:hidden">
            MAIN MENU
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    tooltip={item.title}
                    isActive={isActive(item.url)}
                  >
                    <NavLink
                      to={item.url}
                      onClick={handleNavClick}
                      className={`flex items-center gap-3 px-4 py-3 mx-2 transition-all font-space text-sm ${
                        isActive(item.url)
                          ? "bg-accent text-accent-foreground"
                          : "text-background/70 hover:text-background hover:bg-background/10"
                      }`}
                      activeClassName="bg-accent text-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-background/40 font-space text-[10px] tracking-widest px-4 mb-2 group-data-[collapsible=icon]:hidden">
            SYSTEM
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    tooltip={item.title}
                    isActive={isActive(item.url)}
                  >
                    <NavLink
                      to={item.url}
                      onClick={handleNavClick}
                      className={`flex items-center gap-3 px-4 py-3 mx-2 transition-all font-space text-sm ${
                        isActive(item.url)
                          ? "bg-accent text-accent-foreground"
                          : "text-background/70 hover:text-background hover:bg-background/10"
                      }`}
                      activeClassName="bg-accent text-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  tooltip="Logout"
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 mx-2 w-full transition-all font-space text-sm text-background/70 hover:text-background hover:bg-background/10"
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Collapse toggle - Desktop only */}
      <div className="p-4 border-t border-background/10 hidden md:block">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-center text-background/50 hover:text-background hover:bg-background/10"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span className="font-space text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>

      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
