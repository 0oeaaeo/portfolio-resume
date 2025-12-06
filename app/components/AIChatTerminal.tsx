"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Loader2, Sparkles, Palette } from "lucide-react";
import { useUI } from "../context/UIContext";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export default function AIChatTerminal() {
  const { setUIState } = useUI();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "assistant", text: "I am the system's neural interface. I can provide detailed architectural insights into Eric's work or reconfigure this environment to suit your preferences. Try commands like 'Initialize Matrix Protocol' or 'Switch to Enterprise Mode'." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingText, setProcessingText] = useState("Waiting for input...");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsProcessing(true);
    setProcessingText("Transmitting to Neural Net...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();

      if (data.toolCall) {
        setProcessingText("Executing UI Reconfiguration...");
        
        // Execute the tool call
        if (data.toolCall.name === "update_ui") {
           // Deep merge happens in the context, but we need to ensure structure matches
           setUIState(data.toolCall.args);
        }

        setMessages(prev => [...prev, { 
          id: (Date.now() + 1).toString(), 
          role: "assistant", 
          text: `[SYSTEM] UI Configuration Updated.\n${data.text}` 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          id: (Date.now() + 1).toString(), 
          role: "assistant", 
          text: data.text 
        }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        text: "Error: Connection to Neural Net severed." 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
         <motion.div 
           initial={{ scale: 0 }}
           whileInView={{ scale: 1 }}
           className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary/20 border border-secondary/50 text-secondary text-sm font-mono mb-4"
         >
           <Sparkles size={14} />
           <span>NEURAL_INTERFACE_ACTIVE</span>
         </motion.div>
         <motion.div 
           initial={{ scale: 0 }}
           whileInView={{ scale: 1 }}
           transition={{ delay: 0.1 }}
           className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-sm font-mono mb-4 ml-4"
         >
           <Palette size={14} />
           <span>LIVE_RECONFIGURATION_READY</span>
         </motion.div>
        <h2 className="text-3xl font-bold mb-4">Query the <span className="text-secondary">System Intelligence</span></h2>
        <p className="text-gray-400">
          Analyze architectural decisions or command the system to <span className="text-primary">"Switch to Cyberpunk Mode"</span>.
        </p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="bg-black/90 border border-gray-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[500px]"
      >
        {/* Terminal Header */}
        <div className="bg-gray-900/50 p-3 border-b border-gray-800 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span className="ml-4 text-xs font-mono text-gray-500">eric_v2_model_context_window_active</span>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 font-mono text-sm">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant" ? "bg-secondary/20 text-secondary" : "bg-gray-800 text-gray-400"
              }`}>
                {msg.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
              </div>
              
              <div className={`p-4 rounded-lg max-w-[80%] ${
                msg.role === "assistant" 
                  ? "bg-secondary/5 border border-secondary/10 text-foreground whitespace-pre-wrap" 
                  : "bg-gray-800 text-white"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isProcessing && (
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center flex-shrink-0">
                 <Loader2 size={16} className="animate-spin" />
               </div>
               <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10 text-secondary/70 animate-pulse">
                 {processingText}
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-900/30 border-t border-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type commands..."
              className="flex-1 bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-secondary transition-colors font-mono"
            />
            <button 
              onClick={handleSend}
              className="px-4 bg-white/10 hover:bg-secondary/20 hover:text-secondary border border-transparent hover:border-secondary/50 rounded transition-all text-gray-400"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
