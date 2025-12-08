"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, Layers, Zap, Globe } from "lucide-react";
import Image from "next/image";
import { useUI } from "../context/UIContext";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const projects = [
  {
    name: "Pet Plate",
    tagline: "Subscription Commerce",
    description: "Engineered a high-availability subscription platform handling thousands of recurring orders daily. Built with headless Shopify Plus, custom subscription logic, and intelligent delivery scheduling. Optimized checkout flows reduced cart abandonment by 35%.",
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Orders/Day", value: "5K+" },
      { label: "Load Time", value: "<1s" }
    ],
    tech: ["Shopify Plus", "React", "Node.js", "PostgreSQL"],
    image: "/petplate-screenshot.png",
    url: "https://www.petplate.com",
    gradient: "from-cyan-500 to-emerald-500",
    bgGradient: "from-cyan-500/10 via-transparent to-emerald-500/10",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    icon: Layers
  },
  {
    name: "Starface",
    tagline: "Headless D2C Platform",
    description: "Architected a blazing-fast headless commerce experience for this viral Gen-Z skincare brand. Custom Shopify Plus implementation delivers sub-second page loads and seamless mobile UX. Handles viral traffic spikes from social media campaigns effortlessly.",
    stats: [
      { label: "Page Speed", value: "98/100" },
      { label: "Mobile Conv.", value: "+47%" },
      { label: "Traffic Surge", value: "10x" }
    ],
    tech: ["Next.js", "Shopify API", "Vercel Edge", "Tailwind"],
    image: "/starface-screenshot.png",
    url: "https://www.starface.world",
    gradient: "from-pink-500 to-yellow-500",
    bgGradient: "from-pink-500/10 via-transparent to-yellow-500/10",
    accentColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    icon: Zap
  },
  {
    name: "Superplastic",
    tagline: "NFT & Limited Drops",
    description: "Built the digital infrastructure for this animated entertainment brand's limited-edition releases and NFT drops. High-concurrency queue systems, real-time inventory management, and fraud prevention ensure fair access during hyped releases.",
    stats: [
      { label: "Concurrent", value: "50K+" },
      { label: "Drop Speed", value: "<3min" },
      { label: "Bot Block", value: "99.9%" }
    ],
    tech: ["Web3", "Redis", "AWS Lambda", "CloudFront"],
    image: "/superplastic-screenshot.png",
    url: "https://superplastic.co",
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-500/10 via-transparent to-indigo-500/10",
    accentColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    icon: Globe
  }
];

// Project Card Component for ScrollStack
function ProjectCard({
  project,
  index,
  onClick
}: {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
}) {
  const IconComponent = project.icon;

  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer group relative overflow-hidden
        bg-black/80 backdrop-blur-xl
        border ${project.borderColor}
        rounded-3xl
        transition-all duration-500
        hover:border-opacity-80 hover:shadow-2xl
        shadow-xl
      `}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-50`} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative flex flex-col lg:flex-row">
        {/* Left: Screenshot */}
        <div className="relative w-full lg:w-1/2 h-64 lg:h-auto lg:min-h-[400px] overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/90 hidden lg:block`} />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent lg:hidden`} />

          {/* Floating badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
            <Sparkles size={12} className={project.accentColor} />
            <span className="text-xs text-white font-mono">LIVE</span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-8 lg:p-10 space-y-6 relative">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient}`}>
              <IconComponent size={24} className="text-white" />
            </div>
            <div>
              <span className={`text-xs font-mono uppercase tracking-widest ${project.accentColor}`}>
                {project.tagline}
              </span>
              <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {project.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-2xl lg:text-3xl font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`
                inline-flex items-center gap-2 px-6 py-3
                bg-gradient-to-r ${project.gradient}
                text-white font-bold rounded-xl
                hover:opacity-90 transition-opacity
                shadow-lg
              `}
            >
              Visit Site <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
}

export default function ProjectShowcase() {
  const { uiState } = useUI();
  const { projectsStyle } = uiState.components;
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Minimal style - simple list
  if (projectsStyle === "minimal") {
    return (
      <section id="projects" className="py-24 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 text-foreground border-b border-gray-800 pb-2">
          Deployed Architectures
        </h2>
        <div className="space-y-6">
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-white/30 transition-colors"
            >
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-500 text-sm">{project.tagline}</p>
              </div>
              <ExternalLink className="text-gray-600 group-hover:text-primary transition-colors" size={20} />
            </motion.a>
          ))}
        </div>
      </section>
    );
  }

  // Terminal style
  if (projectsStyle === "terminal") {
    return (
      <section id="projects" className="py-24 px-4 max-w-4xl mx-auto">
        <div className="font-mono text-green-400 mb-8">
          <span className="text-gray-500">$</span> ls -la ./deployed-architectures/
        </div>
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black border border-green-500/30 rounded-lg overflow-hidden"
            >
              <div className="bg-green-900/20 px-4 py-2 border-b border-green-500/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 text-xs font-mono">STATUS: DEPLOYED</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-green-300 mb-2">$ describe --project="{project.name}"</div>
                <div className="text-gray-400 mb-4">&gt; {project.description}</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-green-500 text-xs">[{t}]</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // Default: ScrollStack with window scroll (no scroll trapping)
  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
          <span className="text-accent">Deployed</span> Architectures
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full mb-6" />
        <p className="text-gray-400 max-w-xl mx-auto">
          Production systems built to scale. Scroll to explore the infrastructure behind these brands.
        </p>
      </motion.div>

      {/* ScrollStack */}
      <ScrollStack gap={40}>
        {projects.map((project, idx) => (
          <ScrollStackItem key={idx}>
            <ProjectCard
              project={project}
              index={idx}
              onClick={() => setSelectedProject(idx)}
            />
          </ScrollStackItem>
        ))}
      </ScrollStack>

      {/* Modal for expanded view */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-black/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-80">
                <Image
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8">
                <span className={`text-sm font-mono uppercase tracking-wider ${projects[selectedProject].accentColor}`}>
                  {projects[selectedProject].tagline}
                </span>
                <h3 className="text-3xl font-bold text-white mt-2 mb-4">
                  {projects[selectedProject].name}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {projects[selectedProject].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[selectedProject].tech.map((t, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 border rounded-full text-sm ${projects[selectedProject].borderColor} ${projects[selectedProject].accentColor}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={projects[selectedProject].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${projects[selectedProject].gradient} text-white font-bold rounded-xl hover:opacity-90 transition-opacity`}
                >
                  Visit Live Site <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
