'use client';

import { createContext, useContext, useEffect } from 'react';

interface ThemeCtx { dark: boolean; toggle: () => void; }

const Ctx = createContext<ThemeCtx>({ dark: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force light mode on mount
    document.documentElement.classList.remove('dark');
    localStorage.setItem('mra-theme', 'light');
  }, []);

  const toggle = () => {
    // No-op to prevent toggling to dark mode
  };

  return <Ctx.Provider value={{ dark: false, toggle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);

