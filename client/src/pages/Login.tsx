import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import bgImage from "@assets/generated_images/dark_futuristic_geometric_background_with_yellow_accents.png";
import logoFull from "@assets/LOGOTIPO_1767226191405.png";

export default function Login() {
  const { login } = useStore();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background relative overflow-hidden font-sans">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative z-10 p-6 flex flex-col items-center justify-center w-full max-w-md h-full text-center space-y-12">
        
        {/* Logo Area */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
           <img src={logoFull} alt="Rhapsody" className="h-16 w-auto mx-auto drop-shadow-[0_0_20px_rgba(255,182,0,0.3)]" />
           <p className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">
             The Rewarding layer of the internet
           </p>
        </motion.div>

        {/* Action Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full space-y-4"
        >
          <div className="space-y-3 w-full px-4">
            <Button 
                onClick={login}
                size="lg" 
                className="w-full h-14 bg-primary text-primary-foreground font-black text-lg tracking-wider hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,182,0,0.2)] rounded-none"
            >
                ENTER HUB <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
                variant="outline"
                size="lg" 
                className="w-full h-14 border-white/20 text-white hover:bg-white/10 hover:text-white font-black text-lg tracking-wider rounded-none"
            >
                CONNECT WALLET
            </Button>
          </div>
          
          <p className="text-[10px] text-white/40 mt-8 font-bold uppercase tracking-widest">
             Transforming Communities into economy of participation
             <br/><span className="mt-2 block opacity-50">Protocol v0.1.0-alpha</span>
          </p>
        </motion.div>

      </div>
    </div>
  );
}
