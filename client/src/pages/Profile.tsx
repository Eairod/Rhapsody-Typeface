import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Trophy, Award, History, Wallet, AlertCircle } from "lucide-react";

export default function Profile() {
  const { points, xp, streak, pointsExpiring, expiringDate } = useStore();

  return (
    <div className="p-4 pb-20 font-sans space-y-6">
      <h1 className="text-2xl font-black italic tracking-tighter uppercase">Meu Perfil</h1>

      {/* Profile Header Card */}
      <Card className="p-6 bg-gradient-to-br from-neutral-800 to-neutral-900 border-border/50 rounded-none relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
           <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-2xl border-2 border-white/10">
              R
           </div>
           <div>
              <h2 className="font-black text-xl text-white uppercase tracking-tight">Player_01</h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-[10px] font-black bg-primary/20 text-primary px-2 py-0.5 uppercase tracking-widest border border-primary/30">Nível 5</span>
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{streak} Dias de Streak</span>
              </div>
           </div>
        </div>
      </Card>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-2 gap-3">
         <Card className="p-4 bg-card border-border/50 rounded-none flex flex-col justify-between">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Saldo Atual</span>
            <div className="mt-2">
               <span className="text-2xl font-black text-primary leading-none">{points}</span>
               <span className="text-[10px] font-black ml-1 text-primary">PTS</span>
            </div>
         </Card>
         <Card className="p-4 bg-card border-border/50 rounded-none flex flex-col justify-between border-l-primary/30 border-l-2">
            <div className="flex justify-between items-start">
               <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">A Expirar</span>
               <AlertCircle className="w-3 h-3 text-orange-500" />
            </div>
            <div className="mt-2">
               <span className="text-2xl font-black text-orange-500 leading-none">{pointsExpiring}</span>
               <span className="text-[10px] font-black ml-1 text-orange-500">PTS</span>
               <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Até {expiringDate}</p>
            </div>
         </Card>
      </div>

      {/* XP Progress */}
      <Card className="p-4 bg-card border-border/50 rounded-none">
         <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Progresso de XP</span>
            <span className="text-[10px] font-black text-white tracking-widest">{xp} / 1000 XP</span>
         </div>
         <Progress value={(xp/1000)*100} className="h-2 rounded-none bg-neutral-800" />
      </Card>

      {/* Menu Options */}
      <div className="space-y-2">
         {[
           { icon: Wallet, label: "Minha Carteira", desc: "Gerencie endereços conectados" },
           { icon: Award, label: "Conquistas", desc: "4 de 12 badges desbloqueados" },
           { icon: History, label: "Histórico de Pontos", desc: "Veja suas transações recentes" },
           { icon: Trophy, label: "Leaderboard", desc: "Você está no Top 5%" }
         ].map((item, i) => (
           <motion.div
             key={i}
             whileTap={{ scale: 0.98 }}
             className="p-4 bg-card border border-border/50 flex items-center justify-between cursor-pointer hover:border-primary/30 transition-all rounded-none"
           >
              <div className="flex items-center gap-4">
                 <div className="p-2 bg-neutral-800 rounded-none">
                    <item.icon className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                    <h4 className="font-black text-xs uppercase tracking-tight">{item.label}</h4>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{item.desc}</p>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
