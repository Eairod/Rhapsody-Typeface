import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Partners() {
  const partners = [
    { name: "MusicPlayce", desc: "The place for music creators", linked: true, color: "bg-pink-600" },
    { name: "SportX", desc: "Live sports predictions", linked: false, color: "bg-blue-600" },
    { name: "CinemaClub", desc: "Movie reviews & rewards", linked: false, color: "bg-purple-600" },
  ];

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-heading font-bold mb-6">PARTNER HUB</h1>
      
      <div className="grid gap-4">
        {partners.map((p, i) => (
          <Card key={i} className="overflow-hidden border-border/50">
            <div className={`h-24 ${p.color} relative p-4 flex flex-col justify-between`}>
               <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg"></div>
               <h3 className="font-heading text-xl font-bold text-white">{p.name}</h3>
            </div>
            <div className="p-4 flex justify-between items-center bg-card">
               <p className="text-sm text-muted-foreground">{p.desc}</p>
               <Button 
                 variant={p.linked ? "outline" : "default"} 
                 className={p.linked ? "border-green-500/50 text-green-500 hover:text-green-400" : "bg-primary text-primary-foreground"}
                 size="sm"
               >
                 {p.linked ? "LINKED" : "CONNECT"}
               </Button>
            </div>
          </Card>
        ))}
        
        <div className="p-8 text-center border-2 border-dashed border-border rounded-xl">
           <p className="text-sm text-muted-foreground font-medium">More partners coming soon...</p>
        </div>
      </div>
    </div>
  );
}
