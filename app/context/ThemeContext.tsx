"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
  };
};

const THEMES: Record<string, Theme> = {
  cyberpunk: {
    name: "Cyberpunk",
    colors: {
      background: "#050505",
      foreground: "#ffffff",
      primary: "#00f3ff",   // Neon Blue
      secondary: "#bd00ff", // Neon Purple
      accent: "#00ff9d",    // Neon Green
    },
  },
  matrix: {
    name: "The Matrix",
    colors: {
      background: "#000000",
      foreground: "#00ff00",
      primary: "#003b00",
      secondary: "#008f11",
      accent: "#00ff00",
    },
  },
  vaporwave: {
    name: "Vaporwave",
    colors: {
      background: "#2b003b",
      foreground: "#ffe6fa",
      primary: "#00f3ff",   // Cyan
      secondary: "#ff00ff", // Magenta
      accent: "#f5e653",    // Yellow
    },
  },
  minimalist: {
    name: "Minimalist Light",
    colors: {
      background: "#ffffff",
      foreground: "#171717",
      primary: "#000000",
      secondary: "#404040",
      accent: "#737373",
    },
  },
  corporate: {
    name: "Corporate Blue",
    colors: {
      background: "#f0f2f5",
      foreground: "#1a1a1a",
      primary: "#0056b3",
      secondary: "#003366",
      accent: "#ff9900",
    },
  },
  retro: {
    name: "Retro Terminal",
    colors: {
      background: "#1a1b00",
      foreground: "#ffb000",
      primary: "#ffb000",
      secondary: "#cc8800",
      accent: "#ffcc00",
    },
  },
};

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: (themeKey: string) => void;
  generateThemeFromPrompt: (prompt: string) => string; // Returns logs
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentThemeState] = useState<Theme>(THEMES.cyberpunk);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [currentTheme]);

  const setTheme = (themeKey: string) => {
    if (THEMES[themeKey]) {
      setCurrentThemeState(THEMES[themeKey]);
    }
  };

  const generateThemeFromPrompt = (prompt: string): string => {
    const lower = prompt.toLowerCase();
    let selectedKey = "cyberpunk";
    let log = "Analyzing semantic intent...";

    if (lower.includes("matrix") || lower.includes("hacker") || lower.includes("code")) {
      selectedKey = "matrix";
      log = "Detected intent: MATRIX_SIMULATION. Injecting green code rain...";
    } else if (lower.includes("vapor") || lower.includes("80s") || lower.includes("retro") || lower.includes("purple")) {
      selectedKey = "vaporwave";
      log = "Detected intent: AESTHETIC_RETRO_WAVE. Loading synths...";
    } else if (lower.includes("light") || lower.includes("clean") || lower.includes("minimal")) {
      selectedKey = "minimalist";
      log = "Detected intent: REDUCE_CLUTTER. Switching to High-Contrast Light Mode...";
    } else if (lower.includes("corp") || lower.includes("business") || lower.includes("pro")) {
      selectedKey = "corporate";
      log = "Detected intent: ENTERPRISE_GRADE. Aligning synergies...";
    } else if (lower.includes("amber") || lower.includes("old") || lower.includes("crt")) {
      selectedKey = "retro";
      log = "Detected intent: LEGACY_SYSTEMS. Booting CRT Monitor simulation...";
    } else if (lower.includes("dark") || lower.includes("cyber") || lower.includes("default")) {
      selectedKey = "cyberpunk";
      log = "Detected intent: DEFAULT_STATE. Resetting system parameters...";
    } else {
      // Random if unsure, or just keep current but maybe vary slightly? 
      // For now default to cyberpunk to be safe
      selectedKey = "cyberpunk";
      log = "Intent unclear. Reverting to SAFE_MODE (Cyberpunk)...";
    }

    setTheme(selectedKey);
    return log;
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, generateThemeFromPrompt }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
