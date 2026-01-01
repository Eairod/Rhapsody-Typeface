import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Missions() {
  const { missions, completeMission, claimReward } = useStore();
  const { toast } = useToast();

  const handleOpen = (id: string, partner: string) => {
    toast({
      title: "Opening Partner Module",
      description: `Redirecting to ${partner}...`,
    });
    // Simulate completing it after "returning"
    setTimeout(() => {
        completeMission(id);
        toast({
            title: "Mission Completed!",
            description: "You can now claim your reward.",
            variant: "default",
            className: "bg-green-600 text-white border-none"
        });
    }, 1500);
  };

  const handleClaim = (id: string) => {
    claimReward(id);
    toast({
      title: "Reward Claimed!",
      description: "Points added to your balance.",
      className: "bg-primary text-primary-foreground border-none"
    });
  };

  const MissionCard = ({ mission }: { mission: any }) => (
    <Card className="p-4 bg-card border-border/50 mb-3 overflow-hidden relative">
       {mission.status === 'completed' && (
         <div className="absolute top-0 right-0 bg-green-500/20 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
           READY TO CLAIM
         </div>
       )}
       
       <div className="flex gap-4">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
             {mission.partner === 'MusicPlayce' ? '🎵' : '🚀'}
          </div>
          <div className="flex-1 space-y-2">
             <div className="flex justify-between items-start">
                <h3 className="font-bold text-base leading-tight">{mission.title}</h3>
                <Badge variant="outline" className="text-[10px] h-5 border-primary/30 text-primary">
                  +{mission.reward} {mission.type.toUpperCase()}
                </Badge>
             </div>
             <p className="text-xs text-muted-foreground leading-relaxed">
               {mission.description}
             </p>
             
             <div className="pt-2">
               {mission.status === 'pending' && (
                 <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-xs font-bold uppercase tracking-wide border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleOpen(mission.id, mission.partner)}
                 >
                   Open {mission.partner} <ExternalLink className="w-3 h-3 ml-2" />
                 </Button>
               )}
               
               {mission.status === 'completed' && (
                 <Button 
                    size="sm" 
                    className="w-full text-xs font-bold uppercase tracking-wide bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleClaim(mission.id)}
                 >
                   Claim Reward
                 </Button>
               )}
               
               {mission.status === 'claimed' && (
                 <Button size="sm" variant="ghost" disabled className="w-full text-xs text-muted-foreground">
                   <CheckCircle className="w-3 h-3 mr-2" /> Claimed
                 </Button>
               )}
             </div>
          </div>
       </div>
    </Card>
  );

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-heading font-bold mb-6">MISSIONS HUB</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full bg-background border border-border p-1 h-10 mb-6">
          <TabsTrigger value="all" className="flex-1 text-xs font-bold">ALL</TabsTrigger>
          <TabsTrigger value="daily" className="flex-1 text-xs font-bold">DAILY</TabsTrigger>
          <TabsTrigger value="partner" className="flex-1 text-xs font-bold">PARTNERS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {missions.map(m => <MissionCard key={m.id} mission={m} />)}
        </TabsContent>
        <TabsContent value="daily" className="space-y-4">
          {missions.filter(m => m.partner === 'Rhapsody').map(m => <MissionCard key={m.id} mission={m} />)}
        </TabsContent>
        <TabsContent value="partner" className="space-y-4">
          {missions.filter(m => m.partner !== 'Rhapsody').map(m => <MissionCard key={m.id} mission={m} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
