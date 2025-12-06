"use client";

import { useUI } from "../context/UIContext";
import { motion } from "framer-motion";
import { Briefcase, Server, Brain, Phone } from "lucide-react";
import TiltedCard from "./TiltedCard";

const experiences = [
  {
    company: "Graveflex",
    role: "Lead AI Engineer & Automation Architect",
    period: "Feb 2022 – Aug 2025",
    description: "Operated with high autonomy to build internal AI products. Built chatbots executing live function calls to Shopify APIs. Architected data summarization engines.",
    icon: Brain,
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20"
  },
  {
    company: "G1 Survey Research",
    role: "Senior Systems Architect",
    period: "Jan 2017 – Feb 2021",
    description: "Designed hybrid cloud infrastructure (AWS/Azure). Built custom Asterisk VoIP stack. Implemented early NLP subroutines using TensorFlow/PyTorch.",
    icon: Server,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20"
  },
  {
    company: "Orion Star Inc",
    role: "Technical Operations Lead",
    period: "July 2013 – Dec 2016",
    description: "Final escalation point for 'unsolvable' technical issues. Re-engineered support workflows resulting in 30% increase in resolution speed.",
    icon: Phone,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20"
  },
  {
    company: "California Pharmacists Association",
    role: "IT Administrator",
    period: "Feb 2006 – Jan 2008",
    description: "Managed the full LAMP stack and network security. Cemented philosophy of open-source software and reliable infrastructure.",
    icon: Briefcase,
    color: "text-gray-400",
    bg: "bg-foreground/5",
    border: "border-foreground/10"
  }
];

export default function Experience() {
  const { uiState } = useUI();
  const { experienceStyle } = uiState.components;
  const { radius } = uiState.theme;

  const getRadiusClass = () => {
    switch (radius) {
      case "none": return "rounded-none";
      case "sm": return "rounded-sm";
      case "full": return "rounded-3xl";
      default: return "rounded-lg";
    }
  };

  // --- MINIMAL STYLE ---
  if (experienceStyle === "minimal") {
    // ... (keep minimal style implementation)
    return (
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 text-foreground border-b border-gray-800 pb-2">Experience</h2>
        <div className="space-y-12 border-l border-gray-800 ml-3 pl-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-gray-800 border-2 border-background" />
              <h3 className="text-lg font-bold text-foreground">{exp.company}</h3>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-primary font-medium">{exp.role}</span>
                <span className="text-gray-500 text-sm font-mono">{exp.period}</span>
              </div>
              <p className="text-gray-400 text-sm max-w-2xl">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // --- DEFAULT STYLE (Cyberpunk Timeline) ---
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
          <span className="text-primary">&lt;</span> MISSION_LOG <span className="text-primary">/&gt;</span>
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="relative">
        {/* Central Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent md:-translate-x-1/2 ml-8 md:ml-0" />

        <div className="space-y-16">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center md:justify-between ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-1/2 ml-8 md:ml-0 z-10">
                  <div className={`w-full h-full rounded-full ${exp.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`} />
                  <div className={`absolute inset-0 w-full h-full rounded-full ${exp.color.replace('text-', 'bg-')} animate-ping opacity-50`} />
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-1/2" />

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-40px)] pl-20 md:pl-0 ${
                  isEven ? "md:pr-0 md:text-right" : "md:pl-0 md:text-left"
                }`}>
                  <div 
                    className={`
                      relative p-6 md:p-8 
                      bg-black/40 backdrop-blur-md 
                      border ${exp.border} 
                      hover:bg-black/60 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]
                      transition-all duration-300 group
                      ${getRadiusClass()}
                    `}
                  >
                    {/* Connector Line (Desktop) */}
                    <div className={`hidden md:block absolute top-1/2 w-10 h-px bg-primary/30 ${
                      isEven ? "-right-10" : "-left-10"
                    }`} />

                    <div className={`flex flex-col gap-2 ${
                      isEven ? "md:items-end" : "md:items-start"
                    }`}>
                      <div className="flex items-center gap-3 mb-1">
                        <exp.icon className={`${exp.color} group-hover:scale-110 transition-transform duration-300`} size={24} />
                        <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{exp.company}</h3>
                      </div>
                      
                      <span className={`text-sm font-mono tracking-wider ${exp.color} bg-white/5 px-3 py-1 rounded`}>
                        {exp.period}
                      </span>

                      <h4 className="text-lg font-medium text-gray-300 mt-2">{exp.role}</h4>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mt-2 max-w-md">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
