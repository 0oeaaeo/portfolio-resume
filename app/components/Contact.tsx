"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useUI } from "../context/UIContext";

export default function Contact() {
  const { uiState } = useUI();
  const { radius } = uiState.theme;

  const getRadiusClass = () => {
    switch (radius) {
      case "none": return "rounded-none";
      case "sm": return "rounded-sm";
      case "full": return "rounded-3xl";
      default: return "rounded-lg";
    }
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-black/80 border border-primary/30 p-8 md:p-12 relative overflow-hidden ${getRadiusClass()}`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <h2 className="text-3xl font-bold text-foreground mb-8">Initialize Connection</h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <a href="mailto:me@ericdennis.org" className="flex flex-col items-center gap-2 group">
            <div className={`w-12 h-12 bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ${radius === 'full' ? 'rounded-full' : getRadiusClass()}`}>
              <Mail className="text-primary" />
            </div>
            <span className="text-gray-400 group-hover:text-foreground transition-colors">me@ericdennis.org</span>
          </a>

          <div className="flex flex-col items-center gap-2">
            <div className={`w-12 h-12 bg-white/10 flex items-center justify-center ${radius === 'full' ? 'rounded-full' : getRadiusClass()}`}>
              <MapPin className="text-secondary" />
            </div>
            <span className="text-gray-400">San Francisco, CA</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className={`w-12 h-12 bg-white/10 flex items-center justify-center ${radius === 'full' ? 'rounded-full' : getRadiusClass()}`}>
              <Phone className="text-accent" />
            </div>
            <span className="text-gray-400">530-930-4584</span>
          </div>
        </div>

        <div className="mt-12 font-mono text-xs text-gray-600">
          root@ericdennis.org:~# echo "Let's build something scalable."
        </div>
      </motion.div>
    </section>
  );
}
