import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Zap, Lock } from "lucide-react";

export default function Shop() {
  const items = [
    { title: "RHAP Booster", desc: "Ganhe 2x XP por 24h", price: 500, type: "Utility", icon: Zap, color: "bg-blue-600" },
    { title: "Elite Badge", desc: "Badge exclusivo de fundador", price: 2000, type: "Collectable", icon: Star, color: "bg-primary" },
    { title: "Mystery Box", desc: "Recompensas aleatórias e NFTs", price: 1000, type: "Box", icon: ShoppingBag, color: "bg-purple-600" },
  ];

  return (
    <div className="p-4 pb-20 font-sans space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">Loja</h1>
        <div className="text-[10px] font-black px-2 py-1 bg-primary text-primary-foreground tracking-widest uppercase">
          Em Breve
        </div>
      </div>

      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
        Em breve você poderá trocar seus pontos acumulados por itens exclusivos, boosters de progressão e ativos Rhapsody.
      </p>

      <div className="grid gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden border-border/50 rounded-none relative opacity-70 group">
              <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                 <Lock className="w-8 h-8 text-white/50" />
              </div>
              
              <div className={`h-24 ${item.color} relative p-4 flex flex-col justify-between overflow-hidden`}>
                 <div className="absolute top-0 right-0 p-4 opacity-20">
                    <item.icon className="w-16 h-16 rotate-12" />
                 </div>
                 <Badge className="w-fit bg-black/40 text-white border-none text-[8px] font-black uppercase tracking-widest rounded-none">
                    {item.type}
                 </Badge>
                 <h3 className="font-black text-xl font-bold text-white uppercase tracking-tighter italic relative z-10">{item.title}</h3>
              </div>
              <div className="p-4 flex justify-between items-center bg-card">
                 <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest max-w-[60%]">{item.desc}</p>
                 <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-primary uppercase tracking-widest mb-1">{item.price} PTS</span>
                    <Button disabled size="sm" className="h-8 bg-neutral-800 text-[9px] font-black uppercase tracking-widest rounded-none border border-white/5">
                      Bloqueado
                    </Button>
                 </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="p-8 text-center border-2 border-dashed border-border rounded-none bg-card/50">
         <h4 className="font-black text-xs uppercase tracking-tight mb-2 italic">Troca de RHAP por Ativos</h4>
         <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
            O mercado de trocas oficial será lançado na próxima fase do protocolo.
         </p>
      </div>
    </div>
  );
}
