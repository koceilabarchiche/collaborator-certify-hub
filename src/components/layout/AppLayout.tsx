
import { useState, useEffect } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  User, 
  Award, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Search,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-4 relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-9 h-9 w-full md:w-[300px] lg:w-[400px] rounded-full bg-secondary border-none"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Avatar className="h-9 w-9">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className={cn("animate-fade-in", { "opacity-0": !isMounted })}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      path: "/"
    },
    {
      title: "Collaborateurs",
      icon: User,
      path: "/collaborators"
    },
    {
      title: "Certifications",
      icon: Award,
      path: "/certifications"
    },
    {
      title: "Paramètres",
      icon: Settings,
      path: "/settings"
    }
  ];

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader>
        <Link to="/" className="flex items-center space-x-2 px-4 py-6">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-primary-foreground">
            <Award className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg">CertifyHub</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn("group", {
                        "text-primary": location.pathname === item.path
                      })}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-4">
          <Button 
            variant="outline" 
            className="w-full justify-start text-muted-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppLayout;
