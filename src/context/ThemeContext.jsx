import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const THEMES = [
  { id: 'light',  label: 'Light',  icon: '☀' },
  { id: 'dark',   label: 'Dark',   icon: '🌙' },
  { id: 'hacker', label: 'Hacker', icon: '>_' },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('csa-theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('csa-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
