"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  "Initializing system kernel...",
  "Loading modules: [Linux, Python, AWS, Docker]...",
  "Mounting volumes: /home/ericdennis...",
  "Checking dependencies...",
  "  > openai-api detected",
  "  > rag-pipelines active",
  "  > hybrid-cloud-strategy loaded",
  "Verifying user identity...",
  "USER: ERIC DENNIS [ARCHITECT_MODE]",
  "System ready.",
  "Booting UI...",
];

export default function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        setLines((prev) => [...prev, terminalLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsComplete(true), 800);
        setTimeout(onComplete, 1500); // Allow exit animation to finish
      }
    }, 400); // Speed of typing/lines

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black font-mono text-green-500 p-8 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full max-w-2xl h-full flex flex-col justify-end pb-20">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-1"
              >
                <span className="opacity-50 mr-2">root@ericdennis.org:~#</span>
                {line}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-5 bg-green-500 mt-1"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
