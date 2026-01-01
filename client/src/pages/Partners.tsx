import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Partners() {
  const partners = [
    { name: "MusicPlayce", desc: "O lugar para criadores de música", linked: true, color: "bg-pink-600" },
    { name: "SportX", desc: "Previsões esportivas ao vivo", linked: false, color: "bg-blue-600" },
    { name: "CinemaClub", desc: "Críticas de filmes e recompensas", linked: false, color: "bg-purple-600" },
  ];

  return (
    <div className="p-4 pb-20 font-sans">
      <h1 className="text-2xl font-black mb-6 italic tracking-tighter uppercase">Central de Parceiros</h1>
      
      <div className="grid gap-4">
        {partners.map((p, i) => (
          <Card key={i} className="overflow-hidden border-border/50 rounded-none">
            <div className={`h-24 ${p.color} relative p-4 flex flex-col justify-between`}>
               <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg"></div>
               <h3 className="font-black text-xl font-bold text-white uppercase tracking-tighter italic">{p.name}</h3>
            </div>
            <div className="p-4 flex justify-between items-center bg-card">
               <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{p.desc}</p>
               <Button 
                 variant={p.linked ? "outline" : "default"} 
                 className={p.linked ? "border-green-500/50 text-green-500 hover:text-green-400 rounded-none" : "bg-primary text-primary-foreground rounded-none"}
                 size="sm"
               >
                 <span className="text-[10px] font-black tracking-widest uppercase">
                    {p.linked ? "CONECTADO" : "CONECTAR"}
                 </span>
               </Button>
            </div>
          </Card>
        ))}
        
        <div className="p-8 text-center border-2 border-dashed border-border rounded-none">
           <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Novos parceiros em breve...</p>
        </div>
      </div>
    </div>
  );
}
