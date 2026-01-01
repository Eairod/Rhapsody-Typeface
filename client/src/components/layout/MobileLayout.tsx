import { Link, useLocation } from "wouter";
import { Home, Target, TrendingUp, Users, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import logoFull from "@assets/LOGOTIPO_1767226191405.png";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { points, xp } = useStore();

  const navItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: Target, label: "Missões", path: "/missions" },
    { icon: TrendingUp, label: "Previsões", path: "/predictions" },
    { icon: ShoppingBag, label: "Loja", path: "/shop" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center bg-neutral-900 font-sans">
      <div className="w-full max-w-md bg-background min-h-screen flex flex-col relative shadow-2xl border-x border-border/50">
        
        {/* Header */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-4 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Link href="/">
              <img src={logoFull} alt="Rhapsody" className="h-6 w-auto cursor-pointer" />
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end leading-none">
                <span className="text-primary font-black text-xs">{points} PTS</span>
                <span className="text-muted-foreground text-[10px] font-bold">{xp} XP</span>
             </div>
             <Link href="/profile">
               <div className={cn(
                 "w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border overflow-hidden cursor-pointer",
                 location === "/profile" && "border-primary"
               )}>
                  <User className={cn("w-4 h-4 text-muted-foreground", location === "/profile" && "text-primary")} />
               </div>
             </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="h-20 border-t border-border/50 bg-background/90 backdrop-blur-lg fixed bottom-0 w-full max-w-md z-50 px-4 pb-4 pt-2 flex items-center justify-between">
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
                    <item.icon className={cn("w-5 h-5", isActive && "fill-current")} />
                  </div>
                  <span className="text-[9px] font-black tracking-wider uppercase">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
