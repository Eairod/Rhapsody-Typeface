import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Predictions() {
  const { markets, placeBet, points } = useStore();
  const { toast } = useToast();
  const [betAmount, setBetAmount] = useState<string>("100");
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const handlePredict = (marketId: string) => {
    if (!selectedOption) return;
    
    const amount = parseInt(betAmount);
    if (amount > points) {
        toast({
            title: "Saldo Insuficiente",
            description: "Você não tem pontos suficientes para esta previsão.",
            variant: "destructive"
        });
        return;
    }

    placeBet(marketId, selectedOption.id, amount);
    toast({
        title: "Previsão Confirmada!",
        description: `Você apostou ${amount} pontos em ${selectedOption.label}`,
        className: "bg-primary text-primary-foreground border-none"
    });
  };

  return (
    <div className="p-4 pb-20 font-sans">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-black italic tracking-tighter uppercase">Mercados</h1>
         <div className="text-[10px] font-black px-2 py-1 bg-primary/20 text-primary rounded-none border border-primary/30 tracking-widest">
            APENAS PONTOS
         </div>
      </div>

      <div className="space-y-4">
        {markets.map(market => (
          <Card key={market.id} className="bg-card border-border overflow-hidden rounded-none">
            <div className="p-4 border-b border-border/50">
               <div className="flex justify-between items-start mb-2">
                 <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 rounded-none">
                    {market.category}
                 </Badge>
                 <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold uppercase tracking-widest">
                    <Users className="w-3 h-3" /> {Math.floor(market.pool / 100)} Participantes
                 </span>
               </div>
               <h3 className="font-black text-base font-medium leading-tight mb-2 uppercase tracking-tight italic">{market.title}</h3>
               <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  <div className="h-1.5 w-24 bg-secondary/20 rounded-none overflow-hidden">
                     <div className="h-full w-[70%] bg-primary"></div>
                  </div>
                  <span>Pool: {market.pool.toLocaleString()} PTS</span>
               </div>
            </div>

            <div className="p-4 bg-background/30 space-y-2">
               {market.options.map(option => (
                 <Dialog key={option.id}>
                   <DialogTrigger asChild>
                     <div 
                        onClick={() => setSelectedOption(option)}
                        className="flex justify-between items-center p-3 rounded-none border border-border/50 bg-card hover:border-primary/50 hover:bg-secondary/5 cursor-pointer transition-all group"
                     >
                        <span className="font-black text-xs group-hover:text-primary transition-colors uppercase tracking-tight">{option.label}</span>
                        <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-none">{option.odds}x</span>
                     </div>
                   </DialogTrigger>
                   <DialogContent className="sm:max-w-md bg-card border-border rounded-none">
                     <DialogHeader>
                       <DialogTitle className="font-black italic uppercase tracking-tighter">Fazer Previsão</DialogTitle>
                       <DialogDescription className="font-bold text-xs uppercase tracking-widest">
                         Quantos pontos você quer apostar em <strong>{option.label}</strong>?
                       </DialogDescription>
                     </DialogHeader>
                     <div className="flex items-center space-x-2 py-4">
                       <div className="grid flex-1 gap-2">
                         <div className="relative">
                            <Input
                                type="number"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                                className="pl-8 font-black text-lg rounded-none border-border focus:border-primary"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-black">P</span>
                         </div>
                         <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                            Retorno Potencial: <span className="text-green-500 font-bold">{(parseInt(betAmount || '0') * option.odds).toFixed(0)} PTS</span>
                         </p>
                       </div>
                     </div>
                     <DialogFooter className="sm:justify-start">
                       <Button type="button" onClick={() => handlePredict(market.id)} className="w-full bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-none">
                         CONFIRMAR {betAmount} PTS
                       </Button>
                     </DialogFooter>
                   </DialogContent>
                 </Dialog>
               ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
