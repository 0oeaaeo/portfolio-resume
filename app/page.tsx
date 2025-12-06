"use client";

import { useState } from "react";
import TerminalIntro from "./components/TerminalIntro";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ProjectShowcase from "./components/ProjectShowcase";
import AIChatTerminal from "./components/AIChatTerminal";
import PixelBlast from "./components/PixelBlast";
import { useUI } from "./context/UIContext";
import { motion, AnimatePresence } from "framer-motion";

const COMPONENT_MAP: Record<string, React.ComponentType> = {
  hero: Hero,
  terminal: AIChatTerminal,
  skills: Skills,
  experience: Experience,
  projects: ProjectShowcase,
  contact: Contact,
};

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const { uiState } = useUI();

  return (
    <main className="min-h-screen text-foreground selection:bg-primary selection:text-background transition-colors duration-500 relative">
      <PixelBlast />
      <div className="relative z-10">
        <TerminalIntro onComplete={() => setShowContent(true)} />
        
        {showContent && (
          <div className={`animate-in fade-in duration-1000 slide-in-from-bottom-4 flex flex-col ${
            uiState.layout.spacing === "compact" ? "gap-0" : 
            uiState.layout.spacing === "spacious" ? "gap-32" : "gap-0"
          }`}>
            <AnimatePresence mode="popLayout">
              {uiState.layout.order.map((componentId) => {
                const Component = COMPONENT_MAP[componentId];
                if (!Component) return null;
                
                return (
                  <motion.div
                    key={componentId}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Component />
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            <footer className="py-8 text-center text-gray-600 text-sm font-mono">
              © {new Date().getFullYear()} Eric Dennis. Built with Next.js + Tailwind.
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}
