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
  SidebarTrigger,
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
} from "lucide-react";

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
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    navigate("/admin");
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-foreground border-r-0 transition-all duration-300`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-background/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent flex items-center justify-center">
            <Wrench className="h-5 w-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bebas text-xl text-background tracking-wider">
                IRON<span className="text-accent">GRIP</span>
              </h1>
              <p className="text-background/50 font-space text-[10px] tracking-wider">
                ADMIN PORTAL
              </p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="py-4">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-background/40 font-space text-[10px] tracking-widest px-4 mb-2">
              MAIN MENU
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-4 py-3 mx-2 transition-all font-space text-sm ${
                        isActive(item.url)
                          ? "bg-accent text-accent-foreground"
                          : "text-background/70 hover:text-background hover:bg-background/10"
                      }`}
                      activeClassName="bg-accent text-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          {!collapsed && (
            <SidebarGroupLabel className="text-background/40 font-space text-[10px] tracking-widest px-4 mb-2">
              SYSTEM
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-4 py-3 mx-2 transition-all font-space text-sm ${
                        isActive(item.url)
                          ? "bg-accent text-accent-foreground"
                          : "text-background/70 hover:text-background hover:bg-background/10"
                      }`}
                      activeClassName="bg-accent text-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 mx-2 w-full transition-all font-space text-sm text-background/70 hover:text-background hover:bg-background/10"
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>Logout</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 border-t border-background/10">
        <SidebarTrigger className="text-background/50 hover:text-background" />
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
