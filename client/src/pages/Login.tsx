import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import bgImage from "@assets/generated_images/dark_futuristic_geometric_background_with_yellow_accents.png";

export default function Login() {
  const { login } = useStore();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
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
          className="space-y-4"
        >
           <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(255,182,0,0.4)] rotate-3">
              <span className="font-heading font-bold text-4xl text-primary-foreground">R</span>
           </div>
           <div>
             <h1 className="font-heading text-5xl font-bold tracking-tighter text-white">RHAPSODY</h1>
             <p className="text-primary font-medium tracking-widest text-sm mt-2 uppercase">Gamification Protocol</p>
           </div>
        </motion.div>

        {/* Action Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full space-y-4"
        >
          <div className="space-y-3 w-full">
            <Button 
                onClick={login}
                size="lg" 
                className="w-full h-14 bg-primary text-primary-foreground font-heading text-xl tracking-wide hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,182,0,0.2)]"
            >
                ENTER HUB <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
                variant="outline"
                size="lg" 
                className="w-full h-14 border-white/20 text-white hover:bg-white/10 hover:text-white font-heading text-lg tracking-wide"
            >
                CONNECT WALLET
            </Button>
          </div>
          
          <p className="text-xs text-white/40 mt-6">
             By continuing you agree to the Terms of Service.
             <br/>Protocol v0.1.0-alpha
          </p>
        </motion.div>

      </div>
    </div>
  );
}
