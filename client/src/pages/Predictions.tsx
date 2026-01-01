import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Info } from "lucide-react";
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
            title: "Insufficient Balance",
            description: "You don't have enough points for this prediction.",
            variant: "destructive"
        });
        return;
    }

    placeBet(marketId, selectedOption.id, amount);
    toast({
        title: "Prediction Placed!",
        description: `You staked ${amount} points on ${selectedOption.label}`,
        className: "bg-primary text-primary-foreground"
    });
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-heading font-bold">MARKETS</h1>
         <div className="text-xs font-bold px-2 py-1 bg-primary/20 text-primary rounded border border-primary/30">
            POINTS ONLY
         </div>
      </div>

      <div className="space-y-4">
        {markets.map(market => (
          <Card key={market.id} className="bg-card border-border overflow-hidden">
            <div className="p-4 border-b border-border/50">
               <div className="flex justify-between items-start mb-2">
                 <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10">
                    {market.category}
                 </Badge>
                 <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" /> {Math.floor(market.pool / 100)} Participants
                 </span>
               </div>
               <h3 className="font-heading text-lg font-medium leading-tight mb-2">{market.title}</h3>
               <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 w-24 bg-secondary/20 rounded-full overflow-hidden">
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
                        className="flex justify-between items-center p-3 rounded-lg border border-border/50 bg-card hover:border-primary/50 hover:bg-secondary/5 cursor-pointer transition-all group"
                     >
                        <span className="font-medium text-sm group-hover:text-primary transition-colors">{option.label}</span>
                        <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">{option.odds}x</span>
                     </div>
                   </DialogTrigger>
                   <DialogContent className="sm:max-w-md bg-card border-border">
                     <DialogHeader>
                       <DialogTitle>Place Prediction</DialogTitle>
                       <DialogDescription>
                         How many points do you want to stake on <strong>{option.label}</strong>?
                       </DialogDescription>
                     </DialogHeader>
                     <div className="flex items-center space-x-2 py-4">
                       <div className="grid flex-1 gap-2">
                         <div className="relative">
                            <Input
                                type="number"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                                className="pl-8 font-mono text-lg"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">P</span>
                         </div>
                         <p className="text-xs text-muted-foreground">
                            Potential Return: <span className="text-green-500 font-bold">{(parseInt(betAmount || '0') * option.odds).toFixed(0)} PTS</span>
                         </p>
                       </div>
                     </div>
                     <DialogFooter className="sm:justify-start">
                       <Button type="button" onClick={() => handlePredict(market.id)} className="w-full bg-primary text-primary-foreground font-bold">
                         Confirm {betAmount} PTS
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
