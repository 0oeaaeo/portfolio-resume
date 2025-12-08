"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ComponentStyle = "default" | "minimal" | "terminal" | "cards" | "list";

export type UIState = {
  theme: {
    colors: {
      background: string;
      foreground: string;
      primary: string;
      secondary: string;
      accent: string;
    };
    font: "sans" | "mono" | "serif";
    radius: "none" | "sm" | "md" | "full";
  };
  layout: {
    order: string[]; // Array of component IDs: "hero", "skills", "experience", "projects", "contact"
    spacing: "compact" | "normal" | "spacious";
  };
  components: {
    heroStyle: ComponentStyle;
    skillsStyle: ComponentStyle;
    experienceStyle: ComponentStyle;
    projectsStyle: ComponentStyle;
  };
};

const DEFAULT_UI: UIState = {
  theme: {
    colors: {
      background: "#050505",
      foreground: "#ffffff",
      primary: "#00f3ff",
      secondary: "#bd00ff",
      accent: "#00ff9d",
    },
    font: "mono",
    radius: "md",
  },
  layout: {
    order: ["hero", "terminal", "skills", "experience", "projects", "contact"],
    spacing: "normal",
  },
  components: {
    heroStyle: "default",
    skillsStyle: "cards",
    experienceStyle: "default",
    projectsStyle: "default",
  },
};

type UIContextType = {
  uiState: UIState;
  setUIState: (state: Partial<UIState>) => void;
  updateTheme: (colors: Partial<UIState["theme"]["colors"]>) => void;
  updateLayout: (order: string[]) => void;
  updateComponentStyle: (component: keyof UIState["components"], style: ComponentStyle) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [uiState, setUiState] = useState<UIState>(DEFAULT_UI);

  // Apply CSS variables for colors
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(uiState.theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply Font (simplified for demo, usually involves loading fonts or setting classes)
    // Here we just map to CSS vars or classes if needed, but we'll rely on the tailwind classes in components
  }, [uiState.theme]);

  const setUIState = (newState: Partial<UIState>) => {
    setUiState((prev) => ({
      ...prev,
      ...newState,
      theme: { ...prev.theme, ...newState.theme },
      layout: { ...prev.layout, ...newState.layout },
      components: { ...prev.components, ...newState.components },
    }));
  };

  const updateTheme = (colors: Partial<UIState["theme"]["colors"]>) => {
    setUiState((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        colors: { ...prev.theme.colors, ...colors },
      },
    }));
  };

  const updateLayout = (order: string[]) => {
    setUiState((prev) => ({
      ...prev,
      layout: { ...prev.layout, order },
    }));
  };

  const updateComponentStyle = (component: keyof UIState["components"], style: ComponentStyle) => {
    setUiState((prev) => ({
      ...prev,
      components: {
        ...prev.components,
        [component]: style,
      },
    }));
  };

  return (
    <UIContext.Provider value={{ uiState, setUIState, updateTheme, updateLayout, updateComponentStyle }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
