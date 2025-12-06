"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useUI } from "../context/UIContext";

const projects = [
  {
    name: "Pet Plate",
    description: "Subscription-based healthy pet food delivery service. Scalable e-commerce architecture.",
    image: "/petplate.jpg",
    url: "https://www.petplate.com"
  },
  {
    name: "Starface",
    description: "High-growth D2C skincare brand. Custom Shopify Plus headless implementation.",
    image: "/starface.jpg",
    url: "https://www.starface.world"
  },
  {
    name: "Superplastic",
    description: "Animated entertainment & luxury toy brand. Immersive digital experiences and drops.",
    image: "/superplastic.png",
    url: "https://superplastic.co"
  }
];

export default function ProjectShowcase() {
  const { uiState } = useUI();
  const { projectsStyle } = uiState.components;
  const { radius } = uiState.theme;
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const getRadiusClass = () => {
    switch (radius) {
      case "none": return "rounded-none";
      case "sm": return "rounded-sm";
      case "full": return "rounded-3xl";
      default: return "rounded-xl";
    }
  };

  // --- MINIMAL STYLE ---
  if (projectsStyle === "minimal") {
    return (
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 text-foreground border-b border-gray-800 pb-2">Selected Works</h2>
        <div className="grid gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group flex flex-col md:flex-row gap-6 items-start">
              <div className={`w-full md:w-48 h-32 bg-gray-900 relative overflow-hidden flex-shrink-0 ${getRadiusClass()}`}>
                 <Image src={project.image} alt={project.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  {project.name}
                  <ExternalLink size={14} className="text-gray-500" />
                </h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <a href={project.url} className="text-primary text-xs font-mono uppercase tracking-wider hover:underline">View Project &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // --- DEFAULT / CARDS STYLE ---
  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-16 text-center"
      >
        <span className="text-accent">Deployed</span> Architectures
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            layoutId={`project-${idx}`}
            onClick={() => setSelectedProject(idx)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`cursor-pointer group relative h-64 overflow-hidden border border-white/10 hover:border-primary/50 transition-colors bg-white/5 ${getRadiusClass()}`}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <Image 
                src={project.image} 
                alt={project.name}
                width={200}
                height={100}
                className="opacity-70 group-hover:opacity-100 transition-opacity object-contain h-full w-full"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold text-white">{project.name}</h3>
              <p className="text-sm text-primary">View Details &rarr;</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              layoutId={`project-${selectedProject}`}
              className={`w-full max-w-2xl bg-[#0a0a0a] border border-primary overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.15)] ${getRadiusClass()}`}
            >
              <div className="relative h-64 bg-white/5 p-8 flex items-center justify-center border-b border-white/10">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <Image
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].name}
                  width={300}
                  height={150}
                  className="object-contain h-full w-full"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-white flex items-center gap-4">
                  {projects[selectedProject].name}
                  <a 
                    href={projects[selectedProject].url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full text-primary transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {projects[selectedProject].description}
                </p>
                <div className="flex gap-4">
                   <a
                     href={projects[selectedProject].url}
                     target="_blank"
                     rel="noopener noreferrer" 
                     className="px-6 py-2 bg-primary text-black font-bold rounded hover:bg-white transition-colors"
                   >
                     Visit Site
                   </a>
                </div>
              </div>
            </motion.div>
            
            {/* Backdrop click to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={() => setSelectedProject(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
