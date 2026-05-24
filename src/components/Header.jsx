import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Volume2, VolumeX, Terminal, Palette } from 'lucide-react';
import { useTheme, themes } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';

const Header = () => {
  const { currentTheme, setCurrentTheme, themeData } = useTheme();
  const { isMuted, toggleMute, playSound } = useSound();

  const handleThemeChange = (themeName) => {
    playSound('click');
    setCurrentTheme(themeName);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="w-10 h-10 rounded-lg bg-neonPurple/20 border border-neonPurple/50 flex items-center justify-center">
          <Terminal size={20} className="text-neonPurple" />
        </div>
        <div>
          <h1 className="text-lg font-orbitron font-bold tracking-tighter m-0 leading-none">LASTZ</h1>
          <p className="text-[10px] font-orbitron text-blueGray tracking-[0.2em] uppercase leading-none mt-1">Feedback Terminal v1.0</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        {/* Theme Switcher */}
        <div className="flex items-center gap-2 bg-deepNavy/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
          {Object.keys(themes).map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              onMouseEnter={() => playSound('hover')}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                currentTheme === theme ? 'scale-110 border-white' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
              style={{ 
                backgroundColor: themes[theme].primary === 'neonPurple' ? '#7c3aed' : 
                                 themes[theme].primary === 'neonCyan' ? '#00e5ff' : 
                                 themes[theme].primary === 'cyberRed' ? '#f43f5e' : '#ffffff' 
              }}
              title={theme}
            />
          ))}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={() => { playSound('click'); toggleMute(); }}
          onMouseEnter={() => playSound('hover')}
          className="w-10 h-10 rounded-full bg-deepNavy/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-neonPurple/50 transition-all duration-300 shadow-lg"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
