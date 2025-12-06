"use client";

import { motion } from "framer-motion";
import { useUI } from "../context/UIContext";
import { Cpu, Cloud, Code2, Terminal, Database, Lock, Network, Layers } from "lucide-react";

const skillCategories = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: ["OpenAI API", "GPT-4", "RAG Pipelines", "Function Calling Agents", "Prompt Engineering", "Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch"],
    color: "text-secondary",
    borderColor: "border-secondary/30",
    glow: "shadow-secondary/20",
    colSpan: "md:col-span-2",
    bg: "bg-gradient-to-br from-secondary/10 to-transparent"
  },
  {
    id: "cloud",
    title: "Cloud Architecture",
    icon: Cloud,
    skills: ["AWS (EC2, Lambda, S3)", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Hybrid-Cloud"],
    color: "text-primary",
    borderColor: "border-primary/30",
    glow: "shadow-primary/20",
    colSpan: "md:col-span-1",
    bg: "bg-gradient-to-bl from-primary/10 to-transparent"
  },
  {
    id: "fullstack",
    title: "Full-Stack & Backend",
    icon: Code2,
    skills: ["Python (Expert)", "RESTful APIs", "SQL", "JavaScript", "PHP", "Go", "C#", "Next.js", "React"],
    color: "text-accent",
    borderColor: "border-accent/30",
    glow: "shadow-accent/20",
    colSpan: "md:col-span-1",
    bg: "bg-gradient-to-tr from-accent/10 to-transparent"
  },
  {
    id: "devops",
    title: "DevOps & Systems",
    icon: Terminal,
    skills: ["CI/CD", "Git", "Linux Kernel Tuning", "Security/Hardening", "Bash Scripting", "Proxmox", "Homelab"],
    color: "text-white",
    borderColor: "border-white/30",
    glow: "shadow-white/20",
    colSpan: "md:col-span-2",
    bg: "bg-gradient-to-tl from-white/10 to-transparent"
  }
];

// Icon component wrapper to handle dynamic icons if needed, 
// but here we map directly.
function BrainCircuit(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.97-3.284" />
      <path d="M17.97 14.716A4 4 0 0 1 16 18" />
    </svg>
  )
}

export default function Skills() {
  const { uiState } = useUI();
  const { skillsStyle } = uiState.components;
  const { radius } = uiState.theme;

  const getRadiusClass = () => {
     switch (radius) {
      case "none": return "rounded-none";
      case "sm": return "rounded-sm";
      case "full": return "rounded-3xl";
      default: return "rounded-2xl";
    }
  };

  // --- LIST STYLE ---
  if (skillsStyle === "list") {
    return (
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 border-b border-gray-800 pb-4">Technical Proficiency</h2>
        <div className="space-y-8">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className={`text-lg font-bold mb-3 ${category.color}`}>{category.title}</h3>
              <p className="text-gray-400 leading-relaxed font-mono text-sm">
                {category.skills.join("  //  ")}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // --- MINIMAL STYLE ---
  if (skillsStyle === "minimal") {
    return (
       <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-x-12 gap-y-8 justify-center">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{category.title}</h3>
              <ul className="space-y-1">
                {category.skills.slice(0, 5).map((skill, sIdx) => (
                  <li key={sIdx} className="text-foreground font-medium">{skill}</li>
                ))}
                {category.skills.length > 5 && <li className="text-gray-600 text-xs mt-2">+ {category.skills.length - 5} more</li>}
              </ul>
            </div>
          ))}
        </div>
       </section>
    );
  }

  // --- DEFAULT / BENTO GRID STYLE ---
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
          CORE_<span className="text-primary">COMPETENCIES</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`
              group relative overflow-hidden
              bg-black/40 backdrop-blur-xl 
              border ${category.borderColor}
              hover:border-opacity-80 hover:shadow-lg ${category.glow}
              transition-all duration-500
              ${category.colSpan}
              ${getRadiusClass()}
            `}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 ${category.bg}`} />
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative h-full p-8 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-lg bg-white/5 border border-white/10 ${category.color}`}>
                  <category.icon size={24} />
                </div>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  SYS.MOD.0{idx + 1}
                </span>
              </div>

              <h3 className={`text-2xl font-bold mb-4 ${category.color} tracking-tight`}>
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`
                      px-3 py-1 text-xs md:text-sm font-medium font-mono
                      bg-white/5 text-gray-300 
                      border border-white/10 rounded
                      group-hover:bg-white/10 group-hover:border-white/20
                      transition-all duration-300
                    `}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
