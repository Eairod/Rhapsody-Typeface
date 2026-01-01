import { Link, useLocation } from "wouter";
import { Home, Target, TrendingUp, Users, User, Wallet } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { points, xp } = useStore();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Target, label: "Missions", path: "/missions" },
    { icon: TrendingUp, label: "Predict", path: "/predictions" },
    { icon: Users, label: "Partners", path: "/partners" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center bg-neutral-900">
      <div className="w-full max-w-md bg-background min-h-screen flex flex-col relative shadow-2xl border-x border-border/50">
        
        {/* Header */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-4 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-xl">
              R
            </div>
            <span className="font-heading font-bold text-lg tracking-wider">RHAPSODY</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs font-medium">
             <div className="flex flex-col items-end">
                <span className="text-primary font-bold">{points} PTS</span>
                <span className="text-muted-foreground">{xp} XP</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
                <User className="w-4 h-4 text-muted-foreground" />
             </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="h-20 border-t border-border/50 bg-background/90 backdrop-blur-lg fixed bottom-0 w-full max-w-md z-50 px-6 pb-4 pt-2 flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div className={cn(
                  "flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 active:scale-95 group",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}>
                  <div className={cn(
                    "p-1.5 rounded-xl transition-colors",
                    isActive && "bg-primary/10"
                  )}>
                    <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
                  </div>
                  <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
