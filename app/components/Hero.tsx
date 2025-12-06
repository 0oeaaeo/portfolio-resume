"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Network } from "lucide-react";
import { useUI } from "../context/UIContext";
import BlurText from "./BlurText";
import TextType from "./TextType";

export default function Hero() {
  const { uiState } = useUI();
  const { heroStyle } = uiState.components;
  const { font, radius } = uiState.theme;

  const getRadiusClass = () => {
    switch (radius) {
      case "none": return "rounded-none";
      case "sm": return "rounded-sm";
      case "full": return "rounded-full";
      default: return "rounded-md";
    }
  };

  const getFontClass = () => {
     switch (font) {
      case "sans": return "font-sans";
      case "serif": return "font-serif";
      default: return "font-mono";
    }
  };

  // --- MINIMAL STYLE ---
  if (heroStyle === "minimal") {
    return (
      <section className={`min-h-[70vh] flex flex-col justify-center px-8 md:px-20 pt-20 ${getFontClass()}`}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-8xl font-black text-foreground mb-4 tracking-tighter">
            ERIC<span className="text-primary">.</span>DENNIS
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-xl font-light">
            Systems Architect. AI Engineer. Builder.
          </p>
          <div className="mt-8 flex gap-4">
            <button className={`px-6 py-2 bg-foreground text-background font-bold hover:opacity-80 transition-opacity ${getRadiusClass()}`}>
              View Work
            </button>
            <button className={`px-6 py-2 border border-foreground/20 hover:border-foreground transition-colors ${getRadiusClass()}`}>
              Contact
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  // --- TERMINAL STYLE ---
  if (heroStyle === "terminal") {
    return (
      <section className="min-h-screen flex items-center justify-center p-4 font-mono bg-black text-green-500">
        <div className="w-full max-w-4xl border border-green-500/50 p-6 bg-black shadow-[0_0_50px_rgba(0,255,0,0.1)]">
          <div className="flex justify-between items-center border-b border-green-500/30 pb-2 mb-8">
            <span>root@ericdennis:~</span>
            <span>v2.0.4</span>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }}>
             <p className="mb-4 text-xl">{`> initializing_profile_sequence...`}</p>
             <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">ERIC DENNIS</h1>
             <p className="mb-2">{`> role: Senior Systems Architect`}</p>
             <p className="mb-2">{`> stack: [Linux, Python, GPT-4, Next.js]`}</p>
             <p className="mb-8">{`> status: OPEN_FOR_NETWORKING`}</p>
             
             <div className="flex gap-4">
               <span className="animate-pulse bg-green-500 text-black px-4 py-2 font-bold cursor-pointer hover:bg-white">
                 [ EXECUTE_PROJECTS ]
               </span>
               <span className="border border-green-500 px-4 py-2 hover:bg-green-500/20 cursor-pointer transition-colors">
                 [ INIT_CONTACT ]
               </span>
             </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // --- DEFAULT STYLE ---
  return (
    <section className={`min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20 ${getFontClass()}`}>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6 text-accent font-mono text-sm tracking-widest"
        >
          <Terminal size={16} />
          <span>SYSTEM_ARCHITECT_ONLINE</span>
        </motion.div>

        <BlurText
          text="Eric Dennis"
          delay={150}
          animateBy="letters"
          direction="top"
          className="text-5xl md:text-7xl font-bold mb-6 text-foreground justify-center"
        />

        <TextType
          text={["Senior Systems Architect & Technologist", "Full Stack Developer", "AI Engineer"]}
          className="text-2xl md:text-3xl text-gray-400 mb-8 font-light"
          typingSpeed={50}
          deletingSpeed={30}
          pauseDuration={2000}
          loop={true}
          showCursor={true}
          cursorCharacter="|"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Bridging the gap between <span className="text-primary">"Old School" Linux mastery</span> and{" "}
          <span className="text-secondary">Next-Gen AI development</span>.
          Builder, Architect, Engineer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-primary transition-all text-foreground font-mono flex items-center gap-2 group ${getRadiusClass()}`}
          >
            <Cpu size={18} className="group-hover:text-primary transition-colors" />
            <span>VIEW_PROJECTS</span>
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-3 bg-primary/10 border border-primary/50 hover:bg-primary/20 transition-all text-primary font-mono flex items-center gap-2 ${getRadiusClass()}`}
          >
            <Network size={18} />
            <span>CONTACT_ME</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
