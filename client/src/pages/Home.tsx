import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Flame, Trophy, ArrowRight, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  const { streak, checkIn, points, missions } = useStore();
  
  // Only show first 2 pending missions
  const activeMissions = missions.filter(m => m.status === 'pending').slice(0, 2);

  return (
    <div className="p-4 space-y-6 font-sans">
      
      {/* Brand Hero Area */}
      <section className="relative py-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black mb-0 leading-none tracking-tighter italic">
            RHAPSODY<span className="text-primary text-2xl ml-1">HUB</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase mt-1">Pronto para dominar o dia, player?</p>
        </div>
      </section>

      {/* Daily Check-in */}
      <section>
        <motion.div 
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-5 bg-gradient-to-br from-neutral-800 to-neutral-900 border-border/50 relative overflow-hidden group rounded-none">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Flame className="w-32 h-32 text-primary rotate-12" />
            </div>
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl text-white italic tracking-tighter">CHECK-IN DIÁRIO</h3>
                  <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Mantenha sua ofensiva viva</p>
                </div>
                <div className="flex items-center gap-1.5 bg-background/50 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span className="font-black text-white text-[10px] uppercase">{streak} Dias de Streak</span>
                </div>
              </div>

              <Button 
                onClick={checkIn}
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm h-12 shadow-[0_0_20px_rgba(255,182,0,0.3)] hover:shadow-[0_0_30px_rgba(255,182,0,0.5)] transition-shadow rounded-none"
              >
                FAZER CHECK-IN (+50 XP)
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Rewards Inbox Teaser */}
      <section className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-secondary/5 border-none hover:bg-secondary/10 transition-colors cursor-pointer rounded-none">
           <div className="flex flex-col gap-2">
              <Gift className="w-6 h-6 text-primary" />
              <div>
                <span className="block font-black text-xl leading-none">2</span>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Recompensas</span>
              </div>
           </div>
        </Card>
        <Card className="p-4 bg-secondary/5 border-none hover:bg-secondary/10 transition-colors cursor-pointer rounded-none">
           <div className="flex flex-col gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              <div>
                <span className="block font-black text-xl leading-none">#{42}</span>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Ranking Global</span>
              </div>
           </div>
        </Card>
      </section>

      {/* Active Missions */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-black tracking-tighter italic uppercase">Missões Ativas</h2>
          <Link href="/missions" className="text-[10px] text-primary hover:text-primary/80 font-black tracking-widest flex items-center gap-1">
            VER TODAS <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {activeMissions.map((mission, i) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-4 bg-card border-border/50 flex items-center justify-between group hover:border-primary/30 transition-colors cursor-pointer rounded-none">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-xl">
                      {mission.partner === 'MusicPlayce' ? '🎵' : '⚡'}
                   </div>
                   <div>
                     <h4 className="font-black text-[12px] leading-tight group-hover:text-primary transition-colors tracking-tight uppercase">{mission.title}</h4>
                     <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">{mission.reward} {mission.type.toUpperCase()} • {mission.partner}</span>
                   </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
