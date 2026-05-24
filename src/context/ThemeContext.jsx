import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  purple: {
    primary: 'neonPurple',
    secondary: 'neonCyan',
    glow: 'rgba(124, 58, 237, 0.5)',
    text: 'text-neonPurple',
    border: 'border-neonPurple/50',
    bg: 'bg-neonPurple/10',
  },
  cyan: {
    primary: 'neonCyan',
    secondary: 'neonPurple',
    glow: 'rgba(0, 229, 255, 0.5)',
    text: 'text-neonCyan',
    border: 'border-neonCyan/50',
    bg: 'bg-neonCyan/10',
  },
  red: {
    primary: 'cyberRed',
    secondary: 'neonCyan',
    glow: 'rgba(244, 63, 94, 0.5)',
    text: 'text-cyberRed',
    border: 'border-cyberRed/50',
    bg: 'bg-cyberRed/10',
  },
  black: {
    primary: 'white',
    secondary: 'blueGray',
    glow: 'rgba(255, 255, 255, 0.2)',
    text: 'text-white',
    border: 'border-white/20',
    bg: 'bg-white/5',
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('purple');

  const themeData = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themeData }}>
      <div className={`theme-${currentTheme} min-h-screen transition-colors duration-500`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
