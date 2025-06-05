import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  CreditCard, 
  PieChart, 
  Wallet, 
  CalendarRange, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const NavItem = ({ icon: Icon, label, href, isCollapsed, isActive }: NavItemProps) => {
  return (
    <Link to={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3",
          isActive 
            ? "bg-accent text-accent-foreground font-medium" 
            : "hover:bg-accent/50 text-muted-foreground"
        )}
      >
        <Icon className={cn("h-5 w-5", isActive ? "text-accent" : "")} />
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export default function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const { logout, user } = useAuth();
  
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: CreditCard, label: "Transactions", href: "/transactions" },
    { icon: Wallet, label: "Accounts", href: "/accounts" },
    { icon: PieChart, label: "Budgets", href: "/budgets" },
    { icon: CalendarRange, label: "Recurring", href: "/recurring" },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300 ease-in-out h-screen sticky top-0",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b">
        <div className="flex items-center gap-2 font-semibold w-full">
          {!isCollapsed && (
            <div className="font-bold text-xl">
              <span className="text-primary">Tango</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsCollapsed(prev => !prev)}
            className="ml-auto"
          >
            {isCollapsed ? <Menu size={18} /> : <X size={18} />}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-4 px-2">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isCollapsed={isCollapsed}
              isActive={location.pathname === item.href}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-2 mt-auto border-t">
        {!isCollapsed && (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            {user?.name}
          </div>
        )}
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 px-3 text-muted-foreground hover:bg-accent/50",
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}